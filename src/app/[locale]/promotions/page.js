import { NAVIGATION } from '@/constant/config'

import { getPageMetadata } from '@/services/metadata'
import { apiRequest } from '@/app/actions/api'

import SectionPromotions from '@/sections/SectionPromotions'
import SeoSection from '@/sections/SectionSeo'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return await getPageMetadata('promotions', locale)
}

export default async function Promotions({ params }) {
  const { locale } = await params

  const [
    metaTags,
    res,
  ] = await Promise.all([
    getPageMetadata('promotions', locale),
    apiRequest('promotions/', {
      method: 'GET',
    }),
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
      <SectionPromotions
        data={res?.data}
        meta={res?.meta}
      />
      <SeoSection alias={'promotions'} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
