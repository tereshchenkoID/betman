import { startTransition, useState } from 'react'
import { useTranslations } from 'next-intl'
import { toast } from 'react-toastify'

import { NAVIGATION } from '@/constant/config'

import { useRouter } from '@/i18n/routing'
import { useModal } from '@/context/ModalContext'
import { useFilterState } from '@/hooks/useFilterState'
import { useValidations } from '@/hooks/useValidations'
import { loginWithCredentialsAction } from '@/app/actions/auth'

import Field from '@/components/Field'
import Action from '@/components/Action'
import Providers from '@/modules/Providers'
// import Recovery from 'modules/Modals/Recovery'

import style from './index.module.scss'

const Login = ({ isRedirect = true }) => {
  const t = useTranslations()
  const VALIDATION_RULES = useValidations()
  const router = useRouter()
  const { closeModal } = useModal()
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
      const result = await loginWithCredentialsAction(filter.username, filter.password);

      if (result.success) {
        sessionStorage.setItem('age', '0')
        closeModal()
        router.refresh()

        if (isRedirect) {
          router.push(NAVIGATION.home.url);
        }
      }
      else {
        toast.error(t('notification.wrong_auth'));
      }
    });
  }

  return (
    <form
      className={style.block}
      onSubmit={handleSubmit}
    >
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
      {/*<Action*/}
      {/*  classes={['md', 'outline']}*/}
      {/*  placeholder={t('forgot_password')}*/}
      {/*  onChange={() =>*/}
      {/*    openModal({*/}
      {/*      title: t('forgot_password'),*/}
      {/*      body: <Recovery />*/}
      {/*    })*/}
      {/*  }*/}
      {/*/>*/}
      <p className={style.link}>
        {t('dont_have_account')}
        <Action
          to={NAVIGATION.registration.url}
          classes={['md', 'outline']}
          placeholder={t('create_account')}
          onChange={closeModal}
        />
      </p>
      <hr />
      <Providers />
    </form>
  )
}

export default Login
