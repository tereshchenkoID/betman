import { Link } from '@/i18n/routing'
import Image from 'next/image'

import { NAVIGATION } from '@/constant/config'
import { imageError } from '@/helpers/image'

import Action from '@/components/Action'

import style from './index.module.scss'

const ChallengeCard = ({ data }) => {
  const { title, subtitle, description, alt, button } = data

  return (
    <article className={style.block}>
      <Link
        href={button?.link || NAVIGATION.home.url}
        target={button?.newtab === '1' ? '_blank' : undefined}
        rel={button?.newtab === '1' ? 'noopener noreferrer' : undefined}
        prefetch={false}
      >
        <div className={style.wrapper}>
          <div className={style.content}>
            { title && <h2 className={style.title}>{title}</h2> }
            { subtitle && <h3 className={style.subtitle}>{subtitle}</h3> }
            { description && <p className={style.description}>{description}</p> }
            {
              button?.text !== '' &&
              <Action
                tag={'span'}
                classes={['primary', 'lg', style.button]}
                placeholder={button?.text}
                aria-hidden="true"
              />
            }
          </div>
          <Image
            src={data?.image}
            className={style.picture}
            alt={alt}
            width={320}
            height={128}
            decoding="async"
            onError={(e) => imageError(e, false)}
            unoptimized
          />
        </div>
      </Link>
    </article>
  )
}

export default ChallengeCard
