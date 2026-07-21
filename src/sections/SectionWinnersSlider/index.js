import { apiRequest } from '@/app/actions/api'
import { getCachedUser } from '@/app/actions/auth'

import Section from './section'

const SectionWinnersSlider = async () => {
  const [
    user,
    res,
  ] = await Promise.all([
    getCachedUser(),
    apiRequest('winners/', {
      method: 'GET'
    }),
  ])

  return (
    <Section
      data={res?.data}
      meta={res?.meta}
      user={user}
    />
  )
}

export default SectionWinnersSlider
