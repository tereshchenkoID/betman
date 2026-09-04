import { ROUTES_USER } from '@/constant/config'

import { redirect } from '@/i18n/navigation'

export default async function History({ params }) {
  const { locale } = await params

  redirect({
    href: `${ROUTES_USER.history.url}/games`,
    locale
  })
}
