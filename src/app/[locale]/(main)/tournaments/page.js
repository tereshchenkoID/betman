import { NAVIGATION } from '@/constant/config'

import { getPageMetadata } from '@/app/actions/metadata'

import SectionTournaments from '@/sections/SectionTournaments'
import SeoSection from '@/sections/SectionSeo'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return await getPageMetadata('tournaments', locale)
}

export default async function Tournaments({ params }) {
  const { locale } = await params

  const [
    metaTags,
  ] = await Promise.all([
    getPageMetadata('tournaments', locale),
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
      <SectionTournaments />
      <SeoSection alias={'tournaments'} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
