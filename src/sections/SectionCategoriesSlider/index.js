import { getCategories } from '@/app/actions/static'

import Section from './_view'

const SectionCategoriesSlider = async () => {
  const res = await getCategories()

  return (
    <Section
      data={res?.data}
      meta={res?.meta}
    />
  )
}

export default SectionCategoriesSlider
