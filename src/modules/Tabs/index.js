import { useTranslations } from 'next-intl'

import classNames from 'classnames'

import style from './index.module.scss'

const Tabs = ({ options, data, action }) => {
  const t = useTranslations()

  return (
    <div className={style.block}>
      <div className={style.list}>
        {
          options?.map((el, idx) =>
            <button
              key={idx}
              type="button"
              className={
                classNames(
                  style.option,
                  data.value === el.value && style.active,
                )
              }
              aria-label={el.text}
              onClick={() => action(el)}
            >
              {t(el.key)}
            </button>
          )
        }
      </div>
    </div>
  )
}

export default Tabs
