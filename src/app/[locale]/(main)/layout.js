import { getCachedUser } from '@/app/actions/auth'
import {
  getSettings,
  getCategories,
  getProviders,
  getPages,
} from '@/app/actions/static'

import Header from '@/widgets/Header'
import Footer from '@/widgets/Footer'
import Aside from '@/widgets/Aside'
import Content from '@/modules/Content'

export default async function MainLayout({ children }) {
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
    <>
      <Header
        user={user}
        settings={settings}
      />
      <main>
        <Aside
          user={user}
          settings={settings}
        />
        <Content>{children}</Content>
      </main>
      <Footer
        user={user}
        settings={settings}
        categories={categories}
        providers={providers}
        pages={pages}
      />
    </>
  )
}
