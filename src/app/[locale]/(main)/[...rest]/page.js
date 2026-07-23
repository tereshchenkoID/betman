import { getPageMetadata } from '@/services/metadata'

import { NAVIGATION } from '@/constant/config'

import SectionNotFound from '@/sections/SectionNotFound'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return await getPageMetadata('not-found', locale)
}

export default async function NotFoundPage({ params }) {
  const { locale } = await params
  const metaTags = await getPageMetadata('not-found', locale)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": metaTags.title,
    "url":  process.env.BASE_URL,
    "description": metaTags.description,
    "publisher": {
      "@type": "Organization",
      "name":  process.env.ORGANIZATION_NAME,
      "logo": {
        "@type": "ImageObject",
        "url":  process.env.ORGANIZATION_LOGO
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${process.env.API_BASE_URL}/${NAVIGATION.not_found.link}`,
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <>
      <SectionNotFound />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
