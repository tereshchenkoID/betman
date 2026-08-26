import { useSearchParams } from 'next/navigation'
import { usePathname } from '@/i18n/navigation'
import clsx from 'clsx'

import Action from '@/components/Action'
import Icon from '@/components/Icon'

import style from './index.module.scss'

const Pagination = ({ meta, classes = [] }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const page = Number(meta?.page) || 1
  const totalPages = Number(meta?.pages) || 0
  const totalResults = Number(meta?.results) || 0

  if (!meta || totalPages <= 1 || totalResults === 0) return null

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

  const getPaginationRange = () => {
    const delta = 1
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, page - delta); i <= Math.min(totalPages - 1, page + delta); i++) {
      range.push(i)
    }

    if (page - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (page + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  const pages = getPaginationRange()

  return (
    <div
      className={
        clsx(
          style.block,
          classes?.map((el) => style[el] || el)
        )
      }
    >
      <Action
        to={createPageUrl(page - 1)}
        classes={['primary', 'square', 'md']}
        isDisabled={page <= 1}
      >
        <Icon name="navigation-chevron-left" />
      </Action>
      {
        pages.map((el, idx) =>
          el === '...'
            ?
              <span key={idx}>...</span>
            :
              <Action
                key={idx}
                to={createPageUrl(el)}
                classes={[
                  'square',
                  'md',
                  el === page ? 'primary' : 'secondary',
                ]}
              >
                {el}
              </Action>
        )
      }
      <Action
        to={createPageUrl(page + 1)}
        classes={['primary', 'square', 'md']}
        isDisabled={page >= totalPages}
      >
        <Icon name="navigation-chevron-right" />
      </Action>
    </div>
  )
}

export default Pagination
