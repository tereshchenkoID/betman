import { useState } from 'react'
import { useTranslations } from 'next-intl'

import { useValidations } from '@/hooks/useValidations'

import Action from '@/components/Action'
import Field from '@/components/Field'

import style from '../index.module.scss'

const Security = ({
  initial,
  filter,
  handlePropsChange,
  handleSubmit,
  handleReset
}) => {
  const t = useTranslations()
  const VALIDATION_RULES = useValidations()
  const [errors, setErrors] = useState({})

  const hasErrors = Object.values(errors).some(Boolean)
  const isChanged = initial && JSON.stringify(filter.security) !== JSON.stringify(initial.security)

  const isSave = !isChanged || hasErrors
  const isReset = !isChanged

  const setFieldError = (name, err) => {
    setErrors(prev => ({ ...prev, [name]: err }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={style.grid}>
        <Field
          type={'password'}
          visibility={true}
          placeholder={t('password_old')}
          data={filter?.security?.old_password}
          onChange={value => handlePropsChange('security.old_password', value)}
          rules={[
            VALIDATION_RULES.required(),
            VALIDATION_RULES.minLength(8),
          ]}
          isRequired={true}
          error={errors.old_password}
          onValidate={err => setFieldError('old_password', err)}
        />
        <Field
          type={'password'}
          visibility={true}
          placeholder={t('password_new')}
          data={filter?.security?.new_password}
          onChange={value => handlePropsChange('security.new_password', value)}
          rules={[
            VALIDATION_RULES.required(),
            VALIDATION_RULES.minLength(8),
          ]}
          isRequired={true}
          error={errors.new_password}
          onValidate={err => setFieldError('new_password', err)}
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

export default Security
