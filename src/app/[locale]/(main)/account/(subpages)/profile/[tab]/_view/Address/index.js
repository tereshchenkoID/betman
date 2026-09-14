import { useState } from 'react'
import { useTranslations } from 'next-intl'

import { useValidations } from '@/hooks/useValidations'

import Action from '@/components/Action'
import Field from '@/components/Field'
import Select from '@/components/Select'

import style from '../index.module.scss'

const Address = ({
  initial,
  filter,
  countries,
  handlePropsChange,
  handleSubmit,
  handleReset,
}) => {
  const t = useTranslations()

  const VALIDATION_RULES = useValidations()
  const [errors, setErrors] = useState({})

  const hasErrors = Object.values(errors).some(Boolean)
  const isChanged = JSON.stringify(filter.address) !== JSON.stringify(initial.address)
  const isSave = !isChanged || hasErrors
  const isReset = !isChanged

  const setFieldError = (name, err) => {
    setErrors(prev => ({ ...prev, [name]: err }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={style.grid}>
        <Select
          placeholder={t('country')}
          data={countries?.map(el => ({ value: el.alpha_2, label: el.label }))}
          value={filter.address.country}
          onChange={value => handlePropsChange('address.country', value)}
          isRequired={true}
          rules={[
            VALIDATION_RULES.required()
          ]}
          onValidate={err => setFieldError('country', err)}
        />
        <Field
          placeholder={t('state')}
          data={filter.address.state}
          onChange={value => handlePropsChange('address.state', value)}
          isRequired={true}
          rules={[
            VALIDATION_RULES.required(),
            VALIDATION_RULES.minLength(3),
            VALIDATION_RULES.letters()
          ]}
          onValidate={err => setFieldError('state', err)}
          error={errors.state}
        />
        <Field
          data={filter.address.city}
          placeholder={t('city')}
          onChange={e => handlePropsChange('address.city', e)}
          isRequired={true}
          rules={[
            VALIDATION_RULES.required(),
            VALIDATION_RULES.minLength(3),
            VALIDATION_RULES.letters()
          ]}
          onValidate={err => setFieldError('city', err)}
          error={errors.city}
        />
        <Field
          data={filter.address.address}
          placeholder={t('address')}
          onChange={e => handlePropsChange('address.address', e)}
          isRequired={true}
          rules={[
            VALIDATION_RULES.required(),
            VALIDATION_RULES.minLength(3),
          ]}
          onValidate={err => setFieldError('address', err)}
          error={errors.address}
        />
        <Field
          data={filter.address.postcode}
          placeholder={t('postcode')}
          onChange={e => handlePropsChange('address.postcode', e)}
          isRequired={true}
          rules={[
            VALIDATION_RULES.required(),
            VALIDATION_RULES.postcode()
          ]}
          onValidate={err => setFieldError('postcode', err)}
          error={errors.postcode}
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

export default Address
