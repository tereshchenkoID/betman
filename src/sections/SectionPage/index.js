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
            {
              el?.title &&
              <h1>{el?.title}</h1>
            }
            <Inner data={el?.description}/>
          </Fragment>
        )
      }
    </section>
  )
}

export default SectionPage
