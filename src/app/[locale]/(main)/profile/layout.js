import { getPageMetadata } from '@/services/metadata'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return await getPageMetadata('profile', locale)
}

export default async function Layout({ children }) {
  return (
    <>
      Profile
      {children}
    </>
  )
}
