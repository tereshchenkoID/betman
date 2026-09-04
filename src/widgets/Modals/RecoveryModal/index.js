import { useState } from 'react'
import { useTranslations } from 'next-intl'

import { NAVIGATION } from '@/constant/config'

import { apiRequest } from '@/app/actions/api'

import { useModal } from '@/context/ModalContext'
import { useFilterState } from '@/hooks/useFilterState'
import { useValidations } from '@/hooks/useValidations'

import { toast } from '@/utils/toast'

import Action from '@/components/Action'
import Field from '@/components/Field'
import Notification from '@/modules/Notification'

import style from './index.module.scss'

const RecoveryModal = () => {
  const t = useTranslations()
  const { closeModal } = useModal()

  const VALIDATION_RULES = useValidations()
  const [errors, setErrors] = useState({})
  const [code, setCode] = useState(-1)
  const [message, setMessage] = useState('')

  const setFieldError = (name, err) => {
    setErrors(prev => ({ ...prev, [name]: err }))
  }

  const { filter, handlePropsChange } = useFilterState({
    email: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!filter.email || errors.email) return

    try {
      const res = await apiRequest('password/', {
        method: 'POST',
        params: {
          filter: filter.email
        }
      })

      if (res.code === '0') {
        setCode(0)
        setMessage(res?.message)
        setErrors({})
        handlePropsChange('email', '')
      }
      else {
        setCode(1)
      }
    } catch (e) {
      toast.error(t('errors.fetch'))
    }
  }

  const hasErrors = Boolean(errors.email)

  return (
    <form
      className={style.block}
      onSubmit={handleSubmit}
    >
      {
        code === 0 &&
        <Notification
          text={message}
          type={'success'}
        />
      }
      {
        code === 1 &&
        <Notification
          text={t('notification.recovery_text')}
          type={'warning'}
        />
      }
      <p>{t('notification.recovery_password')}</p>
      <Field
        data={filter.email}
        placeholder={t('email')}
        onChange={e => handlePropsChange('email', e)}
        rules={[
          VALIDATION_RULES.required(),
          VALIDATION_RULES.email(),
          VALIDATION_RULES.minLength(6),
        ]}
        isRequired={true}
        onValidate={err => setFieldError('email', err)}
        error={filter.email ? errors.email : null}
      />

      <Action
        type={'submit'}
        classes={['primary', 'lg']}
        placeholder={t('send_link')}
        isDisabled={hasErrors}
      />
      <hr />
      <p className={style.link}>
        {t('dont_have_account')}
        <Action
          to={NAVIGATION.registration.url}
          classes={['md', 'outline']}
          placeholder={t('create_account')}
          onChange={closeModal}
        />
      </p>
    </form>
  )
}

export default RecoveryModal
