import { apiRequest } from '@/app/actions/api'
import { getSettings } from '@/app/actions/static'

import SectionAccountBonuses from '@/sections/SectionAccountBonuses'

export default async function Bonuses() {
  const [
    settings,
    res,
  ] = await Promise.all([
    getSettings(),
    apiRequest('bonuses/', {
      method: 'GET',
      next: { tags: ['bonuses'] }
    })
  ])

  return (
    <SectionAccountBonuses
      settings={settings}
      data={res?.data}
      meta={res?.meta}
    />
  )
}
