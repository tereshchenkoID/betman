import { getPageMetadata } from '@/app/actions/metadata'
import { getCachedUser } from '@/app/actions/auth'

import SectionAccountFavorites from '@/sections/SectionAccountFavorites'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return await getPageMetadata('profile', locale)
}

export default async function InviteFriends() {
  const user = await getCachedUser()

  return (
    <SectionAccountFavorites user={user} />
  )
}
