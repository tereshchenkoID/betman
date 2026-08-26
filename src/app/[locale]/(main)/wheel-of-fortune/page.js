import { NAVIGATION } from '@/constant/config'

import { apiRequest } from '@/app/actions/api'
import { getPageMetadata } from '@/app/actions/metadata'
import { getSettings, getWheelsRound, getCachedUser } from '@/app/actions/static'

import SectionWheelOfFortune from '@/sections/SectionWheelOfFortune'
import SeoSection from '@/sections/SectionSeo'

export async function generateMetadata() {
  return await getPageMetadata('wheel-of-fortune')
}

export default async function WheelOfFortune() {
  const [
    metaTags,
    settings,
    user,
    wheelsRound,
    res,
  ] = await Promise.all([
    getPageMetadata('wheel-of-fortune'),
    getSettings(),
    getCachedUser(),
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
      "target": `${process.env.API_BASE_URL}/${NAVIGATION.home.url}`,
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <>
      <SectionWheelOfFortune
        user={user}
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
