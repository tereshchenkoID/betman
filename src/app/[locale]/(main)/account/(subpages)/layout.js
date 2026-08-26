import { notFound } from 'next/navigation'

import { getPageMetadata } from '@/app/actions/metadata'
import { getCachedUser } from '@/app/actions/static'

import SectionAccountNavigation from '@/sections/SectionAccountNavigation'

export async function generateMetadata() {
  return await getPageMetadata('profile')
}

export default async function AccountLayout({ children }) {
  const user = await getCachedUser()

  if (!user?.id) {
    notFound()
  }

  return (
    <>
      <SectionAccountNavigation />
      {children}
    </>
  )
}
