import { redirect, RedirectType } from 'next/navigation'

import { ROUTES_USER } from '@/constant/config'

import { getCachedUser } from '@/app/actions/auth'

export default async function Wallet() {
  const user = await getCachedUser()
  const method = user?.payements?.[0]?.alias || 'voucher'

  redirect(`${ROUTES_USER.wallet.url}/${method}/deposit`, RedirectType.replace)
}
