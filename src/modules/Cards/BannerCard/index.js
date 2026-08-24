import { Link } from '@/i18n/routing'
import Image from 'next/image'

import { NAVIGATION } from '@/constant/config'

import { imageError } from '@/helpers/image'

import Action from '@/components/Action'

import style from './index.module.scss'

const BannerCard = ({ data }) => {
  const { title, subtitle, description, alt, button } = data

  return (
    <article className={style.block}>
      <Link
        href={button?.link || NAVIGATION.home.url}
        className={style.link}
        target={button?.newtab === '1' ? '_blank' : undefined}
        rel={button?.newtab === '1' ? 'noopener noreferrer' : undefined}
        prefetch={false}
        aria-label={title || alt || description || 'Banner card'}
      >
        {
          data?.image &&
          <Image
            src={data?.image}
            className={style.picture}
            alt={alt || title || ''}
            width={320}
            height={128}
            priority
            fetchPriority="high"
            sizes="320px"
            onError={imageError}
            unoptimized
          />
        }
        <div className={style.content}>
          { title && <h3 className={style.title}>{title}</h3> }
          { subtitle && <p className={style.subtitle}>{subtitle}</p> }
          { description && <p className={style.description}>{description}</p> }
          {
            button?.text !== '' &&
            <Action
              tag={'span'}
              classes={['primary', 'sm', style.button]}
              placeholder={button?.text}
              aria-hidden="true"
            />
          }
        </div>
      </Link>
    </article>
  )
}

export default BannerCard
