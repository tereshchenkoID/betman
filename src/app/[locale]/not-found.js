import { getCachedUser } from '@/app/actions/auth'
import {
  getCategories,
  getPages,
  getProviders,
  getQuests,
  getSettings,
  getWheelsRound
} from '@/app/actions/static'

import SectionNotFound from '@/sections/SectionNotFound'
import Header from '@/modules/Header'
import Aside from '@/modules/Aside'
import Content from '@/modules/Content'
import Footer from '@/modules/Footer'

export default async function NotFoundPage() {
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
        <Content>
          <SectionNotFound />
        </Content>
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
