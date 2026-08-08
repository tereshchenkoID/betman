import { NAVIGATION } from '@/constant/config'
import { redirect } from 'next/navigation'

import { getPageMetadata } from '@/app/actions/metadata'
import { getCachedUser } from '@/app/actions/auth'

import SectionLogin from '@/sections/SectionLogin'
import SeoSection from '@/sections/SectionSeo'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return await getPageMetadata('login', locale)
}

export default async function Login({ params }) {
  const { locale } = await params

  const [
    metaTags,
    user,
  ] = await Promise.all([
    getPageMetadata('login', locale),
    getCachedUser(),
  ])

  if (user?.id) {
    redirect(`/${locale}`)
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
      <SectionLogin />
      <SeoSection alias={'login'} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
