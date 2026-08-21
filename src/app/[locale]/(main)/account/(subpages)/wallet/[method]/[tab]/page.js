import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import Image from 'next/image'

import { getCachedUser } from '@/app/actions/static'

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

export default async function Wallet({ params }) {
  const { method, tab } = await params
  const user = await getCachedUser()

  const ActiveComponent = COMPONENTS_MAP[method]?.[tab]

  if (!ActiveComponent) {
    notFound()
  }

  const payment = user?.payements?.find((p) => p.alias === method)

  return (
    <>
      <div>
        {
          (method === 'crypto' && tab === 'deposit') &&
          <Image
            src={'/images/crypto.webp'}
            alt={'Crypto'}
            width={460}
            height={118}
            decoding="async"
            unoptimized
            style={{
              borderRadius: 'var(--border-radius-6)',
              marginBottom: 'var(--gap-12)',
            }}
          />
        }
        <ActiveComponent
          user={user}
          data={payment}
        />
      </div>
      <SectionTooltip alias={`${method}/${tab}`} />
    </>
  )
}
