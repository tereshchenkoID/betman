import Preload from '@/components/Preload'

const Skeleton = () => {
  return (
    <Preload
      counts={1}
      columns={1}
      rows={1}
      styles={{ height: 200 }}
    />
  )
}

export default Skeleton
