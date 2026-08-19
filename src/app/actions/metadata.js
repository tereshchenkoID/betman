import { apiRequest } from '@/app/actions/api'
import { cache } from 'react'

function metaData(data) {
  if (!data) return {};

  return {
    title: data.title || '',
    description: data.description || '',
    keywords: data.keywords || '',

    ...(data.openGraph && {
      openGraph: {
        title: data.openGraph.title || data.title,
        description: data.openGraph.description || data.description,
        type: data.openGraph.type || 'website',
        url: data.openGraph.url,
        images: data.openGraph.image ? [
          {
            url: data.openGraph.image.url,
            width: data.openGraph.image.width,
            height: data.openGraph.image.height,
            alt: data.openGraph.image.alt,
          }
        ] : [],
      }
    }),

    ...(data.twitter && {
      twitter: {
        card: data.twitter.card || 'summary_large_image',
        title: data.twitter.title,
        description: data.twitter.description,
        site: data.twitter.site,
        creator: data.twitter.creator,
        images: data.twitter.image ? [data.twitter.image] : [],
      }
    })
  };
}

export const getPageMetadata = cache(async (page) => {
  try {
    const data = await apiRequest(`metatags/${page}`, {
      next: {
        revalidate: 3600,
        tags: ['metatags']
      },
    })

    if (!data) return null

    return metaData(data)
  } catch (error) {
    console.error(`Error metadata: ${page}:`, error)
    return null
  }
})
