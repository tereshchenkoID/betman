import { startTransition, useState } from 'react'
import { useTranslations } from 'next-intl'
import clsx from 'clsx'

import { useRouter } from '@/i18n/navigation'

import { getCachedUser } from '@/app/actions/static'

import { toast } from '@/utils/toast'

import Action from '@/components/Action'
import Field from '@/components/Field'
import Icon from '@/components/Icon'
import { action } from '../action.js'

import style from '../../index.module.scss'

const EmailVerification = ({
  filter,
  handlePropsChange,
  error,
  setFieldError,
  rules
}) => {
  const t = useTranslations()
  const router = useRouter()
  const [code, setCode] = useState('')

  const type = filter.profile.isVerifyEmail === '0' ? 'getCode' : 'verify'

  const handleSubmit = async (repeat) => {
    const params = {
      action: repeat ? 'getCode' : type,
      value: 'email',
    }

    if (filter.profile.isVerifyEmail !== '0' && !repeat) {
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
        handlePropsChange('profile.isVerifyEmail', res.isVerifyEmail)
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
          style[`count-${filter.profile.isVerifyEmail}`]
        )
      }
    >
      <Field
        type={'email'}
        placeholder={t('email')}
        data={filter.profile.email}
        onChange={value => handlePropsChange('profile.email', value)}
        isRequired={true}
        isDisabled={filter.profile.isVerifyEmail === '1'}
        rules={rules}
        onValidate={err => setFieldError('email', err)}
        error={error}
      />
      <div className={style.wrapper}>
        {
          filter.profile.isVerifyEmail === '1' &&
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
          filter.profile.isVerifyEmail === '2' &&
          <div className={style.verify}>
            <Icon name="status-checkmark" />
            {t('verify_status.verified')}
          </div>
        }
        {
          filter.profile.isVerifyEmail === '0' &&
          <Action
            classes={['primary', 'lg',  style.action]}
            placeholder={t('verify')}
            onChange={() => handleSubmit(false)}
            isDisabled={error || !filter.profile.email}
          />
        }
        {
          filter.profile.isVerifyEmail === '1' &&
          <Action
            classes={['primary', 'lg', style.action]}
            placeholder={t('send')}
            onChange={() => handleSubmit(false)}
            isDisabled={code?.length !== 6}
          />
        }
        {
          filter.profile.isVerifyEmail === '1' &&
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

export default EmailVerification
