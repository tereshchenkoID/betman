import { redirect } from '@/i18n/navigation'

import { NAVIGATION } from '@/constant/config'

import { apiRequest } from '@/app/actions/api'
import { getPageMetadata } from '@/app/actions/metadata'
import { getCachedUser } from '@/app/actions/static'

import SectionRecovery from '@/sections/SectionRecovery'
import SeoSection from '@/sections/SectionSeo'

export async function generateMetadata() {
  return await getPageMetadata('recovery')
}

export default async function PasswordRecovery({ params, searchParams }) {
  const { locale } = await params
  const { hash } = await searchParams

  if (!hash) {
    redirect({
      href: '/',
      locale
    })
  }

  const [
    metaTags,
    user,
    res,
  ] = await Promise.all([
    getPageMetadata('login'),
    getCachedUser(),
    apiRequest('password/', {
      method: 'POST',
      params: { hash },
    }),
  ])

  if (user?.id) {
    redirect({
      href: '/',
      locale
    })
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
      <SectionRecovery
        data={res}
        hash={hash}
      />
      <SeoSection alias={'recovery'} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
