import { notFound } from 'next/navigation'

import { LIST_COUNT, NAVIGATION } from '@/constant/config'

import { apiRequest } from '@/app/actions/api'
import { getPageMetadata } from '@/app/actions/metadata'
import { getCachedUser } from '@/app/actions/static'

import SectionGames from '@/sections/SectionGames'

export async function generateMetadata() {
  return await getPageMetadata('providers')
}

export default async function Provider({ params }) {
  const { id } = await params

  const [
    metaTags,
    user,
    res,
  ] = await Promise.all([
    getPageMetadata('providers'),
    getCachedUser(),
    apiRequest(`games/${id}/`, {
      method: 'POST',
      params: {
        page: 0,
        count: LIST_COUNT,
      }
    }),
  ])

  console.log(res)

  if (res?.meta?.results === '0') {
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
      "target": `${process.env.API_BASE_URL}/${NAVIGATION.home.url}`,
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <>
      <section>
        <SectionGames
          url={`games/${id}/`}
          user={user}
          data={res?.data}
          meta={res?.meta}
        />
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
