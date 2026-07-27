import { getPageMetadata } from '@/app/actions/metadata'
import { apiRequest } from '@/app/actions/api'
import { getSettings } from '@/app/actions/static'
import { getCachedUser } from '@/app/actions/auth'

import { USER_VERIFY } from '@/constant/config'

import SectionAccountProfile from '@/sections/SectionAccountProfile'
import SectionTooltip from '@/sections/SectionTooltip'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return await getPageMetadata('profile', locale)
}

export default async function Profile({ searchParams }) {
  const { tab } = await searchParams
  const activeTab = tab || 'profile'

  const [
    user,
    settings,
    res,
    countries
  ] = await Promise.all([
    getCachedUser(),
    getSettings(),
    apiRequest('profile/', {
      method: 'GET',
      next: { tags: ['profile'] }
    }),
    apiRequest('countries/', {
      method: 'GET',
    })
  ])

  const verify = USER_VERIFY[res?.profile?.isVerify]
  const alias = activeTab === 'verification'
    ? `verification/${verify}`
    : activeTab

  return (
    <SectionAccountProfile
      user={user}
      settings={settings}
      data={res}
      countries={countries}
    >
      <SectionTooltip alias={alias} />
    </SectionAccountProfile>
  )
}
