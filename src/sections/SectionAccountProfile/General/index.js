import { useState } from 'react'
import { useTranslations } from 'next-intl'

import { useValidations } from '@/hooks/useValidations'

import Action from '@/components/Action'
import Field from '@/components/Field'
import Phone from '@/components/Phone'
import EmailVerification from './EmailVerification'
import PhoneVerification from './PhoneVerification'

import style from '../index.module.scss'

const getCleanProfile = (profileObj) => {
  if (!profileObj) return null

  const copy = { ...profileObj }

  delete copy.isVerify
  delete copy.isVerifyEmail
  delete copy.isVerifyPhone

  return copy
}

const General = ({
  user,
  initial,
  filter,
  handlePropsChange,
  handleSubmit,
  handleReset,
}) => {
  const t = useTranslations()

  const VALIDATION_RULES = useValidations()
  const [errors, setErrors] = useState({})

  const hasErrors = Object.values(errors).some(Boolean)
  const isChanged = initial && JSON.stringify(getCleanProfile(filter.profile)) !== JSON.stringify(getCleanProfile(initial.profile))
  const isTelegram = initial.profile.birthday

  const isSave = !isChanged || hasErrors
  const isReset = !isChanged

  const setFieldError = (name, err) => {
    setErrors(prev => ({ ...prev, [name]: err }))
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={style.form}
    >
      <div className={style.grid}>
        <Field
          placeholder={t('username')}
          data={filter.profile.username}
          onChange={value => handlePropsChange('profile.username', value)}
          isRequired={true}
          isDisabled={true}
        />
        <Field
          placeholder={t('first_name')}
          data={filter.profile.name}
          onChange={value => handlePropsChange('profile.name', value)}
          isRequired={true}
          rules={[
            VALIDATION_RULES.required(),
            VALIDATION_RULES.minLength(3),
            VALIDATION_RULES.letters()
          ]}
          onValidate={err => setFieldError('name', err)}
          error={errors.name}
          isDisabled={isTelegram}
        />
        <Field
          placeholder={t('last_name')}
          data={filter.profile.surname}
          onChange={value => handlePropsChange('profile.surname', value)}
          isRequired={true}
          rules={[
            VALIDATION_RULES.required(),
            VALIDATION_RULES.minLength(3),
            VALIDATION_RULES.letters()
          ]}
          onValidate={err => setFieldError('surname', err)}
          error={errors.surname}
          isDisabled={isTelegram}
        />
        <Field
          type={'date'}
          placeholder={t('birthday')}
          data={filter.profile.birthday}
          onChange={value => handlePropsChange('profile.birthday', value)}
          isRequired={true}
          rules={[
            VALIDATION_RULES.required(),
            VALIDATION_RULES.adult(18)
          ]}
          onValidate={err => setFieldError('birthday', err)}
          error={errors.birthday}
          isDisabled={isTelegram}
        />
        <Phone
          data={filter.profile.phone}
          placeholder={t('phone')}
          country={user?.country?.value?.toLowerCase()}
          onChange={value => handlePropsChange('profile.phone', value)}
          isRequired={true}
          rules={[
            VALIDATION_RULES.required(),
            VALIDATION_RULES.phone(),
          ]}
          onValidate={err => setFieldError('phone', err)}
          error={errors.phone}
        />
        <PhoneVerification
          user={user}
          filter={filter}
          handlePropsChange={handlePropsChange}
          error={errors.phone}
          setFieldError={setFieldError}
          rules={[
            VALIDATION_RULES.required(),
            VALIDATION_RULES.phone(),
          ]}
        />
        <EmailVerification
          filter={filter}
          handlePropsChange={handlePropsChange}
          error={errors.email}
          setFieldError={setFieldError}
          rules={[
            VALIDATION_RULES.required(),
            VALIDATION_RULES.email(),
            VALIDATION_RULES.minLength(6),
          ]}
        />
        <div className={style.actions}>
          <Action
            classes={['secondary', 'lg']}
            placeholder={t('reset')}
            onChange={handleReset}
            isDisabled={isReset}
          />
          <Action
            type={'submit'}
            placeholder={t('save')}
            isDisabled={isSave}
          />
        </div>
      </div>
    </form>
  )
}

export default General
