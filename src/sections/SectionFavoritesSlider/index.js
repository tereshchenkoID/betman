import { getSettings, getCachedUser } from '@/app/actions/static'

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
