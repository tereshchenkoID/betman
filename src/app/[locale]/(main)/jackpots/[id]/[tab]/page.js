import { notFound } from 'next/navigation'

import { NAVIGATION, LIST_COUNT } from '@/constant/config'

import { getPageMetadata } from '@/services/metadata'
import { getCachedUser } from '@/app/actions/auth'
import { apiRequest } from '@/app/actions/api'

import SectionJackpot from '@/sections/SectionJackpot'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return await getPageMetadata('jackpots', locale)
}

export default async function Jackpot({ params }) {
  const { locale, id, tab } = await params
  const metaTags = await getPageMetadata('jackpots', locale)

  const [
    user,
    res,
  ] = await Promise.all([
    getCachedUser(),
    apiRequest(`jackpot/${id}/general`, {
      method: 'GET'
    }),
  ])

  if (!res?.data?.id) {
    notFound()
  }

  const games = await apiRequest(`jackpot/${id}/games`, {
    method: 'POST',
    params: {
      page: 0,
      count: LIST_COUNT
    },
  })

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
      'target': `${process.env.API_BASE_URL}/${NAVIGATION.home.link}`,
      'query-input': 'required name=search_term_string'
    }
  }

  return (
    <>
      <SectionJackpot
        id={id}
        tab={tab}
        user={user}
        data={res?.data}
        games={games?.data}
        meta={games?.meta}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
