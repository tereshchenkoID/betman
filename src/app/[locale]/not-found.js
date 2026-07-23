import SectionNotFound from '@/sections/SectionNotFound'

// TODO Remove after fix content side

export default async function NotFoundPage() {
  return (
    <main
      style={{
        display: 'flex',
        justifyContent: 'center',
        gridTemplateColumns: '1fr',
      }}
    >
      <SectionNotFound />
    </main>
  )
}
