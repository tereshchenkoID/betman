import { apiRequest } from '@/app/actions/api'
import { getCachedUser } from '@/app/actions/auth'

import SectionAccountHistoryCasino from '@/sections/SectionAccountHistoryCasino'

export default async function Casino({ searchParams }) {
  const { page } = await searchParams
  const currentPage = Number(page) || 1

  const [
    user,
    res
  ] = await Promise.all([
    getCachedUser(),
    apiRequest('game-history/', {
      method: 'POST',
      params: {
        page: currentPage
      }
    })
  ])

  return (
    <SectionAccountHistoryCasino
      user={user}
      data={res?.data}
      meta={res?.meta}
      currentPage={currentPage}
    />
  )
}
