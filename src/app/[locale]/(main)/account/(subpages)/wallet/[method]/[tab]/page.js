import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'

import { getCachedUser, getCountries, getProfile } from '@/app/actions/static'

import CryptoBanner from '@/modules/CryptoBanner'
import SectionTooltip from '@/sections/SectionTooltip'

const COMPONENTS_MAP = {
  crypto: {
    deposit: dynamic(() => import('@/modules/Wallet/Crypto/Deposit')),
    withdrawal: dynamic(() => import('@/modules/Wallet/Crypto/Withdrawal')),
  },
  cards: {
    deposit: dynamic(() => import('@/modules/Wallet/Cards/Deposit')),
    withdrawal: dynamic(() => import('@/modules/Wallet/Cards/Withdrawal')),
  },
  voucher: {
    deposit: dynamic(() => import('@/modules/Wallet/Voucher/Deposit')),
    withdrawal: dynamic(() => import('@/modules/Wallet/Voucher/Withdrawal')),
  },
}

export default async function Wallet({ params }) {
  const { method, tab } = await params
  const ActiveComponent = COMPONENTS_MAP[method]?.[tab]

  if (!ActiveComponent) {
    notFound()
  }

  const isCardsDeposit = method === 'cards' && tab === 'deposit'

  const [
    user,
    profile,
    countries
  ] = await Promise.all([
    getCachedUser(),
    isCardsDeposit ? getProfile() : Promise.resolve(null),
    isCardsDeposit ? getCountries() : Promise.resolve(null)
  ])

  const payment = user?.payements?.find((p) => p.alias === method)

  return (
    <>
      <div>
        {
          (method === 'crypto' && tab === 'deposit') &&
          <CryptoBanner />
        }
        <ActiveComponent
          data={payment}
          profile={profile}
          countries={countries}
        />
      </div>
      <SectionTooltip alias={`${method}/${tab}`} />
    </>
  )
}
