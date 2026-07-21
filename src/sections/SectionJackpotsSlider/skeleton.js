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
        counts={3}
        columns={3}
        rows={1}
        styles={{ height: 470 }}
      />
    </>
  )
}

export default Skeleton
