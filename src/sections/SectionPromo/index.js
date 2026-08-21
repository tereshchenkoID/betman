'use client'

import Image from 'next/image'

import { Fragment } from 'react'

import Title from '@/modules/Title'
import Inner from '@/modules/Inner'

import style from './index.module.scss'

const SectionPromo = ({ data, meta }) => {
  if (meta?.results === '0') return null

  return (
    <section>
      {
        data?.map((el, idx) =>
          <Fragment key={idx}>
            <Title
              isBack={true}
              title={el?.title}
            />
            <div className={style.content}>
              {
                el?.image &&
                <Image
                  src={el?.image}
                  className={style.image}
                  alt={el?.title || 'Promo image'}
                  width={760}
                  height={380}
                  priority
                  decoding="async"
                  sizes="360"
                  unoptimized
                />
              }
              <h2>{el?.title}</h2>
              <Inner data={el?.description} />
            </div>
          </Fragment>
        )
      }
    </section>
  )
}

export default SectionPromo
