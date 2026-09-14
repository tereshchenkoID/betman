'use client'

import LoginModal from '@/widgets/Modals/LoginModal'

import style from './index.module.scss'

const Section = () => {
  return (
    <section>
      <div className={style.form}>
        <LoginModal isTitle={true} />
      </div>
    </section>
  )
}

export default Section
