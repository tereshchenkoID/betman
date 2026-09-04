import { apiRequest } from '@/app/actions/api'
import { getCachedUser, getSettings } from '@/app/actions/static'

import SectionAccountBonuses from '@/sections/SectionAccountBonuses'

export default async function Bonus({ params }) {
  const { tab } = await params

  const [
    settings,
    user,
    res,
  ] = await Promise.all([
    getSettings(),
    getCachedUser(),
    apiRequest(`bonuses/${tab}/`, {
      method: 'GET',
      next: { tags: ['bonuses'] }
    })
  ])

  return (
    <SectionAccountBonuses
      settings={settings}
      data={res?.data}
      meta={res?.meta}
      tab={tab}
      user={user}
    />
  )
}

