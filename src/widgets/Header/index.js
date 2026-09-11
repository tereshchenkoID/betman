import { getBonuses, getCachedUser, getSettings } from '@/app/actions/static'

import Header from '@/widgets/Header/section'

export default async function HeaderLayout() {
  const [
    user,
    settings,
  ] = await Promise.all([
    getCachedUser(),
    getSettings(),
  ])

  const bonuses = user?.id ? await getBonuses() : null

  return (
    <Header
      settings={settings}
      bonuses={bonuses}
    />
  )
}
