'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

import Inner from '@/modules/Inner'
import Title from '@/modules/Title'
import Wheel from './Wheel'
import Countdown from './Countdown'

import style from './index.module.scss'

const SectionWheelOfFortune = ({
  data,
  meta,
  user,
  wheelsRound
}) => {
  const router = useRouter()
  if (meta?.results === '0') return null

  return (
    <section className={style.block}>
      <div>
        <Title title={data?.title} />
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
          unoptimized={true}
        />
        <Wheel
          mock={data?.sectors}
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
