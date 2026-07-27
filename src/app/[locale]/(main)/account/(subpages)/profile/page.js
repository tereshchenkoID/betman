import { getPageMetadata } from '@/app/actions/metadata'
import { apiRequest } from '@/app/actions/api'
import { getCachedUser } from '@/app/actions/auth'

import SectionAccountProfile from '@/sections/SectionAccountProfile'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return await getPageMetadata('profile', locale)
}

export default async function Profile() {
  const [
    user,
    res,
    countries
  ] = await Promise.all([
    getCachedUser(),
    apiRequest('profile/', {
      method: 'GET',
      next: { tags: ['profile'] }
    }),
    apiRequest('countries/', {
      method: 'GET',
    })
  ])

  return (
    <SectionAccountProfile
      user={user}
      data={res}
      countries={countries}
    />
  )
}
