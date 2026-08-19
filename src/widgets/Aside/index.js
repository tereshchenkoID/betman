import {
  getWheelsRound,
  getQuests,
  getBonuses
} from '@/app/actions/static'

import Section from './section'

export default async function Aside({ user, settings }) {
  const [
    wheels,
    quests,
    bonuses
  ] = await Promise.all([
    getWheelsRound(),
    getQuests(),
    user?.id ? getBonuses() : null
  ])

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
