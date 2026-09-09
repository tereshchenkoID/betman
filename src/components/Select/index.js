import { useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import clsx from 'clsx'

import { useOutsideClick } from '@/hooks/useOutsideClick'
import { runRules } from '@/helpers/rules'

import Action from '@/components/Action'
import Icon from '@/components/Icon'

import style from './index.module.scss'

const Select = ({
  type = 'text',
  data = [],
  value = null,
  placeholder,
  onChange,
  onValidate,
  classes = null,
  isDisabled = false,
  isRequired = false,
  isSearch = true,
  rules = [],
  error = null,
}) => {
  const t = useTranslations()
  const blockRef = useRef(null)
  const [toggle, setToggle] = useState(false)
  const [search, setSearch] = useState('')
  const [touched, setTouched] = useState(false)

  useOutsideClick(
    blockRef,
    () => {
      if (!toggle) return
      setToggle(false)
      setSearch('')
      setTouched(true)

      const err = runRules(value, rules)
      onValidate?.(err)
    },
    toggle
  )

  const handleSelectOption = (option) => {
    onChange?.(option)
    setSearch('')
    setToggle(false)
    setTouched(true)

    const err = runRules(option, rules)
    onValidate?.(err)
  }

  const handleToggle = () => {
    if (isDisabled) return
    setToggle((prev) => !prev)
  }

  const filters =
    (isSearch && search)
      ? data.filter((el) => el?.label?.toLowerCase().includes(search.toLowerCase()))
      : data

  const isChosen = !!(value && (typeof value === 'object' ? value.label || value.value : value))
  const showError = !!error && (touched || isChosen)

  return (
    <div
      ref={blockRef}
      className={clsx(
        style.block,
        {
          [style.disabled]: isDisabled,
          [style.active]: toggle,
          [style.chosen]: isChosen,
          [style.error]: showError,
        },
        classes?.map((el) => style[el] || el)
      )}
    >
      <button
        type="button"
        aria-label={placeholder || t('select_value')}
        className={style.selected}
        onClick={handleToggle}
        disabled={isDisabled}
      >
        <label className={style.label}>
          {placeholder}
          {isRequired && <span>*</span>}
        </label>

        <span>{value && (value.label || t('select_value'))}</span>
        <Icon name="navigation-chevron-down" />
      </button>

      {
        toggle &&
        <div className={style.dropdown}>
          {
            isSearch &&
            <div className={style.head}>
              <input
                type={type}
                value={search}
                className={style.input}
                placeholder="Search"
                onChange={(e) => setSearch(e.currentTarget.value)}
                autoComplete="off"
              />
            </div>
          }

          <div className={style.list}>
            {
              filters.length > 0
                ?
                  filters.map((el, idx) => (
                    <Action
                      key={el?.id || el?.value || idx}
                      classes={[
                        style.option,
                        (value?.value === el?.value || value?.label === el?.label) && style.active,
                      ]}
                      placeholder={el?.label}
                      onChange={() => handleSelectOption(el)}
                    />
                  ))
                :
                  <div className={style.text}>
                    {t('empty')} &#34;{search}&#34;
                  </div>
            }
          </div>
        </div>
      }

      { showError && <p className={style.message}>{error}</p> }
    </div>
  )
}

export default Select
