import { apiRequest } from '@/app/actions/api'

import Section from './_view'

const SectionBannersSlider = async () => {
  const res = await apiRequest('banners/', {
    method: 'GET'
  })

  return (
    <Section
      data={res?.data}
      meta={res?.meta}
    />
  )
}

export default SectionBannersSlider
