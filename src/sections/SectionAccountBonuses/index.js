'use client'

import { useTransition } from 'react'
import { useRouter } from '@/i18n/navigation'

import { ROUTES_USER } from '@/constant/config'

import Loader from '@/components/Loader'
import Empty from '@/modules/Empty'
import Tabs from '@/modules/Tabs'
import BonusCard from '@/modules/Cards/BonusCard'
import BonusQuestCard from '@/modules/Cards/BonusQuestCard'

import style from './index.module.scss'

const OPTIONS = [
  {
    key: 'available',
    value: 0
  },
  {
    key: 'active',
    value: 1
  },
  {
    key: 'expired',
    value: 2
  }
]

const SectionAccountBonuses = ({
  settings,
  data,
  meta,
  tab,
  user,
}) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const active = OPTIONS.find(opt => opt.key === tab) || OPTIONS[0]

  const handleActive = (el) => {
    startTransition(() => {
      router.push(`${ROUTES_USER.bonuses.url}/${el.key}`, { scroll: false })
    })
  }

  return (
    <>
      <section>
        <Tabs
          options={OPTIONS}
          data={active}
          action={handleActive}
        />
      </section>
      <section className={style.section}>
        {
          isPending
            ?
              <Loader />
            :
              <>
              {
                meta?.results !== "0"
                  ?
                    <div className={style.list}>
                      {
                        data?.map((el, idx) =>
                          tab === 'available'
                            ?
                              <BonusQuestCard
                                key={idx}
                                data={el}
                                user={user}
                              />
                            :
                              <BonusCard
                                key={idx}
                                data={el}
                                settings={settings}
                              />
                        )
                      }
                    </div>
                  :
                    <Empty />
              }
              </>
        }
      </section>
    </>
  )
}

export default SectionAccountBonuses
