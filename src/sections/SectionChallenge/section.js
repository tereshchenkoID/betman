'use client'

import ChallengeCard from '@/modules/Cards/ChallengeCard'

const Section = ({ data, meta }) => {
  if (meta?.results === '0') return null

  return (
    <>
      {
        data?.map((el, idx) =>
          <ChallengeCard
            key={idx}
            data={el}
          />
        )
      }
    </>
  )
}

export default Section
