import { LIST_COUNT } from '@/constant/config'

import { apiRequest } from '@/app/actions/api'
import { getSettings } from '@/app/actions/static'
import { getCachedUser } from '@/app/actions/auth'

import Section from './section'

const SectionGamesSlider = async ({ mock }) => {
  const [
    settings,
    user,
    res,
  ] = await Promise.all([
    getSettings(),
    getCachedUser(),
    apiRequest(`games/${mock.id}/`, {
      method: 'POST',
      params: {
        count: mock?.count || LIST_COUNT
      }
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

export default SectionGamesSlider
