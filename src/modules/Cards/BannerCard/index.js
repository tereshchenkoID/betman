import { Link } from '@/i18n/navigation'
import Image from 'next/image'

import { imageError } from '@/helpers/image'

import Action from '@/components/Action'

import style from './index.module.scss'

const BannerCard = ({ data }) => {
  const { title, subtitle, description, alt, button } = data
  const { link, text, newtab } = button

  return (
    <article className={style.block}>
      <Link
        href={link}
        className={style.link}
        target={newtab === '1' ? '_blank' : undefined}
        rel={newtab === '1' ? 'noopener noreferrer' : undefined}
        aria-label={title || alt || description || 'Banner card'}
        prefetch={false}
      >
        {
          data?.image &&
          <Image
            src={data?.image}
            className={style.picture}
            alt={alt || title || 'Banner image'}
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
            text !== '' &&
            <Action
              tag={'span'}
              classes={['primary', 'sm', style.button]}
              placeholder={text}
              aria-hidden="true"
            />
          }
        </div>
      </Link>
    </article>
  )
}

export default BannerCard
