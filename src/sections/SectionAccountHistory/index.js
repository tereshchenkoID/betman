'use client'

import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'
import { notFound, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'
import { useRouter, usePathname } from '@/i18n/routing'

import { ROUTES_USER } from '@/constant/config'

import DateRange from '@/components/DateRange'
import Select from '@/components/Select'
import Loader from '@/components/Loader'
import Tabs from '@/modules/Tabs'
import Pagination from '@/modules/Pagination'

import style from './index.module.scss'

const DATA = [
  { key: 'games', value: 0 },
  { key: 'deposit', value: 1 },
  { key: 'withdrawal', value: 2 },
  { key: 'bonuses', value: 3 },
]

const QUANTITY = [
  { value: 10, label: '10' },
  { value: 20, label: '20' },
  { value: 50, label: '50' },
  { value: 100, label: '100' },
]

const COMPONENTS_MAP = {
  games: dynamic(() => import('./Games')),
  deposit: dynamic(() => import('./Deposit')),
}

const SectionAccountHistory = ({ user, data, meta, tab, queryParams }) => {
  const t = useTranslations()
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const quantity = Number(searchParams.get('quantity')) || queryParams.quantity
  const from = searchParams.get('from') ? Number(searchParams.get('from')) : queryParams.from
  const to = searchParams.get('to') ? Number(searchParams.get('to')) : queryParams.to

  const updateQuery = (newParams) => {
    const params = new URLSearchParams(searchParams.toString())

    Object.entries(newParams).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        params.set(key, String(val))
      } else {
        params.delete(key)
      }
    })

    if (!newParams.page) {
      params.set('page', '1')
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    })
  }

  const handleActive = (el) => {
    startTransition(() => {
      router.push(`${ROUTES_USER.history.url}/${el.key}`, { scroll: false })
    })
  }

  const ActiveComponent = COMPONENTS_MAP[tab]

  if (!ActiveComponent) {
    notFound()
  }

  const activeTab = DATA.find((item) => pathname.includes(item.key)) || DATA[0]
  const selectedQuantity = QUANTITY.find((el) => el.value === quantity) || QUANTITY[0]

  return (
    <>
      <section>
        <Tabs
          options={DATA}
          data={activeTab}
          action={handleActive}
        />
      </section>
      <section className={style.section}>
        <div className={style.header}>
          <DateRange
            placeholder="Date Range"
            value={{ from, to }}
            onChange={(range) => {
              if (range?.from && range?.to) {
                updateQuery({
                  from: range.from,
                  to: range.to,
                })
              }
            }}
          />
        </div>
        <div className={style.container}>
          {
            isPending
              ?
                <Loader />
              :
                <ActiveComponent
                  user={user}
                  data={data}
                  meta={meta}
                />
          }
        </div>
        <div className={style.footer}>
          <Select
            placeholder={t('quantity')}
            classes={[style.select]}
            data={QUANTITY}
            value={selectedQuantity}
            isSearch={false}
            onChange={(selected) => updateQuery({ quantity: selected.value })}
          />
          <Pagination meta={meta} />
        </div>
      </section>
    </>
  )
}

export default SectionAccountHistory
