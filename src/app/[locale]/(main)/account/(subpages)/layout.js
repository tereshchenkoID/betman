import { getPageMetadata } from '@/app/actions/metadata'

import SectionAccountNavigation from '@/sections/SectionAccountNavigation'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return await getPageMetadata('profile', locale)
}

export default async function AccountLayout({ children }) {
  return (
    <>
      <SectionAccountNavigation />
      {children}
    </>
  )
}
