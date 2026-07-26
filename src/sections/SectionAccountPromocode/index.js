'use client'

import { useTranslations } from 'next-intl'
import { startTransition } from 'react'

import { toast } from '@/utils/toast'

import { useFilterState } from '@/hooks/useFilterState'
import { action } from './action'

import Notification from '@/modules/Notification'
import Field from '@/components/Field'
import Action from '@/components/Action'

import style from './index.module.scss'

const INITIAL_FILTER = { code: '' }

const SectionAccountPromocode = ({ children }) => {
  const t = useTranslations()
  const { filter, setFilter, handlePropsChange } = useFilterState(INITIAL_FILTER)

  const handleSubmit = (e) => {
    e && e.preventDefault()

    startTransition(async () => {
      const res = await action(filter.code)

      if (res.code === '0') {
        toast.success(res.message)
        setFilter(INITIAL_FILTER)
      }
      else {
        toast.error(res.error_message)
      }
    })
  }

  return (
    <section>
      <form
        className={style.block}
        onSubmit={handleSubmit}
      >
        <div className={style.column}>
          <Notification
            text={t('notification.enter_promocode')}
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
            placeholder={t('activate')}
            isDisabled={filter?.code.length < 6}
          />
        </div>
        <div>
          {children}
        </div>
      </form>
    </section>
  )
}

export default SectionAccountPromocode
