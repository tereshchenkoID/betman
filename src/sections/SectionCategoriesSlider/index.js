import { getCategories, getCachedUser } from '@/app/actions/static'

import Section from './section'

const SectionCategoriesSlider = async () => {
  const [
    user,
    res,
  ] = await Promise.all([
    getCachedUser(),
    getCategories()
  ])

  return (
    <Section
      data={res?.data}
      meta={res?.meta}
      user={user}
    />
  )
}

export default SectionCategoriesSlider
