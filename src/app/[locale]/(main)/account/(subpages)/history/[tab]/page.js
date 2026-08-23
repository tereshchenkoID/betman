import { apiRequest } from '@/app/actions/api'
import { getCachedUser } from '@/app/actions/static'

import SectionAccountHistory from '@/sections/SectionAccountHistory'

const getDefaultRange = () => {
  const now = new Date()
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)

  return {
    from: startOfDay.getTime(),
    to: now.getTime(),
  }
}

export default async function History({ params, searchParams }) {
  const { tab } = await params
  const { page, quantity, from, to } = await searchParams

  const defaultRange = getDefaultRange()

  const queryParams = {
    page: Number(page) || 1,
    quantity: Number(quantity) || 10,
    from: from ? Number(from) : defaultRange.from,
    to: to ? Number(to) : defaultRange.to,
  }

  const [user, res] = await Promise.all([
    getCachedUser(),
    apiRequest(`history/${tab}`, {
      method: 'POST',
      params: queryParams,
    }),
  ])

  return (
    <SectionAccountHistory
      user={user}
      data={res?.data}
      meta={res?.meta}
      tab={tab}
      queryParams={queryParams}
    />
  )
}
