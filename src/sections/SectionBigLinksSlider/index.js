import { apiRequest } from '@/app/actions/api'

import Section from './section'

const SectionBigLinksSlider = async () => {
  const res = await apiRequest('big-links/', {
    method: 'GET'
  })

  return (
    <Section
      data={res?.data}
      meta={res?.meta}
    />
  )
}

export default SectionBigLinksSlider
