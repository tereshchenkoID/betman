import { startTransition, useState } from 'react'
import { useTranslations } from 'next-intl'
import classNames from 'classnames'

import { toast } from '@/utils/toast'
import { action } from '../action.js'

import Field from '@/components/Field'
import Action from '@/components/Action'
import Icon from '@/components/Icon'

import style from '../../index.module.scss'

const EmailVerification = ({
  filter,
  handlePropsChange,
  error,
  setFieldError,
  rules
}) => {
  const t = useTranslations()
  const [code, setCode] = useState('')
  const type = filter.profile.isVerifyEmail === "0" ? 'getCode' : 'verify'

  const handleSubmit = async (repeat) => {
    const params = {
      action: repeat ? 'getCode' : type,
      value: 'email',
    }

    if (filter.profile.isVerifyEmail !== "0" && !repeat) {
      params.code = code
    }

    startTransition(async () => {
      const res = await action(params)

      if (res?.code === '0') {
        setCode('')
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
        classNames(
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
        isDisabled={filter.profile.isVerifyEmail === "1"}
        rules={rules}
        onValidate={err => setFieldError('email', err)}
        error={error}
      />
      <div className={style.wrapper}>
        {
          filter.profile.isVerifyEmail === "1" &&
          <Field
            placeholder={t('code')}
            data={code}
            onChange={value => setCode(value)}
            isRequired={true}
          />
        }
        {
          filter.profile.isVerifyEmail === "2" &&
          <div className={style.verify}>
            <Icon name={'icon-status-checkmark'}/>
            {t('verify_status.verified')}
          </div>
        }
        {
          filter.profile.isVerifyEmail !== "2" &&
          <Action
            placeholder={filter.profile.isVerifyEmail === "0" ? t('verify_status.verify') : t('send')}
            onChange={() => handleSubmit(false)}
          />
        }
        {
          filter.profile.isVerifyEmail === "1" &&
          <Action
            classes={['primary', 'lg',  style.action]}
            onChange={() => handleSubmit(true)}
          >
            <Icon name={'icon-time-arrow-clockwise'}/>
          </Action>
        }
      </div>
    </div>
  )
}

export default EmailVerification
