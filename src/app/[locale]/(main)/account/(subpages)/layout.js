import { redirect } from '@/i18n/navigation'

import { NAVIGATION } from '@/constant/config'

import { getPageMetadata } from '@/app/actions/metadata'
import { getCachedUser } from '@/app/actions/static'

import Section from './_view'

export async function generateMetadata() {
  return await getPageMetadata('profile')
}

export default async function AccountLayout({ children, params }) {
  const { locale } = await params
  const user = await getCachedUser()

  if (!user?.id) {
    redirect({
      href: {
        pathname: NAVIGATION.login.url,
        query: { expired: '1' },
      },
      locale
    })
  }

  return (
    <>
      <Section />
      {children}
    </>
  )
}
