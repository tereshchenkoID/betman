'use client'

import { useState, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { useFilterState } from '@/hooks/useFilterState'
import useModal from '@/hooks/useModal'
import { useUser } from '@/hooks/useUser'
import { useValidations } from '@/hooks/useValidations'
import { toast } from '@/utils/toast'

import Action from '@/components/Action'
import Field from '@/components/Field'
import Phone from '@/components/Phone'
import Select from '@/components/Select'

import { action } from './action'

import style from './index.module.scss'

const setProfile = (data) => {
  const {
    profile: p = {},
    address: a = {}
  } = data

  return {
    amount: '',
    first_name: p.name || '',
    last_name: p.surname || '',
    cardholder: p.name && p.surname ? `${p.name} ${p.surname}` : '',
    birthday: p.birthday || '',
    email: p.email || '',
    phone: p.phone || '',
    address: a.address || '',
    city: a.city || '',
    state: a.state || '',
    country: a.country?.value
      ? { value: a.country.value, label: a.country.label }
      : null,
    zip: a.postcode || '',
  }
}

const Deposit = ({ profile, countries }) => {
  const t = useTranslations()
  const { openModal } = useModal()
  const { id, level, country, currency, language, profile: profileData } = useUser()
  const searchParams = useSearchParams()
  const bonus = searchParams.get('bonus')
  const VALIDATION_RULES = useValidations()
  const INITIAL_FILTER = {
    ...{
      user_id: id,
      currency: currency?.text,
      language: language?.text,
      customer_label: profileData?.trusted,
    },
    ...setProfile(profile)
  }

  const [isPending, startTransition] = useTransition()
  const [errors, setErrors] = useState({})

  const { filter, handlePropsChange } = useFilterState(INITIAL_FILTER)
  const hasErrors = Object.values(errors).some(Boolean)
  const isChanged = JSON.stringify(filter) !== JSON.stringify(INITIAL_FILTER)
  const isSave = !filter.amount || hasErrors

  const setFieldError = (name, err) => {
    setErrors(prev => ({ ...prev, [name]: err }))
  }

  const handleSubmit = async (e) => {
    e && e.preventDefault()

    startTransition(async () => {
      const res = await action(filter, bonus, isChanged)

      console.log(res)

      if (res?.ok) {
        openModal('deposit', { data: res.redirect_url }, { title: t('deposit'), size: 'lg' })
      }
      else {
        toast.error(res?.error || t('error'))
      }
    })
  }

  return (
    <form className={style.block} onSubmit={handleSubmit}>
      <Field
        type={'number'}
        placeholder={`${t('amount')}, ${currency?.text}`}
        data={filter.amount}
        onChange={value => handlePropsChange('amount', value)}
        isRequired={true}
      />
      <hr />
      <Field
        placeholder={t('first_name')}
        data={filter.first_name}
        onChange={value => handlePropsChange('first_name', value)}
        isRequired={true}
        rules={[
          VALIDATION_RULES.required(),
          VALIDATION_RULES.minLength(3),
          VALIDATION_RULES.letters()
        ]}
        onValidate={err => setFieldError('first_name', err)}
        error={errors.first_name}
      />
      <Field
        placeholder={t('last_name')}
        data={filter.last_name}
        onChange={value => handlePropsChange('last_name', value)}
        isRequired={true}
        rules={[
          VALIDATION_RULES.required(),
          VALIDATION_RULES.minLength(3),
          VALIDATION_RULES.letters()
        ]}
        onValidate={err => setFieldError('last_name', err)}
        error={errors.last_name}
      />
      <Field
        placeholder={t('cardholder')}
        data={filter.cardholder}
        onChange={value => handlePropsChange('cardholder', value)}
        isRequired={true}
        rules={[
          VALIDATION_RULES.required(),
          VALIDATION_RULES.minLength(3),
          VALIDATION_RULES.letters()
        ]}
        onValidate={err => setFieldError('cardholder', err)}
        error={errors.cardholder}
      />
      <Field
        type={'date'}
        placeholder={t('birthday')}
        data={filter.birthday}
        onChange={value => handlePropsChange('birthday', value)}
        isRequired={true}
        rules={[
          VALIDATION_RULES.required(),
          VALIDATION_RULES.adult(18)
        ]}
        onValidate={err => setFieldError('birthday', err)}
        error={errors.birthday}
      />
      <Phone
        data={filter.phone}
        placeholder={t('phone')}
        country={country?.value}
        onChange={value => handlePropsChange('phone', value)}
        isRequired={true}
        rules={[
          VALIDATION_RULES.required(),
          VALIDATION_RULES.phone(),
        ]}
        onValidate={err => setFieldError('phone', err)}
        error={errors.phone}
      />
      <Field
        type={'email'}
        placeholder={t('email')}
        data={filter.email}
        onChange={value => handlePropsChange('email', value)}
        isRequired={true}
        rules={[
          VALIDATION_RULES.required(),
          VALIDATION_RULES.email(),
          VALIDATION_RULES.minLength(6),
        ]}
        onValidate={err => setFieldError('email', err)}
        error={errors.email}
      />
      <Select
        placeholder={t('country')}
        data={countries?.data?.map(el => ({ value: el.alpha_2, label: el.label }))}
        value={filter.country}
        onChange={value => handlePropsChange('country', value)}
        isRequired={true}
        rules={[
          VALIDATION_RULES.required()
        ]}
        onValidate={err => setFieldError('country', err)}
      />
      <Field
        placeholder={t('state')}
        data={filter.state}
        onChange={value => handlePropsChange('state', value)}
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
        data={filter.city}
        placeholder={t('city')}
        onChange={e => handlePropsChange('city', e)}
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
        data={filter.address}
        placeholder={t('address')}
        onChange={e => handlePropsChange('address', e)}
        isRequired={true}
        rules={[
          VALIDATION_RULES.required(),
          VALIDATION_RULES.minLength(3),
        ]}
        onValidate={err => setFieldError('address', err)}
        error={errors.address}
      />
      <Field
        data={filter.zip}
        placeholder={t('postcode')}
        onChange={e => handlePropsChange('zip', e)}
        isRequired={true}
        rules={[
          VALIDATION_RULES.required(),
          VALIDATION_RULES.postcode()
        ]}
        onValidate={err => setFieldError('zip', err)}
        error={errors.zip}
      />
      <Action
        type={'submit'}
        classes={['primary', 'lg']}
        placeholder={t('deposit')}
        isDisabled={level === '1' || isSave || isPending}
      />
    </form>
  )
}

export default Deposit
