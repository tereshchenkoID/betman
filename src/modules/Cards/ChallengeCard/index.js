import Link from 'next/link'
import Image from 'next/image'

import { NAVIGATION } from '@/constant/config'

import Action from '@/components/Action'

import style from './index.module.scss'

const ChallengeCard = ({ data }) => {
  const { title, subtitle, description, alt, button } = data

  return (
    <Link
      href={button?.link || NAVIGATION.home.url}
      className={style.block}
      target={button?.newtab === '1' ? '_blank' : undefined}
      rel={button?.newtab === '1' ? 'noopener noreferrer' : undefined}
    >
      <div className={style.wrapper}>
        <div className={style.content}>
          { title && <h3 className={style.title}>{title}</h3> }
          { subtitle && <h2 className={style.subtitle}>{subtitle}</h2> }
          { description && <p className={style.description}>{description}</p> }
          {
            button?.text !== '' &&
            <Action
              tag={'span'}
              classes={['primary', 'lg', style.button]}
              placeholder={button?.text}
              alt={button?.text}
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
          loading="eager"
        />
      </div>
    </Link>
  )
}

export default ChallengeCard
