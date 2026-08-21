import { redirect, RedirectType } from 'next/navigation'
import { ROUTES_USER } from '@/constant/config'

export default async function Account() {
  redirect(ROUTES_USER.profile.url, RedirectType.replace)
}
