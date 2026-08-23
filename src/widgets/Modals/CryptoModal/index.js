import { useTranslations } from 'next-intl'

import style from './index.module.scss'

const CryptoModal = () => {
  const t = useTranslations()

  return (
    <div className={style.block}>
      <p>Crypto modal</p>
      <p>1</p>
    </div>
  )
}

export default CryptoModal
