import { ROUTES_USER } from '@/constant/config'

import { redirect } from '@/i18n/navigation'

export default async function Profile({ params }) {
  const { locale } = await params

  redirect({
    href: `${ROUTES_USER.profile.url}/general`,
    locale
  })
}
