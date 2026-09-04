import { apiRequest } from '@/app/actions/api'
import { getCachedUser, getSettings } from '@/app/actions/static'

import Section from './section'

const SectionJackpotsSlider = async ({ mock }) => {
  const [
    settings,
    user,
    res,
  ] = await Promise.all([
    getSettings(),
    getCachedUser(),
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
      user={user}
    />
  )
}

export default SectionJackpotsSlider
