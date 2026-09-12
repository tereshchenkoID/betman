import { apiRequest } from '@/app/actions/api'

import Section from './section'

const SectionWinnersSlider = async () => {
  const res = await apiRequest('winners/', {
    method: 'GET'
  })

  return (
    <Section
      data={res?.data}
      meta={res?.meta}
    />
  )
}

export default SectionWinnersSlider
