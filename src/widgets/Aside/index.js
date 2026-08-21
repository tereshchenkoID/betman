import { getWheelsRound, getQuests, getBonuses, getSettings, getCachedUser } from '@/app/actions/static'

import Section from './section'

export default async function AsideLayout() {
  const [
    settings,
    user,
    wheels,
    quests,
  ] = await Promise.all([
    getSettings(),
    getCachedUser(),
    getWheelsRound(),
    getQuests(),
  ])

  const bonuses = user?.id ? await getBonuses() : null

  return (
    <Section
      user={user}
      settings={settings}
      bonuses={bonuses}
      wheels={wheels}
      quests={quests}
    />
  )
}
