import { getCachedUser } from '@/app/actions/auth'
import {
  getSettings,
  getCategories,
  getProviders,
  getPages,
  getWheelsRound,
  getQuests
} from '@/app/actions/static'

import Header from '@/modules/Header'
import Footer from '@/modules/Footer'
import Aside from '@/modules/Aside'
import Content from '@/modules/Content'

export default async function MainLayout({ children }) {
  const [
    user,
    settings,
    categories,
    providers,
    pages,
    wheels,
    quests,
  ] = await Promise.all([
    getCachedUser(),
    getSettings(),
    getCategories(),
    getProviders(),
    getPages(),
    getWheelsRound(),
    getQuests()
  ])

  return (
    <>
      <Header
        user={user}
        settings={settings}
      />
      <main>
        <Aside
          settings={settings}
          wheels={wheels}
          quests={quests}
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
