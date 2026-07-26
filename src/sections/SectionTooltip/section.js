'use client'

import { Fragment } from 'react'

import Inner from '@/modules/Inner'

const Section = ({ data, meta }) => {
  if (meta?.results === '0') return null

  return (
    <div>
      {
        data?.map((el, idx) =>
          <Fragment key={idx}>
            <h2>{el?.title}</h2>
            <Inner data={el?.text} />
          </Fragment>
        )
      }
    </div>
  )
}

export default Section
