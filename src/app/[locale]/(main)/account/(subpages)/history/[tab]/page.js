import { apiRequest } from '@/app/actions/api'
import { getCachedUser } from '@/app/actions/static'

import SectionAccountHistory from '@/sections/SectionAccountHistory'

export default async function History({ params, searchParams }) {
  const { tab } = await params
  const { page } = await searchParams
  const currentPage = Number(page) || 1

  const [
    user,
    res
  ] = await Promise.all([
    getCachedUser(),
    apiRequest(`history/${tab}`, {
      method: 'POST',
      params: {
        page: currentPage,
        quantity: 10,
        from: '',
        to: '',
      }
    })
  ])

  return (
    <SectionAccountHistory
      user={user}
      data={res?.data}
      meta={res?.meta}
      currentPage={currentPage}
      tab={tab}
    />
  )
}
