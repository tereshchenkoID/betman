import { LIST_COUNT, NAVIGATION } from '@/constant/config'

import { apiRequest } from '@/app/actions/api'
import { getPageMetadata } from '@/app/actions/metadata'
import { getCachedUser } from '@/app/actions/static'

import SeoSection from '@/sections/SectionSeo'
import SectionGames from '@/sections/SectionGames'
import SectionCategoriesSlider from '@/sections/SectionCategoriesSlider'

export async function generateMetadata() {
  return await getPageMetadata('games')
}

export default async function Games({ params }) {
  const { id } = await params

  const [
    metaTags,
    user,
    res,
  ] = await Promise.all([
    getPageMetadata('games'),
    getCachedUser(),
    apiRequest(`games/${id}/`, {
      method: 'POST',
      params: {
        page: 0,
        count: LIST_COUNT,
      },
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
      <section>
        <SectionCategoriesSlider />
      </section>
      <section>
        <SectionGames
          url={`games/${id}/`}
          user={user}
          data={res?.data}
          meta={res?.meta}
        />
      </section>
      <SeoSection alias={'games'} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
