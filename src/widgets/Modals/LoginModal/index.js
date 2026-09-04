import { startTransition, useState } from 'react'
import { useTranslations } from 'next-intl'

import { NAVIGATION } from '@/constant/config'

import { loginWithCredentialsAction } from '@/app/actions/auth'

import { useRouter } from '@/i18n/navigation'
import { useModal } from '@/context/ModalContext'
import { useFilterState } from '@/hooks/useFilterState'
import { useValidations } from '@/hooks/useValidations'

import { toast } from '@/utils/toast'

import Action from '@/components/Action'
import Field from '@/components/Field'

import style from './index.module.scss'

const LoginModal = ({ isTitle = false }) => {
  const t = useTranslations()
  const VALIDATION_RULES = useValidations()

  const router = useRouter()
  const { openModal, closeModal } = useModal()
  const { filter, handlePropsChange } = useFilterState({
    username: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const isValidationErrors = Object.values(errors).some(Boolean)
  const isFormIncomplete = !filter.username || !filter.password
  const isDisabled = isValidationErrors || isFormIncomplete

  const setFieldError = (name, err) => {
    setErrors(prev => ({ ...prev, [name]: err }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    startTransition(async () => {
      const res = await loginWithCredentialsAction(filter.username, filter.password)

      if (res?.code === '0') {
        localStorage.setItem('age', '0')
        closeModal()

        startTransition(() => {
          router.refresh()
          router.push(NAVIGATION.home.url)
        })
      } else {
        toast.error(res?.error_message)
      }
    })
  }

  return (
    <form
      className={style.block}
      onSubmit={handleSubmit}
    >
      {
        isTitle &&
        <h1 className={style.title}>{t('sign_up')}</h1>
      }
      <div className={style.container}>
        <Field
          data={filter.username}
          placeholder={t('email_or_username')}
          onChange={(e) => handlePropsChange('username', e)}
          isRequired={true}
          rules={[
            VALIDATION_RULES.required(),
            VALIDATION_RULES.minLength(3),
            VALIDATION_RULES.latinAlphaNumeric()
          ]}
          onValidate={err => setFieldError('username', err)}
          error={errors.username}
        />
        <Field
          type={'password'}
          visibility={true}
          data={filter.password}
          placeholder={t('password')}
          onChange={(e) => handlePropsChange('password', e)}
          isRequired={true}
          rules={[
            VALIDATION_RULES.required(),
            VALIDATION_RULES.minLength(6),
          ]}
          onValidate={err => setFieldError('password', err)}
          error={errors.password}
        />
      </div>
      <Action
        type={'submit'}
        classes={['primary', 'lg']}
        placeholder={t('login')}
        isDisabled={isDisabled}
      />
      <Action
        classes={['md', 'outline']}
        placeholder={t('forgot_password')}
        onClick={() => {
          closeModal()
          openModal('recovery', {}, { title: t('forgot_password') })
        }}
      />
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

export default LoginModal
