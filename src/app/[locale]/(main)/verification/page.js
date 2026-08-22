import { notFound } from 'next/navigation'
import { NAVIGATION } from '@/constant/config'

import { getPageMetadata } from '@/app/actions/metadata'
import { getCachedUser } from '@/app/actions/static'

import SectionVerification from '@/sections/SectionVerification'
import SeoSection from '@/sections/SectionSeo'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return await getPageMetadata('verification', locale)
}

export default async function Verification({ params }) {
  const { locale } = await params

  const [
    metaTags,
    user,
  ] = await Promise.all([
    getPageMetadata('verification', locale),
    getCachedUser()
  ])

  if (!user?.id) {
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
      <SectionVerification user={user} />
      <SeoSection alias={'verification'} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
