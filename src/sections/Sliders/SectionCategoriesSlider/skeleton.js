import Preload from '@/components/Preload'

import style from './index.module.scss'

const Skeleton = () => {
  return (
    <Preload
      count={6}
      className={style.skeleton}
    />
  )
}

export default Skeleton
