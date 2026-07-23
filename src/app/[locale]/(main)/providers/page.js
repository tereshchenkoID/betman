import { NAVIGATION } from '@/constant/config'

import { getPageMetadata } from '@/services/metadata'
import { getProviders } from '@/app/actions/static'

import SectionProviders from '@/sections/SectionProviders'
import SeoSection from '@/sections/SectionSeo'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return await getPageMetadata('providers', locale)
}

export default async function Providers({ params }) {
  const { locale } = await params

  const [
    metaTags,
    res,
  ] = await Promise.all([
    getPageMetadata('providers', locale),
    getProviders()
  ])

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": metaTags?.title,
    "url": process.env.BASE_URL,
    "description": metaTags?.description,
    "publisher": {
      "@type": "Organization",
      "name": process.env.ORGANIZATION_NAME,
      "logo": {
        "@type": "ImageObject",
        "url": process.env.ORGANIZATION_LOGO
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${process.env.API_BASE_URL}/${NAVIGATION.home.link}`,
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <>
      <SectionProviders
        data={res?.data}
        meta={res?.meta}
      />
      <SeoSection alias={'providers'} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
