'use client'

import { useTransition } from 'react'
import { useTranslations } from 'next-intl'

import { useFilterState } from '@/hooks/useFilterState'
import { useUser } from '@/hooks/useUser'
import { toast } from '@/utils/toast'

import Action from '@/components/Action'
import Field from '@/components/Field'
import Select from '@/components/Select'

import { action } from './action'

import style from './index.module.scss'

const INITIAL_FILTER = {
  amount: '',
  card: null
}

const Withdrawal = ({ cards }) => {
  const t = useTranslations()
  const { level, currency } = useUser()

  const [isPending, startTransition] = useTransition()

  const { filter, setFilter, handlePropsChange } = useFilterState(INITIAL_FILTER)
  const isChanged = JSON.stringify(filter) !== JSON.stringify(INITIAL_FILTER)
  const isDisabled = !isChanged || !filter.amount || filter.card === null

  const handleSubmit = async (e) => {
    e && e.preventDefault()

    startTransition(async () => {
      const res = await action(filter)

      if (res?.code === '0') {
        setFilter(INITIAL_FILTER)
        toast.success(res?.message)
      }
      else {
        toast.error(res?.error_message || t('error'))
      }
    })
  }

  return (
    <form className={style.block} onSubmit={handleSubmit}>
      <Field
        type={'number'}
        placeholder={`${t('amount')}, ${currency?.text}`}
        data={filter.amount}
        onChange={value => handlePropsChange('amount', value)}
        isRequired={true}
      />
      <Select
        placeholder={t('card')}
        data={cards?.data?.map((item, _) => ({
          value: item.value,
          label: item.label
        }))}
        value={filter.card}
        onChange={value => handlePropsChange('card', value)}
        isRequired={true}
      />
      <Action
        type={'submit'}
        classes={['primary', 'lg']}
        placeholder={t('withdrawal')}
        isDisabled={level === '1' || level === '2' || isDisabled || isPending}
      />
    </form>
  )
}

export default Withdrawal
