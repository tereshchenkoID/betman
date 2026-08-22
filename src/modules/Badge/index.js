import { Link } from '@/i18n/routing'

import classNames from 'classnames'

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
            classNames(
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
            classNames(
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
