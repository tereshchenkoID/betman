import { getPageMetadata } from '@/app/actions/metadata'

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
