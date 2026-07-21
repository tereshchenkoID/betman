import { getPageMetadata } from '@/services/metadata'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return await getPageMetadata('favorites', locale)
}

export default async function Favorites() {
  return (
    <>
      Favorites
    </>
  )
}
