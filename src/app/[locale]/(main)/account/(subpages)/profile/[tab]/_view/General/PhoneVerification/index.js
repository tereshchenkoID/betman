import { startTransition, useState } from 'react'
import { useTranslations } from 'next-intl'
import clsx from 'clsx'

import { useRouter } from '@/i18n/navigation'

import { getCachedUser } from '@/app/actions/static'

import { useUser } from '@/hooks/useUser'
import { toast } from '@/utils/toast'

import Action from '@/components/Action'
import Field from '@/components/Field'
import Icon from '@/components/Icon'
import Phone from '@/components/Phone'
import { action } from '../action.js'

import style from '../../index.module.scss'

const PhoneVerification = ({
  filter,
  handlePropsChange,
  error,
  setFieldError,
  rules
}) => {
  const t = useTranslations()
  const { country } = useUser()
  const router = useRouter()
  const [code, setCode] = useState('')
  const type = filter.profile.isVerifyPhone === '0' ? 'getCode' : 'verify'

  const handleSubmit = async (repeat) => {
    const params = {
      action: repeat ? 'getCode' : type,
      value: 'phone',
    }

    if (filter.profile.isVerifyPhone !== '0' && !repeat) {
      params.code = code
    }

    startTransition(async () => {
      const res = await action(params)

      if (res?.code === '0') {
        if (!repeat) {
          setCode('')
          await getCachedUser()
          router.refresh()
        }
        handlePropsChange('profile.isVerifyPhone', res.isVerifyPhone)
        toast.success(res?.message)
      }
      else {
        toast.error(res?.error_message)
      }
    })
  }

  return (
    <div
      className={
        clsx(
          style.row,
          style[`count-${filter.profile.isVerifyPhone}`]
        )
      }
    >
      <Phone
        data={filter.profile.phone}
        placeholder={t('phone')}
        country={country?.value}
        onChange={value => handlePropsChange('profile.phone', value)}
        isRequired={true}
        isDisabled={filter.profile.isVerifyPhone === '1'}
        rules={rules}
        onValidate={err => setFieldError('phone', err)}
        error={error}
      />
      <div className={style.wrapper}>
        {
          filter.profile.isVerifyPhone === '1' &&
          <div className={style.field}>
            <Field
              placeholder={t('code')}
              data={code}
              onChange={value => setCode(value)}
              isRequired={true}
            />
          </div>
        }
        {
          filter.profile.isVerifyPhone === '2' &&
          <div className={style.verify}>
            <Icon name="status-checkmark" />
            {t('verify_status.verified')}
          </div>
        }
        {
          filter.profile.isVerifyPhone === '0' &&
          <Action
            classes={['primary', 'lg',  style.action]}
            placeholder={t('verify')}
            onChange={() => handleSubmit(false)}
            isDisabled={error}
          />
        }
        {
          filter.profile.isVerifyPhone === '1' &&
          <Action
            classes={['primary', 'lg', style.action]}
            placeholder={t('send')}
            onChange={() => handleSubmit(false)}
            isDisabled={code?.length !== 6}
          />
        }
        {
          filter.profile.isVerifyPhone === '1' &&
          <Action
            classes={['primary', 'lg',  style.action]}
            onChange={() => handleSubmit(true)}
          >
            <Icon name="time-arrow-clockwise" />
          </Action>
        }
      </div>
    </div>
  )
}

export default PhoneVerification
