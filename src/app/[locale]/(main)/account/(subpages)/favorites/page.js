import { getCachedUser } from '@/app/actions/static'

import SectionAccountFavorites from '@/sections/Account/SectionAccountFavorites'

export default async function Favorites() {
  const user = await getCachedUser()

  return (
    <SectionAccountFavorites user={user} />
  )
}
