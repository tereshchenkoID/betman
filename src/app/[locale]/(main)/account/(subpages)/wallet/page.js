import { ROUTES_USER } from '@/constant/config'

import { getCachedUser } from '@/app/actions/static'

import { redirect } from '@/i18n/navigation'

export const dynamic = 'force-dynamic'

export default async function Wallet({ params }) {
  const { locale } = await params
  const user = await getCachedUser()
  const method = user?.payements?.[0]?.alias || 'voucher'

  redirect({
    href: `${ROUTES_USER.wallet.url}/${method}/deposit`,
    locale,
  })
}
