import Link from 'next/link'

import classNames from 'classnames'

import style from './index.module.scss'

const Badge = ({
  data,
  classes = ['primary', 'md'],
  link = null,
  ...rest
}) => {
  return (
    link
      ?
        <Link
          href={`/${link.join('/')}`}
          className={
            classNames(
              style.block,
              classes && classes.map(el => style[el] || el),
            )
          }
          aria-label={data}
        >
          {data}
        </Link>
      :
        <p
          className={
            classNames(
              style.block,
              classes && classes.map(el => style[el] || el),
            )
          }
          {...rest}
        >
          {data}
        </p>
  )
}

export default Badge
