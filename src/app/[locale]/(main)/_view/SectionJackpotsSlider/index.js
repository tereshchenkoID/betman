import { apiRequest } from '@/app/actions/api'
import { getSettings } from '@/app/actions/static'

import Section from './_view'

const SectionJackpotsSlider = async ({ mock }) => {
  const [
    settings,
    res,
  ] = await Promise.all([
    getSettings(),
    apiRequest('jackpots/', {
      method: 'GET'
    })
  ])

  return (
    <Section
      data={res?.data}
      meta={res?.meta}
      mock={mock}
      settings={settings}
    />
  )
}

export default SectionJackpotsSlider
