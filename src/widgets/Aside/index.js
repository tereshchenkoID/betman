import {
  getBonuses, getCachedUser, getQuests, getSettings, getWheelsRound
} from '@/app/actions/static'

import Section from './_view'

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
      settings={settings}
      bonuses={bonuses}
      wheels={wheels}
      quests={quests}
    />
  )
}
