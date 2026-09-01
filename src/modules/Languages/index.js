'use client'

import { useRef, useState } from 'react'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import Image from 'next/image'

import { useOutsideClick } from '@/hooks/useOutsideClick'

import Action from '@/components/Action'

import style from './index.module.scss'

const Languages = ({ settings }) => {
  const [toggle, setToggle] = useState(false)
  const blockRef = useRef(null)

  const currentLocale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  const currentLang = settings?.languages?.find(el => el.code === currentLocale) || {
    code: currentLocale,
    text: currentLocale
  }

  const handleChange = (newLocale) => {
    setToggle(false)
    router.replace(pathname, { locale: newLocale })
  }

  useOutsideClick(
    blockRef,
    () => setToggle(false),
    toggle
  )

  return (
    <div
      ref={blockRef}
      className={style.block}
    >
      <button
        type="button"
        onClick={() => setToggle(!toggle)}
        className={style.toggle}
        aria-label={currentLang.text}
      >
        <Image
          src={`/images/countries/${currentLang.code}.svg`}
          className={style.image}
          alt={currentLang.text}
          width={20}
          height={20}
          priority
          sizes="20px"
          unoptimized
        />
      </button>
      {
        (toggle && settings?.languages?.length > 1) &&
        <div className={style.dropdown}>
          {
            settings.languages.map((el, idx) =>
              currentLocale !== el.code && (
                <Action
                  key={el?.code || idx}
                  aria-label={el.text}
                  classes={['secondary', 'md']}
                  onChange={() => handleChange(el.code)}
                >
                  <p className={style.icon}>
                    <Image
                      src={`/images/countries/${el.code}.svg`}
                      className={style.image}
                      alt={el.text}
                      width={20}
                      height={20}
                      sizes="20px"
                      unoptimized
                    />
                  </p>
                  {el.text}
                </Action>
              )
          )}
        </div>
      }
    </div>
  )
}

export default Languages
