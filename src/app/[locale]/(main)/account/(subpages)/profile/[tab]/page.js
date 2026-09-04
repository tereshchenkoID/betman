import { USER_VERIFY } from '@/constant/config'

import { apiRequest } from '@/app/actions/api'
import { getCachedUser, getSettings } from '@/app/actions/static'

import SectionAccountProfile from '@/sections/SectionAccountProfile'
import SectionTooltip from '@/sections/SectionTooltip'

export default async function Profile({ params }) {
  const { tab } = await params

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
  const alias = tab === 'verification'
    ? `verification/${verify}`
    : tab

  return (
    <SectionAccountProfile
      user={user}
      settings={settings}
      data={res}
      countries={countries}
      tab={tab}
    >
      <SectionTooltip alias={alias} />
    </SectionAccountProfile>
  )
}
