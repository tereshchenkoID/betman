import GoogleButton from '@/modules/Auth/GoogleButton'

import style from './index.module.scss'

const Providers = () => {
  return (
    <div className={style.block}>
      <GoogleButton />
    </div>
  )
}

export default Providers
