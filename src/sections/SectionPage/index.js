'use client'

import { Fragment } from 'react'

import Inner from '@/modules/Inner'

const SectionPage = ({ data, meta }) => {
  if (meta?.results === '0') return null

  return (
    <section>
      {
        data?.map((el, idx) =>
          <Fragment key={idx}>
            <Inner data={el?.description}/>
          </Fragment>
        )
      }
    </section>
  )
}

export default SectionPage
