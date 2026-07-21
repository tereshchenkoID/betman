import { apiRequest } from '@/app/actions/api'
import { getSettings } from '@/app/actions/static'
import { getCachedUser } from '@/app/actions/auth'

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
