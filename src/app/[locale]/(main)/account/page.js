import { getPageMetadata } from '@/app/actions/metadata'
import { getCachedUser } from '@/app/actions/auth'

import SectionAccount from '@/sections/SectionAccount'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return await getPageMetadata('profile', locale)
}

export default async function Account() {
  const user = await getCachedUser()

  return (
    <SectionAccount user={user} />
  )
}
