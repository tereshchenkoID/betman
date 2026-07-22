import Preload from '@/components/Preload'

const Skeleton = () => {
  return (
    <Preload
      counts={4}
      columns={4}
      rows={1}
      styles={{ height: 70 }}
    />
  )
}

export default Skeleton
