import { getPageMetadata } from '@/services/metadata'

import { NAVIGATION } from '@/constant/config'

import Container from '@/components/Container'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return await getPageMetadata('profile', locale)
}

export default async function Profile() {
  return (
    <section>
      <Container>
        <h1>Profile</h1>
      </Container>
    </section>
  )
}
