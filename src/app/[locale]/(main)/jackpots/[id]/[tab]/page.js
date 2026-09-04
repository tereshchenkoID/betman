import { notFound } from 'next/navigation'

import { LIST_COUNT, NAVIGATION } from '@/constant/config'

import { apiRequest } from '@/app/actions/api'
import { getPageMetadata } from '@/app/actions/metadata'
import { getCachedUser } from '@/app/actions/static'

import SectionJackpot from '@/sections/SectionJackpot'

export async function generateMetadata() {
  return await getPageMetadata('jackpots')
}

export default async function Jackpot({ params }) {
  const { id, tab } = await params

  const [
    metaTags,
    user,
    res,
  ] = await Promise.all([
    await getPageMetadata('jackpots'),
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
      'target': `${process.env.API_BASE_URL}/${NAVIGATION.home.url}`,
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
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
