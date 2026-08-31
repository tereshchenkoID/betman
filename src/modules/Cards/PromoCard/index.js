'use client'

import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { imageError } from '@/helpers/image'

import Action from '@/components/Action'
import Icon from '@/components/Icon'
import Badge from '@/modules/Badge'

import style from './index.module.scss'

const PromoCard = ({ data }) => {
  const { title, category, teaser, button, image } = data

  return (
    <Link
      className={style.block}
      href={button?.link}
      target={button?.newtab === '1' ? '_blank' : undefined}
      aria-label={title || teaser}
    >
      <article className={style.wrapper}>
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
              onError={imageError}
              unoptimized
            />
          }
          <div className={style.badges}>
            {
              category?.split(',').map((el, idx) =>
              <Badge
                key={idx}
                data={el}
                classes={['primary', 'md']}
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
              tag={'span'}
              classes={['outline', 'md', style.link]}
              placeholder={button?.text}
            >
              <span>{button?.text}</span>
              <Icon name="navigation-chevron-right-small" />
            </Action>
          }
        </div>
      </article>
    </Link>
  )
}

export default PromoCard
