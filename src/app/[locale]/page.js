import { getPageMetadata } from '@/services/metadata'
import { getCachedUser } from '@/app/actions/auth'
import { getSettings } from '@/app/actions/static'
import { apiRequest } from '@/app/actions/api'

import { NAVIGATION } from '@/constant/config'

import SectionHome from '@/sections/SectionHome'
import SeoSection from '@/sections/SectionSeo'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return await getPageMetadata('home', locale)
}

export default async function Home({ params }) {
  const { locale } = await params

  const [
    user,
    metaTags,
    settings,
    skeleton
  ] = await Promise.all([
    getCachedUser(),
    getPageMetadata('home', locale),
    getSettings(),
    apiRequest('casino/', {
      method: 'GET',
    })
  ])

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": metaTags.title,
    "url": process.env.BASE_URL,
    "description": metaTags.description,
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
      <SectionHome
        skeleton={skeleton?.data}
        locale={locale}
      />
      <SeoSection alias={'casino'} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
