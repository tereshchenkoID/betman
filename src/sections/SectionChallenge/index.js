import { apiRequest } from '@/app/actions/api'

import Section from './section'

const SectionChallenge = async ({ mock }) => {
  const [
    res,
  ] = await Promise.all([
    apiRequest(`challenge/${mock?.alias}`, {
      method: 'GET'
    })
  ])

  return (
    <Section
      data={res?.data}
      meta={res?.meta}
    />
  )
}

export default SectionChallenge
