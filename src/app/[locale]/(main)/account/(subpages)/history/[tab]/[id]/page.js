export default async function Details({ params, searchParams }) {
  const { id } = await params
  const { page } = await searchParams
  const currentPage = Number(page) || 1

  return (
    <div>{id}, {currentPage}</div>
  )
}
