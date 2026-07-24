import { NAVIGATION } from '@/constant/config'

import { getPageMetadata } from '@/app/actions/metadata'
import { apiRequest } from '@/app/actions/api'

import SectionPage from '@/sections/SectionPage'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return await getPageMetadata('info', locale)
}

export default async function Info({ params }) {
  const { id, locale } = await params

  const [
    metaTags,
    page,
  ] = await Promise.all([
    getPageMetadata('info', locale),
    apiRequest(`page/${id}`, {
      method: 'POST',
      params: {
        data: id
      }
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
      <SectionPage
        data={page?.data}
        meta={page?.meta}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
