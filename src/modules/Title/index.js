import Back from '@/modules/Back'

import style from './index.module.scss'

const Title = ({
  title,
  isBack = false,
}) => {
  return (
    <div className={style.block}>
      {
        isBack &&
        <Back />
      }
      <h1>{title}</h1>
    </div>
  )
}

export default Title
