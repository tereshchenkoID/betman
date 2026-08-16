import { useState, useRef, useMemo, useEffect, startTransition } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import classNames from 'classnames'

import { useOutsideClick } from '@/hooks/useOutsideClick'

import Icon from '@/components/Icon'

import style from './index.module.scss'

const DAYS_OF_WEEK = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su']

const DateRange = ({
  value = { from: null, to: null },
  onChange,
  placeholder,
  classes = null,
  isDisabled = false,
}) => {
  const t = useTranslations()

  const locale = useLocale()
  const blockRef = useRef(null)

  const [toggle, setToggle] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(() =>
    value.from ? new Date(value.from) : new Date()
  )

  useEffect(() => {
    if (value.from) {
      startTransition(() => {
        setCurrentMonth(new Date(value.from))
      })
    }
  }, [value.from])

  useOutsideClick(blockRef, () => setToggle(false), toggle)

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()

  const fromDate = useMemo(() => (value.from ? new Date(value.from) : null), [value.from])
  const toDate = useMemo(() => (value.to ? new Date(value.to) : null), [value.to])

  const daysInMonth = useMemo(() => {
    const days = []
    const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7
    const totalDays = new Date(year, month + 1, 0).getDate()

    for (let i = 0; i < firstDayIndex; i++) {
      days.push(null)
    }

    for (let i = 1; i <= totalDays; i++) {
      days.push(new Date(year, month, i))
    }

    return days
  }, [year, month])

  const handleDayClick = (day) => {
    if (!day) return

    const selectedTime = day.getTime()

    if (!value.from || (value.from && value.to)) {
      const startOfDay = new Date(day).setHours(0, 0, 0, 0)
      onChange?.({ from: startOfDay, to: null })
      return
    }

    if (selectedTime < value.from) {
      const startOfSelected = new Date(day).setHours(0, 0, 0, 0)
      const endOfPreviousFrom = new Date(value.from).setHours(23, 59, 59, 999)
      onChange?.({ from: startOfSelected, to: endOfPreviousFrom })
    } else {
      const endOfSelected = new Date(day).setHours(23, 59, 59, 999)
      onChange?.({ from: value.from, to: endOfSelected })
    }

    setToggle(false)
  }

  const changeMonth = (offset) => {
    setCurrentMonth(new Date(year, month + offset, 1))
  }

  const isSelected = (day) => {
    if (!day) return false
    const dayStr = day.toDateString()
    return dayStr === fromDate?.toDateString() || dayStr === toDate?.toDateString()
  }

  const isInRange = (day) => {
    if (!day || !fromDate || !toDate) return false
    const dayTime = new Date(day).setHours(0, 0, 0, 0)
    const fromTime = new Date(fromDate).setHours(0, 0, 0, 0)
    const toTime = new Date(toDate).setHours(0, 0, 0, 0)

    return dayTime > fromTime && dayTime < toTime
  }

  const formatDate = (date) => {
    if (!date) return ''
    return date.toLocaleDateString(locale, { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const renderValue = () => {
    if (!fromDate) return null
    if (!toDate) return formatDate(fromDate)
    return `${formatDate(fromDate)} – ${formatDate(toDate)}`
  }

  const now = new Date()
  const isCurrentMonth = year === now.getFullYear() && month === now.getMonth()
  const isToday = now.toDateString()

  return (
    <div
      ref={blockRef}
      className={
        classNames(
          style.block,
          {
            [style.disabled]: isDisabled,
            [style.active]: toggle,
            [style.chosen]: Boolean(value.from),
          },
          classes && classes.map((el) => style[el] || el)
        )
      }
    >
      <button
        type="button"
        aria-label={t('select_value')}
        className={style.selected}
        onClick={() => !isDisabled && setToggle((prev) => !prev)}
      >
        <label className={style.label}>{placeholder}</label>
        <span>{renderValue()}</span>
        <Icon name="icon-navigation-chevron-down" />
      </button>

      {
        toggle &&
        <div className={style.dropdown}>
          <div
            className={
              classNames(
                style.header,
                {
                  [style.current]: isCurrentMonth
                }
              )
            }
          >
            <button
              type="button"
              aria-label="Change month"
              onClick={() => changeMonth(-1)}
            >
              <Icon name="icon-navigation-chevron-left" />
            </button>
            <span>
              {currentMonth.toLocaleDateString(locale, { month: 'long', year: 'numeric' })}
            </span>
            <button
              type="button"
              aria-label="Change month"
              onClick={() => changeMonth(1)}
            >
              <Icon name="icon-navigation-chevron-right" />
            </button>
          </div>

          <div className={style.weeks}>
            {
              DAYS_OF_WEEK.map((d) =>
              <span key={d}>{t(d)}</span>
            )}
          </div>

          <div className={style.days}>
            {
              daysInMonth.map((day, idx) =>
                !day
                  ?
                    <div key={`empty-${idx}`} className={style.empty} />
                  :
                    <button
                      key={day.getTime()}
                      type="button"
                      className={
                        classNames(
                          style.day,
                          {
                            [style.today]: day.toDateString() === isToday,
                            [style.active]: isSelected(day),
                            [style.range]: isInRange(day),
                          }
                        )
                      }
                      onClick={() => handleDayClick(day)}
                    >
                      {day.getDate()}
                    </button>
            )}
          </div>
        </div>
      }
    </div>
  )
}

export default DateRange
