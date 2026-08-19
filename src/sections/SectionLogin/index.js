'use client'

import { useTranslations } from 'next-intl'

import LoginModal from '@/widgets/Modals/LoginModal'

import style from './index.module.scss'

const SectionLogin = () => {
  const t = useTranslations()

  return (
    <section>
      <div className={style.form}>
        <LoginModal isTitle={true} />
      </div>
    </section>
  )
}

export default SectionLogin
