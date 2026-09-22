import { useTranslations } from 'next-intl'
import clsx from 'clsx'

import Status from '@/modules/Status'

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
                clsx(
                  style.option,
                  {
                    [style.active]: data.value === el.value
                  }
                )
              }
              aria-label={el.text}
              onClick={() => action(el)}
            >
              {t(el.key)}
              {
                el.verification &&
                <Status
                  data={el.verification}
                  classes={['sm']}
                />
              }
            </button>
          )
        }
      </div>
    </div>
  )
}

export default Tabs
