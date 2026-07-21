'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { NAVIGATION } from '@/constant/config'

import Back from '@/modules/Back'

import style from './index.module.scss'

const SectionPromo = ({ data, meta }) => {
  const t = useTranslations()

  return (
    <section>
      <div className={style.header}>
        <Back url={NAVIGATION.promotions.url} />
        <h1>{data?.title}</h1>
      </div>
      <div className={style.content}>
        {
          data?.image &&
          <Image
            src={data?.image}
            className={style.image}
            alt={data?.title || 'Promo image'}
            width={760}
            height={380}
            priority
            decoding="async"
          />
        }
        <h2>{data?.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: data?.description }} />
      </div>
    </section>
  )
}

export default SectionPromo
