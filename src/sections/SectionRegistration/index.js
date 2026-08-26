'use client'

import Image from 'next/image'
import { useRouter } from '@/i18n/routing'
import { useSearchParams } from 'next/navigation'
import { startTransition, useCallback, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import clsx from 'clsx'

import { NAVIGATION } from '@/constant/config'

import { apiRequest } from '@/app/actions/api'
import { registerWithCredentialsAction } from '@/app/actions/auth'
import { toast } from '@/utils/toast'

import { useModal } from '@/context/ModalContext'
import { useFilterState } from '@/hooks/useFilterState'
import { useValidations } from '@/hooks/useValidations'

import Action from '@/components/Action'
import Field from '@/components/Field'
import Icon from '@/components/Icon'
import Checkbox from '@/components/Checkbox'
import Select from '@/components/Select'
import Phone from '@/components/Phone'

import style from './index.module.scss'

const STEP_FIELDS = {
  0: ['username', 'email', 'password', 'promocode'],
  1: ['name', 'surname', 'birthday', 'phone', 'terms'],
}

const SectionRegistration = ({
  user,
  countries
}) => {
  const t = useTranslations()

  const VALIDATION_RULES = useValidations()

  const { openModal } = useModal()
  const router = useRouter()
  const searchParams = useSearchParams()
  const invite = searchParams.get('invite')
  const promocode = searchParams.get('promocode')

  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState({})
  const [successes, setSuccesses] = useState({})

  const { filter, handlePropsChange } = useFilterState({
    name: '',
    surname: '',
    promocode: promocode || '',
    birthday: '',
    email: '',
    username: '',
    password: '',
    phone: '',
    country: {
      value: user?.country?.code,
      label: user?.country?.text
    },
    city: '',
    address: '',
    terms: '0',
    bonus: '1',
    invite: invite || null,
  })

  const currentStep = STEP_FIELDS[step] || []
  const isValidationErrors = currentStep.some(field => Boolean(errors[field]))
  const isFormIncomplete = currentStep.some(field => {
    if (field === 'promocode') return false
    return !filter[field]
  })
  const isDisabled = isValidationErrors || isFormIncomplete

  const setFieldError = useCallback((name, err) => {
    setErrors(prev => (prev[name] === err ? prev : { ...prev, [name]: err }))
  }, [])

  const setFieldSuccess = useCallback((name, msg) => {
    setSuccesses(prev => (prev[name] === msg ? prev : { ...prev, [name]: msg }))
  }, [])

  const nextStep = useCallback(() => setStep(prev => prev + 1), [])

  const prevStep = useCallback(() => setStep(prev => prev - 1), [])

  const handleSubmit = async (e) => {
    e && e.preventDefault()

    if (isDisabled) return null

    const res = await registerWithCredentialsAction(filter)

    if (res?.code === '0') {
      toast.success(res.message)

      setTimeout(() => {
        startTransition(() => {
          router.refresh()
          router.push(NAVIGATION.home.url)
        })
      }, 1000)
    }
    else {
      toast.error(res.error_message)
    }
  }

  const checkFieldOnBlur = useCallback(async (key, overrideValue) => {
    const value = overrideValue !== undefined ? overrideValue : filter[key]
    if (!value) return

    try {
      const res = await apiRequest('registration/check/', {
        method: 'POST',
        params: { key, value }
      })

      if (res?.code === '0') {
        setFieldError(key, null)
        setFieldSuccess(key, res?.message)
      } else {
        setFieldError(key, res?.error_message)
        setFieldSuccess(key, null)
      }
    } catch (e) {
      toast.error(`Check field: ${key}:`)
    }
  }, [filter, setFieldError, setFieldSuccess])

  const handleCheck = async (e) => {
    e && e.preventDefault()
    if (isDisabled) return

    if (step === 0) {
      nextStep()
      return
    }

    handleSubmit().catch(console.error)
  }

  useEffect(() => {
    if (promocode) {
      startTransition(() => {
        checkFieldOnBlur('promocode').catch(console.error)
      })
    }
  }, [checkFieldOnBlur, promocode])

  return (
    <section>
      <form className={style.form}>
        <h1 className={style.title}>{t('create_account')}</h1>
        <div className={style.steps}>
          {
            Array.from({ length: 2 }).map((_, idx) =>
              <div
                key={idx}
                className={
                  clsx(
                    style.step,
                    step === idx && style.active,
                    step > idx && style.completed
                  )
                }
              >
                {
                  step > idx
                  ?
                    <Icon name="status-checkmark" size="lg" />
                  :
                    idx + 1
                }
              </div>
            )
          }
        </div>
        {
          step === 0 &&
          <>
            <div className={style.container}>
              <Field
                data={filter.username}
                placeholder={t('username')}
                onChange={e => handlePropsChange('username', e)}
                rules={[
                  VALIDATION_RULES.required(),
                  VALIDATION_RULES.minLength(3),
                  VALIDATION_RULES.latinAlphaNumeric()
                ]}
                isRequired={true}
                onValidate={err => setFieldError('username', err)}
                error={errors.username}
                onBlur={() => checkFieldOnBlur('username')}
              />
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
                error={errors.email}
                onBlur={() => checkFieldOnBlur('email')}
              />
              <Field
                type={'password'}
                visibility={true}
                data={filter.password}
                placeholder={t('password')}
                onChange={e => handlePropsChange('password', e)}
                rules={[
                  VALIDATION_RULES.required(),
                  VALIDATION_RULES.minLength(6),
                ]}
                isRequired={true}
                onValidate={err => setFieldError('password', err)}
                error={errors.password}
              />
              <Field
                data={filter.promocode}
                placeholder={t('promocode')}
                onChange={e => {
                  handlePropsChange('promocode', e)
                  setFieldSuccess('promocode', null)
                }}
                rules={[]}
                onValidate={err => setFieldError('promocode', err)}
                error={errors.promocode}
                success={successes.promocode}
                onBlur={() => checkFieldOnBlur('promocode')}
              />
            </div>
            <div className={style.actions}>
              <Action
                classes={['primary', 'lg']}
                placeholder={t('next')}
                onChange={handleCheck}
                isDisabled={isDisabled}
                style={{ gridColumn: '1 / -1' }}
              />
            </div>
          </>
        }
        {
          step === 1 &&
          <>
            <div className={style.container}>
              <Field
                data={filter.name}
                placeholder={t('first_name')}
                onChange={e => handlePropsChange('name', e)}
                rules={[
                  VALIDATION_RULES.required(),
                  VALIDATION_RULES.minLength(3),
                  VALIDATION_RULES.letters()
                ]}
                isRequired={true}
                onValidate={err => setFieldError('name', err)}
                error={errors.name}
              />
              <Field
                data={filter.surname}
                placeholder={t('last_name')}
                onChange={e => handlePropsChange('surname', e)}
                rules={[
                  VALIDATION_RULES.required(),
                  VALIDATION_RULES.minLength(3),
                  VALIDATION_RULES.letters()
                ]}
                isRequired={true}
                onValidate={err => setFieldError('surname', err)}
                error={errors.surname}
              />
              <Field
                type={'date'}
                placeholder={t('birthday')}
                data={filter.birthday}
                onChange={value => handlePropsChange('birthday', value)}
                rules={[
                  VALIDATION_RULES.required(),
                  VALIDATION_RULES.adult(18)
                ]}
                isRequired={true}
                onValidate={err => setFieldError('birthday', err)}
                error={errors.birthday}
              />
              <Phone
                data={filter.phone}
                placeholder={t('phone')}
                country={user?.country?.value?.toLowerCase()}
                onChange={value => handlePropsChange('phone', value)}
                isRequired={true}
                rules={[
                  VALIDATION_RULES.required(),
                  VALIDATION_RULES.phone(),
                ]}
                onValidate={err => setFieldError('phone', err)}
                error={errors.phone}
                onBlur={() => checkFieldOnBlur('phone')}
              />
              <Select
                placeholder={t('country')}
                data={countries?.map(el => ({ value: el.alpha_2, label: el.label }))}
                value={filter.country}
                onChange={v => handlePropsChange('country', v)}
              />
              <Field
                placeholder={t('state')}
                data={filter.state}
                onChange={value => handlePropsChange('state', value)}
              />
              <Field
                data={filter.city}
                placeholder={t('city')}
                onChange={e => handlePropsChange('city', e)}
              />
              <Field
                data={filter.address}
                placeholder={t('address')}
                onChange={e => handlePropsChange('address', e)}
              />
              <Field
                data={filter.postcode}
                placeholder={t('postcode')}
                onChange={e => handlePropsChange('postcode', e)}
              />
            </div>
            <div className={style.container}>
              <div className={style.bonus}>
                <Checkbox
                  data={filter.bonus}
                  placeholder={t('notification.receive')}
                  onChange={e => handlePropsChange('bonus', e)}
                />
                <Image
                  src={`/images/bonus.webp`}
                  className={style.image}
                  alt={'Bonus'}
                  width={50}
                  height={50}
                  decoding="async"
                  unoptimized
                />
              </div>
              <hr className={style.divider} />
              <Checkbox
                data={filter.terms}
                placeholder={t('notification.terms')}
                onChange={e => handlePropsChange('terms', e)}
                rules={[
                  VALIDATION_RULES.required(),
                ]}
                onValidate={err => setFieldError('terms', err)}
              />
            </div>
            <div className={style.actions}>
              <Action
                classes={['secondary', 'lg']}
                placeholder={t('back')}
                onChange={prevStep}
              />
              <Action
                classes={['primary', 'lg']}
                placeholder={t('send')}
                onChange={handleCheck}
                isDisabled={isDisabled}
              />
            </div>
          </>
        }
        <p className={style.link}>
          {t('notification.already_registered')}
          <Action
            classes={['md', 'outline']}
            placeholder={t('login')}
            onChange={() =>
              openModal('login', {}, { title: t('sign_up') })
            }
          />
        </p>
      </form>
    </section>
  )
}

export default SectionRegistration
