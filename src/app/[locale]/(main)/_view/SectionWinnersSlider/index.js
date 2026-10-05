import { apiRequest } from '@/app/actions/api'

import Section from './_view'

const SectionWinnersSlider = async ({ mock }) => {
  const res = await apiRequest('winners/', {
    method: 'GET'
  })

  return (
    <Section
      mock={mock}
      data={res?.data}
      meta={res?.meta}
    />
  )
}

export default SectionWinnersSlider
