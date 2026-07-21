import Preload from '@/components/Preload'

const Skeleton = () => {
  return (
    <Preload
      counts={6}
      columns={6}
      rows={1}
      styles={{ height: 48 }}
    />
  )
}

export default Skeleton
