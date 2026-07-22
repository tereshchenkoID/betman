'use client'

import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import classNames from 'classnames'

import { apiRequest } from '@/app/actions/api'

import { useModal } from '@/context/ModalContext'
import { useFilterState } from '@/hooks/useFilterState'
import { useValidations } from '@/hooks/useValidations'

import Action from '@/components/Action'
import Field from '@/components/Field'
import Icon from '@/components/Icon'
import Checkbox from '@/components/Checkbox'
import Select from '@/components/Select'
import Phone from '@/components/Phone'
import LoginModal from '@/modules/Modals/LoginModal'
// import Providers from 'modules/Providers/Providers'

import style from './index.module.scss'

const STEP_FIELDS = {
  0: ['username', 'email', 'password'],
  1: ['name', 'surname', 'birthday', 'phone', 'terms'],
}

const SectionRegistration = ({
  user,
  countries
}) => {
  const t = useTranslations()

  const { openModal } = useModal()
  const router = useRouter()
  const searchParams = useSearchParams()
  const invite = searchParams.get('invite')

  const VALIDATION_RULES = useValidations()

  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState({})

  const { filter, handlePropsChange } = useFilterState({
    name: '',
    surname: '',
    promocode: '',
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
    bonus: '0',
    invite: invite || null,
  })

  const currentStep = STEP_FIELDS[step] || []
  const isValidationErrors = currentStep.some(field => Boolean(errors[field]))
  const isFormIncomplete = currentStep.some(field => {
    if (field === 'promocode') return false
    return !filter[field]
  })
  const isDisabled = isValidationErrors || isFormIncomplete

  const setFieldError = (name, err) => {
    setErrors(prev => ({ ...prev, [name]: err }))
  }

  const nextStep = () => {
    if (!isDisabled) setStep(prev => prev + 1)
  }

  const prevStep = () => {
    setStep(prev => prev - 1)
  }

  const handleSubmit = async (e) => {
    e && e.preventDefault()

    if (isDisabled) return null

    const res = await apiRequest('registration/', {
      method: 'POST',
      params: {
        data: JSON.stringify(filter)
      }
    })

    if (res && res?.code === '0') {
      router.refresh()
      router.push('/')
    }
  }

  const handleCheck = async (e) => {
    e && e.preventDefault()
    if (isDisabled) return

    try {
      if (step === 0) {
        const checks = [
          { key: 'username', value: filter.username },
          { key: 'email', value: filter.email },
          { key: 'promocode', value: filter.promocode }
        ]

        const [username, email, promocode] = await Promise.all(
          checks.map(({ key, value }) => {
            return apiRequest('registration/check/', {
              method: 'POST',
              params: { key, value }
            })
          })
        )

        if (username?.code !== '0') setFieldError('username', t('errors.username_exist'))
        if (email?.code !== '0') setFieldError('email', t('errors.email_exist'))
        if (promocode?.code !== '0') setFieldError('promocode', t('errors.promocode_exist'))

        if (username?.code === '0' && email?.code === '0') {
          nextStep()
        }
      }

      else if (step === 1) {
        if (filter.bonus !== '1') {
          setFieldError('bonus', 'Field is required')
          return
        }

        const res = await apiRequest('registration/check/', {
          method: 'POST',
          params: {
            key: 'phone',
            value: filter.phone
          }
        })

        if (res && res?.code !== '0') {
          setFieldError('phone', t('errors.phone_exist'))
          return
        }

        await handleSubmit()
      }
    } catch (e) {
      console.error('Submission error:', e)
    }
  }

  return (
    <section>
      <form className={style.form}>
        <h3 className={style.title}>{t('create_account')}</h3>
        <div className={style.steps}>
          {
            Array.from({ length: 2 }).map((_, idx) =>
              <div
                key={idx}
                className={
                  classNames(
                    style.step,
                    step === idx && style.active,
                    step > idx && style.completed
                  )
                }
              >
                {
                  step > idx
                  ?
                    <Icon
                      size={'lg'}
                      name={'icon-status-checkmark'}
                    />
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
                onChange={e => handlePropsChange('promocode', e)}
                rules={[]}
                onValidate={err => setFieldError('promocode', err)}
                error={errors.promocode}
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
              openModal({
                title: t('sign_up'),
                body: <LoginModal />
              })
            }
          />
        </p>
        {/*<hr />*/}
        {/*<Providers />*/}
      </form>
    </section>
  )
}

export default SectionRegistration
