import { apiRequest } from '@/app/actions/api'

import Section from './_view'

const SectionSeo = async ({ alias }) => {
  const res = await apiRequest('seo/', {
    method: 'POST',
    params: {
      alias: alias || 'home'
    }
  })

  return (
    <Section
      data={res?.data}
      meta={res?.meta}
    />
  )
}

export default SectionSeo
