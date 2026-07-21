import { apiRequest } from '@/app/actions/api'

import Section from '@/sections/SectionSeo/section'

const SectionSeo = async ({ alias }) => {
  const res = await apiRequest('seo/', {
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

export default SectionSeo
