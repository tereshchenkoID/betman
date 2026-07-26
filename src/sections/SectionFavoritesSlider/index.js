import { getSettings } from '@/app/actions/static'
import { getCachedUser } from '@/app/actions/auth'

import Section from './section'

const SectionGamesSlider = async ({ mock }) => {
  const [
    settings,
    user,
  ] = await Promise.all([
    getSettings(),
    getCachedUser(),
  ])

  return (
    <Section
      mock={mock}
      settings={settings}
      user={user}
    />
  )
}

export default SectionGamesSlider
