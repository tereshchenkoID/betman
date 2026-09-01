'use client'

import { Fragment } from 'react'

import Inner from '@/modules/Inner'
import Back from '@/modules/Back'

import style from './index.module.scss'

const SectionPage = ({ data, meta }) => {
  if (meta?.results === '0') return null

  const startsWithH1 = (htmlContent) => {
    if (!htmlContent) return false
    return /^\s*<h1[\s>]/i.test(htmlContent)
  }

  return (
    <section className={style.block}>
      {
        data?.map((el, idx) =>
          <Fragment key={el?.id || idx}>
            {
              startsWithH1(el?.description) &&
              <Back classes={style.button} />
            }
            <Inner data={el?.description}/>
          </Fragment>
        )
      }
    </section>
  )
}

export default SectionPage
