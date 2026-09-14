import { LIST_COUNT } from '@/constant/config'

import { apiRequest } from '@/app/actions/api'
import { getSettings } from '@/app/actions/static'

import Section from './_view'

const SectionGamesSlider = async ({ mock }) => {
  const [
    settings,
    res,
  ] = await Promise.all([
    getSettings(),
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
    />
  )
}

export default SectionGamesSlider
