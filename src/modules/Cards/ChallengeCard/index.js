import { Link } from '@/i18n/navigation'
import Image from 'next/image'

import { imageError } from '@/helpers/image'

import Action from '@/components/Action'

import style from './index.module.scss'

const ChallengeCard = ({ data }) => {
  const { title, subtitle, image, description, alt, button } = data
  const { link, text, newtab } = button

  return (
    <article className={style.block}>
      <Link
        href={link}
        target={newtab === '1' ? '_blank' : undefined}
        rel={newtab === '1' ? 'noopener noreferrer' : undefined}
        prefetch={false}
      >
        <div className={style.wrapper}>
          <div className={style.content}>
            { title && <h2 className={style.title}>{title}</h2> }
            { subtitle && <h3 className={style.subtitle}>{subtitle}</h3> }
            { description && <p className={style.description}>{description}</p> }
            {
              text !== '' &&
              <Action
                tag={'span'}
                classes={['primary', 'lg', style.button]}
                placeholder={text}
                aria-hidden="true"
              />
            }
          </div>
          <Image
            src={image}
            className={style.picture}
            alt={alt || title || 'Challenge image'}
            width={320}
            height={128}
            decoding="async"
            loading="eager"
            onError={(e) => imageError(e, false)}
            unoptimized
          />
        </div>
      </Link>
    </article>
  )
}

export default ChallengeCard
