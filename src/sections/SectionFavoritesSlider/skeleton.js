import classNames from 'classnames'

import Preload from '@/components/Preload'

import style from './index.module.scss'

const Skeleton = () => {
  return (
    <div>
      <Preload
        count={1}
        className={
          classNames(
            style.skeleton,
            style.top
          )
        }
      />
      <Preload
        count={7}
        className={
          classNames(
            style.skeleton,
            style.bottom
          )
        }
      />
    </div>
  )
}

export default Skeleton
