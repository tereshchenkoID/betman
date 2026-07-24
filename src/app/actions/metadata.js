import { apiRequest } from '@/app/actions/api'

function metaData(data) {
  if (!data) return {};

  return {
    title: data.title || '',
    description: data.description || '',
    keywords: data.keywords || '',

    ...(data.openGraph && {
      openGraph: {
        title: data.openGraph.title,
        description: data.openGraph.description,
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

export async function getPageMetadata(page) {
  try {
    const data = await apiRequest(`metatags/${page}`, {
      cache: 'force-cache',
      next: { revalidate: 3600 },
    });

    if (!data) return null;

    return metaData(data);
  } catch (error) {
    console.error(`Error metadata: ${page}:`, error);
    return null;
  }
}
