import { Suspense } from 'react'

import { NAVIGATION } from '@/constant/config'

import { apiRequest } from '@/app/actions/api'
import { getPageMetadata } from '@/app/actions/metadata'
import { getCachedUser } from '@/app/actions/static'

import { redirect } from '@/i18n/navigation'

import SectionRegistration from '@/sections/SectionRegistration'
import SeoSection from '@/sections/SectionSeo'

export async function generateMetadata() {
  return await getPageMetadata('registration')
}

export default async function Promotions({ params }) {
  const { locale } = await params

  const [
    metaTags,
    user,
    countries,
  ] = await Promise.all([
    getPageMetadata('registration'),
    getCachedUser(),
    apiRequest('countries/', {
      method: 'GET',
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
      <Suspense fallback={null}>
        <SectionRegistration
          user={user}
          countries={countries?.data}
        />
      </Suspense>
      <SeoSection alias={'registration'} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
