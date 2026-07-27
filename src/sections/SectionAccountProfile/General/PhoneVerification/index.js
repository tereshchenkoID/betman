import { startTransition, useState } from 'react'
import { useTranslations } from 'next-intl'
import classNames from 'classnames'

import { toast } from '@/utils/toast'
import { verificationAction } from '@/app/actions/verification.js'

import Field from '@/components/Field'
import Action from '@/components/Action'
import Icon from '@/components/Icon'
import Phone from '@/components/Phone'

import style from '../../index.module.scss'

const PhoneVerification = ({
  user,
  filter,
  handlePropsChange,
  error,
  setFieldError,
  rules
}) => {
  const t = useTranslations()
  const [code, setCode] = useState('')
  const type = filter.profile.isVerifyPhone === "0" ? 'getCode' : 'verify'

  const handleSubmit = async (repeat) => {
    const params = {
      action: repeat ? 'getCode' : type,
      value: 'phone',
    }

    if (filter.profile.isVerifyPhone !== "0" && !repeat) (
      params.code = code
    )

    startTransition(async () => {
      const res = await verificationAction(params)

      if (res?.code === '0') {
        setCode('')
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
          style[`count-${filter.profile.isVerifyPhone}`]
        )
      }
    >
      <Phone
        data={filter.profile.phone}
        placeholder={t('phone')}
        country={user?.country?.value?.toLowerCase()}
        onChange={value => handlePropsChange('profile.phone', value)}
        isRequired={true}
        isDisabled={filter.profile.isVerifyPhone === "1"}
        rules={rules}
        onValidate={err => setFieldError('phone', err)}
        error={error}
      />
      <div className={style.wrapper}>
        {
          filter.profile.isVerifyPhone === "1" &&
          <Field
            placeholder={t('code')}
            data={code}
            onChange={value => setCode(value)}
            isRequired={true}
          />
        }
        {
          filter.profile.isVerifyPhone === "2" &&
          <div className={style.verify}>
            <Icon name={'icon-status-checkmark'}/>
            {t('verify_status.verified')}
          </div>
        }
        {
          filter.profile.isVerifyPhone !== "2" &&
          <Action
            placeholder={filter.profile.isVerifyPhone === "0" ? t('verify_status.verify') : t('send')}
            onChange={() => handleSubmit(false)}
          />
        }
        {
          filter.profile.isVerifyPhone === "1" &&
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

export default PhoneVerification
