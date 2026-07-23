import { getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'

import { getCachedUser } from '@/app/actions/auth'
import {
  getSettings,
  getCategories,
  getProviders,
  getPages,
  getWheelsRound,
  getQuests
} from '@/app/actions/static'

import { ModalProvider } from '@/context/ModalContext'

import Toastify from '@/components/Toastify'
import Header from '@/modules/Header'
import Footer from '@/modules/Footer'
import Aside from '@/modules/Aside'
import Content from '@/modules/Content'

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params

  const [
    messages,
    user,
    settings,
    categories,
    providers,
    pages,
    wheels,
    quests,
  ] = await Promise.all([
    getMessages({ locale }),
    getCachedUser(),
    getSettings(),
    getCategories(),
    getProviders(),
    getPages(),
    getWheelsRound(),
    getQuests()
  ])

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <ModalProvider>
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
        <Toastify />
      </ModalProvider>
    </NextIntlClientProvider>
  )
}
