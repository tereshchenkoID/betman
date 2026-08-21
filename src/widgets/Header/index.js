import { getCachedUser } from '@/app/actions/auth'
import { getSettings } from '@/app/actions/static'

import Header from '@/widgets/Header/section'

export default async function HeaderLayout() {
  const [
    user,
    settings,
  ] = await Promise.all([
    getCachedUser(),
    getSettings(),
  ])

  return (
    <Header
      user={user}
      settings={settings}
    />
  )
}
