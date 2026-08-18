import { redirect, RedirectType } from 'next/navigation'

import { ROUTES_USER } from '@/constant/config'

export default async function Bonuses() {
  redirect(`${ROUTES_USER.bonuses.url}/available`, RedirectType.replace)
}
