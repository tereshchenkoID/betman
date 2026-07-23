import { NAVIGATION } from '@/constant/config'

import { getPageMetadata } from '@/services/metadata'
import { apiRequest } from '@/app/actions/api'

import SectionPromo from '@/sections/SectionPromo'
import {notFound} from "next/navigation";

export async function generateMetadata({ params }) {
  const { locale } = await params
  return await getPageMetadata('promo', locale)
}

export default async function Promo({ params }) {
  const { id, locale } = await params

  const [
    metaTags,
    res,
  ] = await Promise.all([
    getPageMetadata('promo', locale),
    apiRequest(`promo/${id}`, {
      method: 'GET',
    }),
  ])

  if (!res?.data?.id) {
    notFound()
  }

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
      <SectionPromo
        data={res?.data}
        meta={res?.meta}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
