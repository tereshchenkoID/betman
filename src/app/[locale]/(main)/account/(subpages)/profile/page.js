import { getPageMetadata } from '@/app/actions/metadata'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return await getPageMetadata('profile', locale)
}

export default async function Profile() {
  return (
    <>
      <p>Profile</p>
    </>
  )
}
