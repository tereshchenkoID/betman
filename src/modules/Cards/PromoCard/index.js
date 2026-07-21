'use client'

import Image from 'next/image'

import Action from '@/components/Action'
import Icon from '@/components/Icon'
import Badge from '@/modules/Badge'

import style from './index.module.scss'

const PromoCard = ({ data }) => {
  const { title, category, teaser, button, image } = data

  return (
    <article className={style.block}>
      <div className={style.picture}>
        {
          image &&
          <Image
            src={image}
            className={style.image}
            alt={title || 'Promo image'}
            width={336}
            height={159}
            priority
            decoding="async"
          />
        }
        <div className={style.badges}>
          {
            category?.split(',').map((el, idx) =>
            <Badge
              key={idx}
              data={el}
              classes={['secondary', 'md']}
            />
          )}
        </div>
      </div>
      <div className={style.content}>
        <h2>{title}</h2>
        <p className={style.text}>{teaser}</p>
        {
          button?.text &&
          <Action
            to={button?.link}
            classes={['outline', 'sm', style.link]}
            placeholder={button?.text}
            alt={button?.text}
            target={button?.newtab === '1' ? '_blank' : undefined}
          >
            <span>{button?.text}</span>
            <Icon name="icon-navigation-chevron-right-small" />
          </Action>
        }
      </div>
    </article>
  )
}

export default PromoCard
