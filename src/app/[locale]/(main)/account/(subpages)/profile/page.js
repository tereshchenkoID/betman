import { redirect, RedirectType } from 'next/navigation'

import { ROUTES_USER } from '@/constant/config'

export default async function Profile() {
  redirect(`${ROUTES_USER.profile.url}/general`, RedirectType.replace)
}
