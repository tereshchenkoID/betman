'use client'

import { Fragment } from 'react'

import Inner from '@/modules/Inner'

const Section = ({ data, meta }) => {
  if (meta?.results === '0') return null

  return (
    <div>
      {
        data?.map((el, idx) =>
          <Fragment key={el?.id || idx}>
            <Inner data={el?.text} />
          </Fragment>
        )
      }
    </div>
  )
}

export default Section
