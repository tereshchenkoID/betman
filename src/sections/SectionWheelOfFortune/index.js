'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import Inner from '@/modules/Inner'
import Wheel from './Wheel'
import Countdown from './Countdown'

import style from './index.module.scss'

const SectionWheelOfFortune = ({
  data,
  meta,
  settings,
  user,
  wheelsRound
}) => {
  const router = useRouter()
  if (meta?.results === '0') return null

  return (
    <section className={style.block}>
      <div>
        <h1>{data?.title}</h1>
        {
          data?.message &&
          <div className={style.header}>
            <span>{data?.message}</span>
            <Countdown
              targetTimestamp={data?.timer}
              onExpire={() => router.refresh()}
            />
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
        />
        <Wheel
          mock={data?.sectors}
          settings={settings}
          user={user}
          wheelsRound={wheelsRound}
        />
      </div>
      {
        data?.description &&
        <Inner data={data?.description} />
      }
    </section>
  )
}

export default SectionWheelOfFortune
