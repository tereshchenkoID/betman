'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

import { NAVIGATION } from '@/constant/config'

import { useModal } from '@/context/ModalContext'
import { useFilterState } from '@/hooks/useFilterState'
import { useValidations } from '@/hooks/useValidations'
import { apiRequest } from '@/app/actions/api'

import Action from '@/components/Action'
import Field from '@/components/Field'
import Notification from '@/modules/Notification'

import style from './index.module.scss'

const SectionRecovery = ({ data, hash }) => {
  const t = useTranslations()
  const router = useRouter()
  const { openModal } = useModal()

  const VALIDATION_RULES = useValidations()

  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState(data?.error_message || null)
  const hasErrors = Object.values(errors).some(Boolean)

  const { filter, handlePropsChange } = useFilterState({
    new_password: '',
    repeat_password: '',
    hash: hash || null,
  })

  const setFieldError = (name, err) => {
    setErrors(prev => ({ ...prev, [name]: err }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await apiRequest('password/', {
        method: 'POST',
        params: {
          hash: filter.hash,
          password: filter.new_password,
        },
      })

      if (res?.code === '0') {
        setMessage(res?.message || t('notification.password_changed_success'))

        setTimeout(() => {
          router.push(NAVIGATION.login.url)
        }, 1500)
      } else {
        setMessage(res?.message || t('notification.recovery_error'))
      }
    } catch {
      setMessage(t('notification.recovery_error'))
    }
  }

  return (
    <section>
      <form className={style.form} onSubmit={handleSubmit}>
        <h1>{t(NAVIGATION.password_recovery.text)}</h1>
        {
          message &&
          <Notification
            text={message}
            type={'error'}
          />
        }
        {
          data?.code === '0' &&
          <div className={style.container}>
            <Field
              type={'password'}
              visibility={true}
              placeholder={t('password_new')}
              data={filter.new_password}
              onChange={value => handlePropsChange('new_password', value)}
              rules={[
                VALIDATION_RULES.required(),
                VALIDATION_RULES.minLength(6),
              ]}
              isRequired={true}
              error={errors.new_password}
              onValidate={err => setFieldError('new_password', err)}
            />
            <Field
              type={'password'}
              visibility={true}
              placeholder={t('password_repeat')}
              data={filter.repeat_password}
              onChange={value => handlePropsChange('repeat_password', value)}
              rules={[
                VALIDATION_RULES.required(),
                VALIDATION_RULES.minLength(6),
                VALIDATION_RULES.match(filter.new_password),
              ]}
              isRequired={true}
              error={errors.repeat_password}
              onValidate={err => setFieldError('repeat_password', err)}
            />
            <Action
              type={'submit'}
              classes={['primary', 'lg']}
              placeholder={t('send')}
              onChange={() => {}}
              isDisabled={hasErrors}
            />
          </div>
        }
        <p className={style.link}>
          {t('notification.already_registered')}
          <Action
            classes={['md', 'outline']}
            placeholder={t('login')}
            onChange={() => openModal('login', {}, { title: t('sign_up') })}
          />
        </p>
      </form>
    </section>
  )
}

export default SectionRecovery
