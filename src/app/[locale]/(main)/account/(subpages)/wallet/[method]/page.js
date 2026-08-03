import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'

import { getCachedUser } from '@/app/actions/auth'

import SectionTooltip from '@/sections/SectionTooltip'

const COMPONENTS_MAP = {
  crypto: {
    deposit: dynamic(() => import('@/modules/Wallet/Crypto/Deposit')),
    withdrawal: dynamic(() => import('@/modules/Wallet/Crypto/Withdrawal')),
  },
  voucher: {
    deposit: dynamic(() => import('@/modules/Wallet/Voucher/Deposit')),
    withdrawal: dynamic(() => import('@/modules/Wallet/Voucher/Withdrawal')),
  },
}

export default async function Wallet({ params, searchParams }) {
  const { method } = await params
  const { tab = 'deposit' } = await searchParams
  const user = await getCachedUser()

  const ActiveComponent = COMPONENTS_MAP[method]?.[tab]

  if (!ActiveComponent) {
    notFound()
  }

  const payment = user?.payements?.find((p) => p.alias === method)

  return (
    <>
      <ActiveComponent
        user={user}
        data={payment}
      />
      <SectionTooltip alias={`${method}/${tab}`} />
    </>
  )
}
