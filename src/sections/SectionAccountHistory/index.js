'use client'

import { useTranslations } from 'next-intl'
import { startTransition, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useRouter } from '@/i18n/routing'

import { ROUTES_USER } from '@/constant/config'

import DateRange from '@/components/DateRange'
import Select from '@/components/Select'
import Tabs from '@/modules/Tabs'

import style from './index.module.scss'

const DATA = [
  {
    key: 'games',
    value: 0,
  },
  {
    key: 'deposit',
    value: 1,
  },
  {
    key: 'withdrawal',
    value: 2,
  },
  {
    key: 'bonuses',
    value: 3,
  },
]

const QUANTITY = [
  {
    value: 10,
    label: '10'
  },
  {
    value: 20,
    label: '20'
  },
  {
    value: 50,
    label: '50'
  },
  {
    value: 100,
    label: '100'
  }
]

const SectionAccountHistory = ({
  user,
  data,
  meta,
  currentPage,
  tab
}) => {
  const t = useTranslations()
  const pathname = usePathname()
  const router = useRouter()

  const [quantity, setQuantity] = useState(QUANTITY[0])

  const [range, setRange] = useState({
    from: new Date().setHours(0, 0, 0, 0),
    to: new Date().getTime(),
  })

  const active = DATA.find((item) => pathname.includes(item.key)) || DATA[0]

  const handleActive = (el) => {
    startTransition(() => {
      router.push(`${ROUTES_USER.history.url}/${el.key}`, { scroll: false })
    })
  }

  return (
    <>
      <section>
        <Tabs
          options={DATA}
          data={active}
          action={handleActive}
        />
      </section>
      <section>
        <div className={style.header}>
          <DateRange
            placeholder="Date Range"
            value={range}
            onChange={(range) => setRange(range)}
          />
          <Select
            placeholder={t('quantity')}
            classes={[style.select]}
            data={QUANTITY.map(({ value, label }) => ({ value, label }))}
            value={quantity}
            isSearch={false}
            onChange={value => setQuantity(value)}
          />
        </div>
      </section>
      <section className={style.section}>
        <p>{tab}</p>
      </section>
    </>
  )
}

export default SectionAccountHistory
