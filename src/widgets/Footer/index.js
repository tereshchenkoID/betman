import {
  getCategories, getPages, getProviders, getSettings
} from '@/app/actions/static'

import Footer from '@/widgets/Footer/section'

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
    <Footer
      settings={settings}
      categories={categories}
      providers={providers}
      pages={pages}
    />
  )
}
