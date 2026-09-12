import { getBonuses, getCachedUser, getSettings } from '@/app/actions/static'

import Section from './_view'

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
    <Section
      settings={settings}
      bonuses={bonuses}
    />
  )
}
