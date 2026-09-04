import clsx from 'clsx'

import { Link } from '@/i18n/navigation'

import { useModal } from '@/context/ModalContext'

import style from './index.module.scss'

const Badge = ({
  data,
  classes = ['primary', 'md'],
  link = null,
  ...rest
}) => {
  const { closeAllModals } = useModal()

  return (
    link
      ?
        <Link
          href={`/${link.join('/')}`}
          className={
            clsx(
              style.block,
              classes?.map(el => style[el] || el),
            )
          }
          onClick={closeAllModals}
          aria-label={data}
        >
          {data}
        </Link>
      :
        <p
          className={
            clsx(
              style.block,
              classes?.map(el => style[el] || el),
            )
          }
          {...rest}
        >
          {data}
        </p>
  )
}

export default Badge
