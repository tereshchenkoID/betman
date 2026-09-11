'use client'

import { useState, useTransition } from 'react'
import { useTranslations } from 'next-intl'

import { useFilterState } from '@/hooks/useFilterState'
import { useUser } from '@/hooks/useUser'
import { toast } from '@/utils/toast'

import Action from '@/components/Action'
import Field from '@/components/Field'
import Notification from '@/modules/Notification'
import Voucher from '@/modules/Voucher'

import { action } from './action'

import style from './index.module.scss'

const INITIAL_FILTER = { code: '' }

const Deposit = () => {
  const t = useTranslations()
  const { level } = useUser()
  const [ticket, setTicket] = useState(null)
  const [isPending, startTransition] = useTransition()

  const { filter, setFilter, handlePropsChange } = useFilterState(INITIAL_FILTER)

  const handleSubmit = async (e) => {
    e && e.preventDefault()

    startTransition(async () => {
      const res = await action(filter.code)

      if (res?.code === '0') {
        setTicket(res?.voucher)
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
      {
        ticket &&
        <Voucher
          data={ticket}
          isPaid={true}
        />
      }
      <Notification
        text={t('notification.enter_code')}
        type={'warning'}
      />
      <Field
        placeholder={t('code')}
        data={filter.code}
        onChange={value => handlePropsChange('code', value)}
        isRequired={true}
      />
      <Action
        type={'submit'}
        classes={['primary', 'lg']}
        placeholder={t('deposit')}
        isDisabled={level === '1' || filter?.code.length !== 12 || isPending}
      />
    </form>
  )
}

export default Deposit
