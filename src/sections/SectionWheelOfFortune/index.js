'use client'

import Image from 'next/image'

import Wheel from './Wheel'

import style from './index.module.scss'

const SectionWheelOfFortune = ({
  data,
  meta,
  settings,
  wheelsRound
}) => {
  if (meta?.results === '0') return null

  return (
    <section className={style.block}>
      <h1>{data?.title}</h1>
      <div className={style.content}>
        <Image
          className={style.decor}
          src={'/images/wheels/background.webp'}
          alt={'Background'}
          fill
          sizes="100vw"
        />
        <Wheel
          mock={data?.sectors}
          settings={settings}
          wheelsRound={wheelsRound}
        />
      </div>
      {
        data?.description &&
        <p>{data?.description}</p>
      }
    </section>
  )
}

export default SectionWheelOfFortune
