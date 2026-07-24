import { NAVIGATION } from '@/constant/config'

import { getPageMetadata } from '@/app/actions/metadata'
import { getCachedUser } from '@/app/actions/auth'

import SectionAccountInviteFriends from '@/sections/SectionAccountInviteFriends'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return await getPageMetadata('profile', locale)
}

export default async function InviteFriends({ params }) {
  const { locale } = await params
  const user = await getCachedUser()

  return (
    <SectionAccountInviteFriends
      user={user}
      data={`${process.env.BASE_URL}/${locale}${NAVIGATION.registration.url}?invite=${user?.invite?.code}`}
    />
  )
}
