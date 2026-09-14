import { apiRequest } from '@/app/actions/api'

import Section from './_view'

const SectionTooltip = async ({ alias }) => {
  const res = await apiRequest('tips/', {
    method: 'POST',
    params: {
      alias: alias || 'casino'
    }
  })

  return (
    <Section
      data={res?.data}
      meta={res?.meta}
    />
  )
}

export default SectionTooltip
