import { NAVIGATION } from '@/constant/config'

import { getPageMetadata } from '@/services/metadata'
import { apiRequest } from '@/app/actions/api'
import { getSettings, getWheelsRound } from '@/app/actions/static'

import SectionWheelOfFortune from '@/sections/SectionWheelOfFortune'
import SeoSection from '@/sections/SectionSeo'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return await getPageMetadata('wheel-of-fortune', locale)
}

export default async function WheelOfFortune({ params }) {
  const { locale } = await params

  const [
    metaTags,
    settings,
    wheelsRound,
    res,
  ] = await Promise.all([
    getPageMetadata('wheel-of-fortune', locale),
    getSettings(),
    getWheelsRound(),
    apiRequest('wheel/load/', {
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
      <SectionWheelOfFortune
        data={res?.data}
        meta={res?.meta}
        settings={settings}
        wheelsRound={wheelsRound}
      />
      <SeoSection alias={'wheel-of-fortune'} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
