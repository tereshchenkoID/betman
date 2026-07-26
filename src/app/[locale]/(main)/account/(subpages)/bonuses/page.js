import { getPageMetadata } from '@/app/actions/metadata'
import { apiRequest } from '@/app/actions/api'
import { getSettings } from '@/app/actions/static'

import SectionAccountBonuses from '@/sections/SectionAccountBonuses'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return await getPageMetadata('profile', locale)
}

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
