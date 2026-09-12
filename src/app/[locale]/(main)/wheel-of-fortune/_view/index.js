'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { useRouter } from '@/i18n/navigation'

import useModal from '@/hooks/useModal'
import { useUser } from '@/hooks/useUser'

import Preload from '@/components/Preload'
import Inner from '@/modules/Inner'
import Title from '@/modules/Title'

import Countdown from './Countdown'

import style from './index.module.scss'

const Wheel = dynamic(() => import('./Wheel'), {
  ssr: false,
  loading: () => <Preload count={1} className={style.skeleton} />,
})

const Section = ({ data, meta, wheelsRound }) => {
  const t = useTranslations()
  const router = useRouter()
  const { level } = useUser()
  const { openModal } = useModal()

  useEffect(() => {
    if (level === '1') {
      openModal('verify', { }, { title: t('verification') })
    }
  }, [level, openModal, t])

  return (
    <section className={style.block}>
      <div>
        <Title
          isBack={true}
          title={data?.title}
        />
        {
          wheelsRound?.message &&
          <div>
            <span>{wheelsRound?.message}</span>
            {
              wheelsRound?.timer &&
              <Countdown
                targetTimestamp={wheelsRound?.timer}
                onExpire={router.refresh}
              />
            }
          </div>
        }
      </div>

      <div className={style.content}>
        <Image
          className={style.decor}
          src={'/images/wheels/background.webp'}
          alt={'Wheel of Fortune'}
          fill
          sizes="100vw"
          loading="eager"
          unoptimized
        />
        {
          meta?.results !== '0' &&
          <Wheel
            mock={data?.sectors}
            wheelsRound={wheelsRound}
          />
        }
      </div>
      {
        data?.description &&
        <Inner data={data?.description} />
      }
    </section>
  )
}

export default Section
