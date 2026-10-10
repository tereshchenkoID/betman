'use client'

import { useTransition } from 'react'

import { useRouter } from '@/i18n/navigation'

import { NAVIGATION } from '@/constant/config'

import Loader from '@/components/Loader'
import JackpotCard from '@/modules/Cards/JackpotCard'
import Inner from '@/modules/Inner'
import Tabs from '@/modules/Tabs'
import Title from '@/modules/Title'
import SectionGames from '@/sections/SectionGames'

import style from './index.module.scss'

const OPTIONS = [
  { key: 'preview', value: 0 },
  { key: 'games', value: 1 },
  { key: 'rules', value: 2 }
]

const Section = ({
  id,
  tab,
  data,
  games,
  meta,
}) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const active = OPTIONS.find(opt => opt.key === tab) || OPTIONS[0]

  const handleActive = (el) => {
    startTransition(() => {
      router.push(`${NAVIGATION.jackpots.url}/${id}/${el.key}`, { scroll: false })
    })
  }

  return (
    <section>
      <Title
        title={data?.title}
        isBack={true}
      />
      <Tabs
        options={OPTIONS}
        data={active}
        action={handleActive}
      />
      <div className={style.content}>
        {
          isPending
            ?
              <Loader />
            :
              <>
                {
                  active?.value === 0 &&
                  <JackpotCard
                    data={data}
                    classes={['extended']}
                  />
                }
                {
                  active?.value === 1 &&
                  <SectionGames
                    url={`jackpot/${id}/games`}
                    data={games}
                    meta={meta}
                  />
                }
                {
                  active?.value === 2 &&
                  <Inner data={data?.description} />
                }
              </>
        }
      </div>
    </section>
  )
}

export default Section
