import { useMemo } from 'react'
import { useTranslations } from 'next-intl'
import clsx from 'clsx'

import Icon from '@/components/Icon'
import Progress from '@/modules/Progress'

import style from './index.module.scss'

const WEIGHT = {
  profile: {
    weight: 25,
    items: [
      { check: (f) => Boolean(f?.profile?.username) },
      { check: (f) => Boolean(f?.profile?.name) },
      { check: (f) => Boolean(f?.profile?.surname) },
      { check: (f) => Boolean(f?.profile?.birthday) },
    ],
  },
  address: {
    weight: 25,
    items: [
      { check: (f) => Boolean(f?.address?.country?.value) },
      { check: (f) => Boolean(f?.address?.city) },
      { check: (f) => Boolean(f?.address?.state) },
      { check: (f) => Boolean(f?.address?.address) },
      { check: (f) => Boolean(f?.address?.postcode) },
    ],
  },
  verification: {
    items: [
      { weight: 15, check: (f) => f?.profile?.isVerifyEmail === '2' },
      { weight: 15, check: (f) => f?.profile?.isVerifyPhone === '2' },
      { weight: 20, check: (f) => Number(f?.profile?.isVerify) >= 3 },
    ],
  },
}

const calculateTotalProgress = (filterData) => {
  let total = 0

  const profileItems = WEIGHT.profile.items
  const profileStep = WEIGHT.profile.weight / profileItems.length
  profileItems.forEach(item => {
    if (item.check(filterData)) total += profileStep
  })

  const addressItems = WEIGHT.address.items
  const addressStep = WEIGHT.address.weight / addressItems.length
  addressItems.forEach(item => {
    if (item.check(filterData)) total += addressStep
  })

  WEIGHT.verification.items.forEach(item => {
    if (item.check(filterData)) total += item.weight
  })

  return Math.round(Math.min(total, 100))
}

const isSectionIncomplete = (sectionKey, filterData) => {
  const section = WEIGHT[sectionKey]
  return section?.items?.some(item => !item.check(filterData)) ?? false
}

const getSectionBonus = (sectionKey, filterData) => {
  const section = WEIGHT[sectionKey]
  if (!section?.items) return 0

  const step = section.weight / section.items.length
  let bonus = 0

  section.items.forEach(item => {
    if (!item.check(filterData)) {
      bonus += step
    }
  })

  return Math.round(bonus)
}

const Filled = ({ filter }) => {
  const t = useTranslations()

  const currentProgress = useMemo(() => calculateTotalProgress(filter), [filter])

  const CHECKLIST = useMemo(() => [
    {
      id: 'profile',
      label: t('profile_label'),
      isCompleted: !isSectionIncomplete('profile', filter),
      bonus: getSectionBonus('profile', filter),
    },
    {
      id: 'address',
      label: t('address_label'),
      isCompleted: !isSectionIncomplete('address', filter),
      bonus: getSectionBonus('address', filter),
    },
    {
      id: 'docsVerify',
      label: t('docs_verify_label'),
      isCompleted: Number(filter?.profile?.isVerify) >= 3,
      bonus: 20,
    },
    {
      id: 'phoneVerify',
      label: t('phone_verify_label'),
      isCompleted: filter?.profile?.isVerifyPhone === '2',
      bonus: 15,
    },
    {
      id: 'emailVerify',
      label: t('email_verify_label'),
      isCompleted: filter?.profile?.isVerifyEmail === '2',
      bonus: 15,
    },
  ], [filter, t])

  return (
    <div className={style.block}>
      <Progress
        data={currentProgress}
        size={100}
        strokeWidth={8}
      />
      <ul className={style.list}>
        {
          CHECKLIST.map((item) =>
            <li
              key={item.id}
              className={
                clsx(
                  style.item,
                  {
                    [style.filled]: item.isCompleted
                  }
                )
              }
            >
              <span className={style.circle}>
                <Icon name="status-checkmark" classes={style.icon} />
              </span>
              <p>{item.label}</p>
              {
                !item.isCompleted && item.bonus > 0 && (
                  <strong className={style.bonus}>+{item.bonus}%</strong>
                )
              }
            </li>
          )
        }
      </ul>
    </div>
  )
}

export default Filled
