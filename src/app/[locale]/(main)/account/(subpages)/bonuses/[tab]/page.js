import { apiRequest } from '@/app/actions/api'
import { getSettings } from '@/app/actions/static'

import Section from './_view'

export default async function Bonus({ params }) {
  const { tab } = await params

  const [
    settings,
    res,
  ] = await Promise.all([
    getSettings(),
    apiRequest(`bonuses/${tab}/`, {
      method: 'GET',
      next: { tags: ['bonuses'] }
    })
  ])

  return (
    <Section
      settings={settings}
      data={res?.data}
      meta={res?.meta}
      tab={tab}
    />
  )
}

