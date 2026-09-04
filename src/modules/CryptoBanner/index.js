'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { useModal } from '@/context/ModalContext'

import style from './index.module.scss'

const CryptoBanner = () => {
  const t = useTranslations()
  const { openModal } = useModal()

  return (
    <button
      type="button"
      className={style.block}
      onClick={() => openModal('crypto', {}, { title: t('crypto'), size: 'md' })}
      aria-label={'Open Crypto Modal'}
    >
      <Image
        className={style.image}
        src={'/images/crypto.webp'}
        alt={'Crypto'}
        width={460}
        height={118}
        decoding="async"
        unoptimized
      />
    </button>
  )
}

export default CryptoBanner
