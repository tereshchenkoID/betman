import Preload from '@/components/Preload'

const Skeleton = () => {
  return (
    <>
      <Preload
        counts={1}
        columns={1}
        styles={{ height: 32, marginBottom: 'var(--gap-default)' }}
      />
      <Preload
        counts={6}
        columns={6}
        rows={1}
        styles={{ height: 211 }}
      />
    </>
  )
}

export default Skeleton
