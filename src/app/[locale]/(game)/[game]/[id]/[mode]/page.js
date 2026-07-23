import { NAVIGATION } from '@/constant/config'

import { getPageMetadata } from '@/services/metadata'
import { apiRequest } from '@/app/actions/api'
import { getSettings } from '@/app/actions/static'
import { getCachedUser } from '@/app/actions/auth'

import SectionGame from '@/sections/SectionGame'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  const { locale, id } = await params
  return await getPageMetadata(`game/${id}/`, locale)
}

export default async function Game({ params }) {
  const { locale, id, mode } = await params

  const [
    metaTags,
    user,
    settings,
    res,
    link
  ] = await Promise.all([
    getPageMetadata(`game/${id}/`, locale),
    getCachedUser(),
    getSettings(),
    apiRequest(`game/${id}/`),
    apiRequest(`v1/?gameId=${id}&demo=${mode}/`, {
      method: 'POST',
      isRedirect: false
    }),
  ])

  // TODO Remove after fix content side
  if (!res || isNaN(Number(id)) || isNaN(Number(mode))) {
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
      <SectionGame
        user={user}
        settings={settings}
        game={res}
        iframe={link}
        id={id}
        mode={mode}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
