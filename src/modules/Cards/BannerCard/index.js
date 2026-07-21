import Link from 'next/link'
import Image from 'next/image'

import { NAVIGATION } from '@/constant/config'

import Action from '@/components/Action'

import style from './index.module.scss'

const BannerCard = ({ data }) => {
  const { title, subtitle, description, alt, button } = data

  return (
    <Link
      href={button?.link || NAVIGATION.home.url}
      className={style.block}
      target={button?.newtab === '1' ? '_blank' : undefined}
      rel={button?.newtab === '1' ? 'noopener noreferrer' : undefined}
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
        />
      }
      <div className={style.content}>
        { title && <p className={style.title}>{title}</p> }
        { subtitle && <p className={style.subtitle}>{subtitle}</p> }
        { description && <p className={style.description}>{description}</p> }
        {
          button?.text !== '' &&
          <Action
            tag={'span'}
            classes={['primary', 'sm', style.button]}
            placeholder={button?.text}
          />
        }
      </div>
    </Link>
  )
}

export default BannerCard
