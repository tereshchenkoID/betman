import { getPageMetadata } from '@/app/actions/metadata'

import { NAVIGATION } from '@/constant/config'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return await getPageMetadata('profile', locale)
}

export default async function Profile() {
  return (
    <section>
      <h1>Profile</h1>
    </section>
  )
}
