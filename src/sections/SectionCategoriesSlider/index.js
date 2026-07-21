import { getCategories, getProviders } from '@/app/actions/static'
import { getCachedUser } from '@/app/actions/auth'

import Section from './section'

const SectionCategoriesSlider = async () => {
  const [
    user,
    providers,
    res,
  ] = await Promise.all([
    getCachedUser(),
    getProviders(),
    getCategories()
  ])

  return (
    <Section
      data={res?.data}
      meta={res?.meta}
      providers={providers?.data}
      user={user}
    />
  )
}

export default SectionCategoriesSlider
