import { getSettings } from '@/app/actions/static'

import Section from './section'

const SectionGamesSlider = async ({ mock }) => {
  const settings = await getSettings()

  return (
    <Section
      mock={mock}
      settings={settings}
    />
  )
}

export default SectionGamesSlider
