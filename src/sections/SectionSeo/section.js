'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import classNames from 'classnames'

import Action from '@/components/Action'
import Inner from '@/modules/Inner'

import style from './index.module.scss'

const Section = ({ data, meta }) => {
  const t = useTranslations()
  const [toggle, setToggle] = useState(false)

  if (meta?.results === '0') return null

  return (
    <section className={style.block}>
      {
        data?.map((el, idx) =>
          <div
            key={idx}
            className={
              classNames(
                style.content,
                !toggle && style.collapsed
              )
            }
          >
            <Inner data={el?.text} />
          </div>
        )
      }
      <Action
        classes={['secondary', 'md']}
        placeholder={t(toggle ? 'show_less' : 'show_more')}
        onChange={() => setToggle(!toggle)}
      />
    </section>
  )
}

export default Section
