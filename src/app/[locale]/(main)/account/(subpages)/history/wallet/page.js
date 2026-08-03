import { apiRequest } from '@/app/actions/api'
import { getCachedUser } from '@/app/actions/auth'

import SectionAccountHistoryWallet from '@/sections/SectionAccountHistoryWallet'

export default async function Casino({ searchParams }) {
  const { page } = await searchParams
  const currentPage = Number(page) || 1

  const [
    user,
    res,
  ] = await Promise.all([
    getCachedUser(),
    apiRequest('wallet-history/', {
      method: 'POST',
      params: {
        page: currentPage,
        code: 1,
      }
    })
  ])

  return (
    <SectionAccountHistoryWallet
      user={user}
      data={res?.data}
      meta={res?.meta}
    />
  )
}
