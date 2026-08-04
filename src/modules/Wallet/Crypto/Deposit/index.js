'use client'

import { useTransition } from 'react'
import { useTranslations } from 'next-intl'

import { useModal } from '@/context/ModalContext'
import { useFilterState } from '@/hooks/useFilterState'
import { toast } from '@/utils/toast'

import { action } from './action'

import Action from '@/components/Action'
import Field from '@/components/Field'

import style from './index.module.scss'

const INITIAL_FILTER = { amount: '' }

const Deposit = ({ user }) => {
  const t = useTranslations()
  const { openModal } = useModal()
  const [isPending, startTransition] = useTransition()

  const { filter, setFilter, handlePropsChange } = useFilterState(INITIAL_FILTER)

  const handleSubmit = async (e) => {
    e && e.preventDefault()

    startTransition(async () => {
      const res = await action(filter.amount, user.currency)

      if (res?.code === '0') {
        openModal('cryptoDeposit', { data: res.link }, { title: t('deposit'), size: 'lg'})
        setFilter(INITIAL_FILTER)
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
        placeholder={t('amount')}
        data={filter.amount}
        onChange={value => handlePropsChange('amount', value)}
        isRequired={true}
      />
      <Action
        type={'submit'}
        classes={['primary', 'lg']}
        placeholder={t('deposit')}
        isDisabled={filter?.amount === '' || isPending}
      />
    </form>
  )
}

export default Deposit
