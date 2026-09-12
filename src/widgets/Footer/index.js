import {
  getCategories, getPages, getProviders, getSettings
} from '@/app/actions/static'

import Section from './_view'

export default async function FooterLayout() {
  const [
    settings,
    categories,
    providers,
    pages,
  ] = await Promise.all([
    getSettings(),
    getCategories(),
    getProviders(),
    getPages(),
  ])

  return (
    <Section
      settings={settings}
      categories={categories}
      providers={providers}
      pages={pages}
    />
  )
}
