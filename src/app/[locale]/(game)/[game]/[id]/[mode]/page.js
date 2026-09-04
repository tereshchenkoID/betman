import { notFound } from 'next/navigation'

import { NAVIGATION } from '@/constant/config'

import { apiRequest } from '@/app/actions/api'
import { getPageMetadata } from '@/app/actions/metadata'
import { getCachedUser } from '@/app/actions/static'

import SectionGame from '@/sections/SectionGame'

export async function generateMetadata({ params }) {
  const { id } = await params
  return await getPageMetadata(`game/${id}/`)
}

export default async function Game({ params }) {
  const { id, mode } = await params

  const [
    metaTags,
    user,
    res,
    link
  ] = await Promise.all([
    getPageMetadata(`game/${id}/`),
    getCachedUser(),
    apiRequest(`game/${id}/`),
    apiRequest(`v1/?gameId=${id}&demo=${mode}`, {
      method: 'POST',
    }),
  ])

  if (!res || isNaN(Number(id)) || isNaN(Number(mode))) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': metaTags?.title,
    'url': process.env.BASE_URL,
    'description': metaTags?.description,
    'publisher': {
      '@type': 'Organization',
      'name': process.env.ORGANIZATION_NAME,
      'logo': {
        '@type': 'ImageObject',
        'url': process.env.ORGANIZATION_LOGO
      }
    },
    'potentialAction': {
      '@type': 'SearchAction',
      'target': `${process.env.API_BASE_URL}/${NAVIGATION.home.url}`,
      'query-input': 'required name=search_term_string'
    }
  }

  return (
    <>
      <SectionGame
        user={user}
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
