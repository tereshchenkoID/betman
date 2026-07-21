'use client'

import { useRouter } from 'next/navigation'

import { NAVIGATION } from '@/constant/config'

import Tabs from '@/modules/Tabs'
import Back from '@/modules/Back'
import Inner from '@/modules/Inner'
import JackpotCard from '@/modules/Cards/JackpotCard'
import SectionGames from '@/sections/SectionGames'

import style from './index.module.scss'

const OPTIONS = [
  {
    key: 'preview',
    value: 0
  },
  {
    key: 'games',
    value: 1
  },
  {
    key: 'rules',
    value: 2
  }
]

const SectionJackpot = ({
  id,
  tab,
  data,
  user,
  games,
  meta,
}) => {
  const router = useRouter()
  const active = OPTIONS.find(opt => opt.key === tab) || OPTIONS[0]

  const handleActive = (tab) => {
    router.push(`${NAVIGATION.jackpots.url}/${id}/${tab.key}`)
  }

  // TODO refactoring pages, meta, and data

  return (
    <section>
      <div className={style.header}>
        <Back url={NAVIGATION.jackpots.url} />
        <h1>{data?.title}</h1>
      </div>
      <Tabs
        options={OPTIONS}
        data={active}
        action={handleActive}
      />
      <div className={style.content}>
        {
          active?.key === OPTIONS[0]?.key &&
          <JackpotCard
            data={data}
            user={user}
            classes={['extended']}
          />
        }
        {
          active?.key === OPTIONS[1]?.key &&
          <SectionGames
            url={`jackpot/${id}/games`}
            user={user}
            data={games}
            meta={meta}
          />
        }
        {
          active?.key === OPTIONS[2]?.key &&
          <Inner data={data?.description} />
        }
      </div>
    </section>
  )
}

export default SectionJackpot
