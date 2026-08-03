import { getCachedUser } from '@/app/actions/auth'

import SectionAccountFavorites from '@/sections/SectionAccountFavorites'

export default async function Favorites() {
  const user = await getCachedUser()

  return (
    <SectionAccountFavorites user={user} />
  )
}
