'use client'

import { useTranslations } from 'next-intl'
import { useTransition } from 'react'

import { useFilterState } from '@/hooks/useFilterState'
import { toast } from '@/utils/toast'

import { action } from './action'

import Action from '@/components/Action'
import Field from '@/components/Field'
import Select from '@/components/Select'
import Notification from '@/modules/Notification'

import style from './index.module.scss'

const INITIAL_FILTER = {
  amount: '',
  address: '',
  payment_type: null
}

const Withdrawal = ({ data, user }) => {
  const t = useTranslations()
  const [isPending, startTransition] = useTransition()

  const { filter, setFilter, handlePropsChange } = useFilterState(INITIAL_FILTER)

  const handleSubmit = async (e) => {
    e && e.preventDefault()

    startTransition(async () => {
      const res = await action(filter)

      if (res?.code === '0') {
        setFilter(INITIAL_FILTER)
      }
      else {
        toast.error(res?.error_message || t('error'))
      }
    })
  }

  const commission = (filter?.payment_type?.commission * filter?.payment_type?.rate) || 0
  const totalAmount = Number(filter.amount) + commission

  const isValid =
    filter.payment_type &&
    filter.amount &&
    filter.address &&
    totalAmount >= (filter?.payment_type?.min || 0) &&
    totalAmount <= (filter?.payment_type?.max || 0)

  return (
    <form className={style.block} onSubmit={handleSubmit}>
      <Select
        placeholder={t('payment_type')}
        data={data?.withdraw?.wallets?.map((item, idx) => ({
          value: idx,
          label: item.name
        }))}
        value={filter.payment_type}
        isRequired={true}
        onChange={value =>
          handlePropsChange('payment_type', {
            ...data?.withdraw?.wallets[value?.value],
            ...value
          })
        }
      />

      {
        filter.payment_type &&
        <>
          <div className={style.row}>
            <p className={style.cell}>{t('commission')}:</p>
            <strong>
              {commission} {user?.currency?.text}
            </strong>
          </div>

          <Notification
            text={`${t('min')}: ${filter?.payment_type?.min}, ${t('max')}: ${filter?.payment_type?.max}`}
            type={'warning'}
          />

          <Field
            type={'number'}
            placeholder={t('amount')}
            data={filter.amount}
            onChange={value => handlePropsChange('amount', value)}
            isRequired={true}
          />

          <Field
            placeholder={`${filter.payment_type.name} ${t('address')}`}
            data={filter.address}
            onChange={value => handlePropsChange('address', value)}
            isRequired={true}
          />

          <div className={style.actions}>
            {
              data.withdraw?.quickAmount.map((el, idx) =>
                <Action
                  key={idx}
                  placeholder={`${el} ${user.currency.code}`}
                  classes={['primary', 'md']}
                  onChange={() => handlePropsChange('amount', el)}
                />
              )
            }
          </div>

          <Action
            type={'submit'}
            classes={['primary', 'lg', 'wide']}
            placeholder={t('withdrawal')}
            isDisabled={user?.level === '1' || user?.level === '2' || !isValid || isPending}
          />
        </>
      }
    </form>
  )
}

export default Withdrawal
