import { redirect } from 'next/navigation'

import { ROUTES_USER } from '@/constant/config'

export default function History() {
  redirect(`${ROUTES_USER.history.url}/casino`)
}
