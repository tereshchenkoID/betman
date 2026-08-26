import { NAVIGATION } from '@/constant/config'

import { getPageMetadata } from '@/app/actions/metadata'
import { getSettings, getCachedUser } from '@/app/actions/static'

import SectionAccountInviteFriends from '@/sections/SectionAccountInviteFriends'

export async function generateMetadata() {
  return await getPageMetadata('profile')
}

export default async function InviteFriends({ params }) {
  const { locale } = await params

  const [
    user,
    settings
  ] =  await Promise.all([
    getCachedUser(),
    getSettings()
  ])

  return (
    <SectionAccountInviteFriends
      user={user}
      data={`${settings?.invite_url}/${locale}${NAVIGATION.registration.url}${user?.id ? `?invite=${user?.invite?.code}` : ''}`}
    />
  )
}
