'use client'

import Image from 'next/image'

import { Fragment } from 'react'

import Action from '@/components/Action'
import Title from '@/modules/Title'
import Inner from '@/modules/Inner'

import style from './index.module.scss'

const SectionPromo = ({ data, meta }) => {
  if (meta?.results === '0') return null

  return (
    <section>
      {
        data?.map((el, idx) =>
          <Fragment key={el?.id || idx}>
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
                  width={1152}
                  height={576}
                  priority
                  decoding="async"
                  sizes="576"
                  unoptimized
                />
              }
              <Inner data={el?.description} />
              {
                el?.button?.text &&
                <Action
                  to={el?.button?.link}
                  classes={['primary', 'md', style.button]}
                  placeholder={el?.button?.text}
                  target={el?.button?.newtab === '1' ? '_blank' : undefined}
                />
              }
            </div>
          </Fragment>
        )
      }
    </section>
  )
}

export default SectionPromo
