import Preload from '@/components/Preload'

const Skeleton = () => {
  return (
    <Preload
      counts={2}
      columns={2}
      rows={1}
      styles={{ height: 128 }}
    />
  )
}

export default Skeleton
