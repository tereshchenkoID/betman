import { Suspense } from 'react'

import { QUANTITY } from '@/constant/config'

import { apiRequest } from '@/app/actions/api'

import Section from './_view'

const defaultRange = () => {
  const now = new Date()
  const from = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)

  return {
    from: from.getTime(),
    to: now.getTime(),
  }
}

export default async function History({ params, searchParams }) {
  const { tab } = await params
  const { page, quantity, from, to } = await searchParams

  const queryParams = {
    page: page || 1,
    quantity: quantity || QUANTITY[0]?.value,
    from: from ? from : defaultRange().from,
    to: to ? to : defaultRange().to,
  }

  const res = await apiRequest(`history/${tab}`, {
    method: 'POST',
    params: queryParams,
  })

  return (
    <Suspense fallback={null}>
      <Section
        data={res?.data}
        meta={res?.meta}
        tab={tab}
        queryParams={queryParams}
      />
    </Suspense>
  )
}
