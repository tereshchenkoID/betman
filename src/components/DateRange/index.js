import { useState, useRef, useMemo, useEffect, startTransition } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import clsx from 'clsx'

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

  const [internalRange, setInternalRange] = useState(() => ({
    from: value.from ? Number(value.from) : null,
    to: value.to ? Number(value.to) : null,
  }))

  const [currentMonth, setCurrentMonth] = useState(() =>
    value.from ? new Date(Number(value.from)) : new Date()
  )

  useEffect(() => {
    startTransition(() => {
      setInternalRange({
        from: value.from ? Number(value.from) : null,
        to: value.to ? Number(value.to) : null,
      })
    })
  }, [value.from, value.to])

  useEffect(() => {
    if (value.from) {
      startTransition(() => {
        setCurrentMonth(new Date(Number(value.from)))
      })
    }
  }, [value.from])

  useOutsideClick(blockRef, () => setToggle(false), toggle)

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()

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

    const { from, to } = internalRange

    if (!from || (from && to)) {
      const startOfDay = new Date(day).setHours(0, 0, 0, 0)
      setInternalRange({ from: startOfDay, to: null })
      return
    }

    const clickedTime = day.getTime()
    const minTime = Math.min(from, clickedTime)
    const maxTime = Math.max(from, clickedTime)

    const normalizedFrom = new Date(minTime).setHours(0, 0, 0, 0)
    const normalizedTo = new Date(maxTime).setHours(23, 59, 59, 999)

    const newRange = { from: normalizedFrom, to: normalizedTo }

    setInternalRange(newRange)
    setToggle(false)
    onChange?.(newRange)
  }

  const changeMonth = (offset) => {
    setCurrentMonth(new Date(year, month + offset, 1))
  }

  const isSelected = (day) => {
    if (!day || !internalRange.from) return false
    const dayTime = new Date(day).setHours(0, 0, 0, 0)
    const fromTime = new Date(internalRange.from).setHours(0, 0, 0, 0)
    const toTime = internalRange.to ? new Date(internalRange.to).setHours(0, 0, 0, 0) : null

    return dayTime === fromTime || dayTime === toTime
  }

  const isInRange = (day) => {
    if (!day || !internalRange.from || !internalRange.to) return false
    const dayTime = new Date(day).setHours(0, 0, 0, 0)
    const minTime = Math.min(internalRange.from, internalRange.to)
    const maxTime = Math.max(internalRange.from, internalRange.to)

    const fromTime = new Date(minTime).setHours(0, 0, 0, 0)
    const toTime = new Date(maxTime).setHours(0, 0, 0, 0)

    return dayTime > fromTime && dayTime < toTime
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return ''
    return new Date(timestamp).toLocaleDateString(locale, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const renderDisplayValue = () => {
    const propFrom = value.from ? Number(value.from) : null
    const propTo = value.to ? Number(value.to) : null

    if (!propFrom) return null
    if (!propTo) return formatDate(propFrom)

    const min = Math.min(propFrom, propTo)
    const max = Math.max(propFrom, propTo)

    return `${formatDate(min)} – ${formatDate(max)}`
  }

  const now = new Date()
  const isCurrentMonth = year === now.getFullYear() && month === now.getMonth()
  const isToday = now.toDateString()

  return (
    <div
      ref={blockRef}
      className={
        clsx(
          style.block,
          {
            [style.disabled]: isDisabled,
            [style.active]: toggle,
            [style.chosen]: value.from,
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
        <span>{renderDisplayValue()}</span>
        <Icon name="icon-navigation-chevron-down" />
      </button>

      {
        toggle &&
        <div className={style.dropdown}>
          <div
            className={
              clsx(
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
                !day ?
                  <div
                    key={`empty-${idx}`}
                    className={style.empty}
                  />
                  :
                    <button
                      key={day.getTime()}
                      type="button"
                      className={
                        clsx(
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
                )
            }
          </div>
        </div>
      }
    </div>
  )
}

export default DateRange
