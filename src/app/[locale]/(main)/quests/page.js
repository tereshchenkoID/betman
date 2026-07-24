import { NAVIGATION } from '@/constant/config'

import { getPageMetadata } from '@/app/actions/metadata'
import { getQuests } from '@/app/actions/static'

import SeoSection from '@/sections/SectionSeo'
import SectionQuests from "@/sections/SectionQuests";

export async function generateMetadata({ params }) {
  const { locale } = await params
  return await getPageMetadata('quests', locale)
}

export default async function Quests({ params }) {
  const { locale } = await params

  const [
    metaTags,
    res,
  ] = await Promise.all([
    getPageMetadata('quests', locale),
    getQuests(),
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
      <SectionQuests
        data={res?.quests?.data}
        meta={res?.quests?.meta}
      />
      <SeoSection alias={'quests'} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
