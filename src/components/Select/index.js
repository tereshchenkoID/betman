import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import classNames from 'classnames'

import { useOutsideClick } from '@/hooks/useOutsideClick'
import { runRules } from '@/helpers/rules'

import Action from '@/components/Action'
import Icon from '@/components/Icon'

import style from './index.module.scss'

const Select = ({
  type,
  data,
  value,
  placeholder,
  onChange,
  onValidate,
  classes = null,
  isDisabled = false,
  isRequired = false,
  rules = [],
}) => {
  const t = useTranslations()
  const blockRef = useRef(null)
  const [toggle, setToggle] = useState(false)
  const [search, setSearch] = useState('')
  const [touched, setTouched] = useState(false)
  const [error, setError] = useState(null)

  const filters = data.filter(el =>
    el?.label?.toLowerCase().includes(search.toLowerCase())
  )

  const validate = (val = value) => {
    const err = runRules(val, rules)
    setError(err)
    onValidate?.(err)
    return err
  }

  useOutsideClick(
    blockRef,
    () => {
      setToggle(false)
      setSearch('')
      setTouched(true)
      validate()
    },
    toggle
  )

  useEffect(() => {
    const err = runRules(data, rules)
    onValidate?.(err)
  }, [])

  return (
    <div
      ref={blockRef}
      className={
        classNames(
          style.block,
          {
            [style.disabled]: isDisabled,
            [style.active]: toggle,
            [style.chosen]: value,
            [style.error]: error,
          },
          classes && classes.map(el => style[el] || el),
        )
      }
    >
      <button
        type="button"
        aria-label={t('select_value')}
        className={style.selected}
        onClick={() => setToggle(!toggle)}
      >
        <label className={style.label}>
          {placeholder}
          {isRequired && <span>*</span>}
        </label>
        <span>{value && (value.label || t('select_value'))}</span>
        <Icon name={'icon-navigation-chevron-down'} />
      </button>
      {
        toggle &&
        <div className={style.dropdown}>
          <div className={style.head}>
            <input
              type={type}
              value={search}
              className={style.input}
              placeholder={'Search'}
              onChange={e => setSearch(e.currentTarget.value)}
              autoComplete={'on'}
            />
          </div>
          <div className={style.list}>
            {
              filters.length > 0
                ?
                  filters.map((el, idx) =>
                    <Action
                      key={idx}
                      classes={[
                        style.option,
                        value?.label === el.label && style.active
                      ]}
                      placeholder={el.label}
                      onChange={() => {
                        onChange(el)
                        setSearch('')
                        setToggle(false)
                        setTouched(true)
                        validate(el)
                      }}
                    />
                  )
                :
                  <div className={style.text}>{t('empty')} &#34;{search}&#34;</div>
            }
          </div>
        </div>
      }
      {
        (touched && error) &&
        <p className={style.message}>{error}</p>
      }
    </div>
  )
}

export default Select
