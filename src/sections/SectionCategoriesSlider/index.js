import { getCategories, getProviders } from '@/app/actions/static'
import { getCachedUser } from '@/app/actions/auth'

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
