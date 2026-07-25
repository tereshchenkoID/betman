'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import classNames from 'classnames'

import Action from '@/components/Action'
import Icon from '@/components/Icon'

import style from './index.module.scss'

const Pagination = ({
  data,
  classes = [],
}) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const page = Number(data?.page) || 1
  const totalPages = Number(data?.pages) || 0
  const totalResults = Number(data?.results) || 0

  if (!data || totalPages <= 1 || totalResults === 0) return null

  const createPageUrl = (targetPage) => {
    const params = new URLSearchParams(searchParams)

    if (targetPage <= 1) {
      params.delete('page')
    } else {
      params.set('page', targetPage.toString())
    }

    const queryString = params.toString()
    return queryString ? `${pathname}?${queryString}` : pathname
  }

  return (
    <div
      className={
        classNames(
          style.block,
          classes && classes.map((el) => style[el] || el)
        )
      }
    >
      <Action
        to={createPageUrl(page - 1)}
        classes={['primary', 'square', 'md']}
        isDisabled={page <= 1}
      >
        <Icon name={'icon-navigation-chevron-left'} />
      </Action>
      <p>{page} / {totalPages}</p>
      <Action
        to={createPageUrl(page + 1)}
        classes={['primary', 'square', 'md']}
        isDisabled={page >= totalPages}
      >
        <Icon name={'icon-navigation-chevron-right'} />
      </Action>
    </div>
  )
}

export default Pagination
