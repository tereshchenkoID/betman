import {
  getCachedUser, getCategories, getPages, getProviders, getSettings 
} from '@/app/actions/static'

import Footer from '@/widgets/Footer/section'

export default async function FooterLayout() {
  const [
    user,
    settings,
    categories,
    providers,
    pages,
  ] = await Promise.all([
    getCachedUser(),
    getSettings(),
    getCategories(),
    getProviders(),
    getPages(),
  ])

  return (
    <Footer
      user={user}
      settings={settings}
      categories={categories}
      providers={providers}
      pages={pages}
    />
  )
}
