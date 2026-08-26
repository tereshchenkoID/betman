import { redirect } from '@/i18n/routing'

import { ROUTES_USER } from '@/constant/config'

export default async function Bonuses({ params }) {
  const { locale } = await params

  redirect({
    href: `${ROUTES_USER.bonuses.url}/available`,
    locale
  })
}
