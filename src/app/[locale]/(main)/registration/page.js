import { NAVIGATION } from '@/constant/config'

import { getPageMetadata } from '@/app/actions/metadata'
import { getCachedUser } from '@/app/actions/auth'
import { apiRequest } from '@/app/actions/api'

import SeoSection from '@/sections/SectionSeo'
import SectionRegistration from '@/sections/SectionRegistration'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return await getPageMetadata('registration', locale)
}

export default async function Promotions({ params }) {
  const { locale } = await params

  const [
    metaTags,
    user,
    countries,
  ] = await Promise.all([
    getPageMetadata('registration', locale),
    getCachedUser(),
    apiRequest('countries/', {
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
      <SectionRegistration
        user={user}
        countries={countries?.data}
      />
      <SeoSection alias={'registration'} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
