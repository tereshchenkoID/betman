import { getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'

import { getCachedUser } from '@/app/actions/auth'
import { getSettings, getCategories, getProviders, getPages, getWheelsRound } from '@/app/actions/static'
// import { getFavoritesAction } from '@/app/actions/favorites'

import { ModalProvider } from '@/context/ModalContext'
import { FavoritesProvider } from '@/context/FavoritesContext'

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
    wheelsRound,

    // favorites
  ] = await Promise.all([
    getMessages({ locale }),
    getCachedUser(),
    getSettings(),
    getCategories(),
    getProviders(),
    getPages(),
    getWheelsRound()

    // getFavoritesAction()
  ])

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {/*<FavoritesProvider initialFavorites={favorites}>*/}
        <ModalProvider>
          <Header
            user={user}
            settings={settings}
          />
          <main>
            <Aside
              settings={settings}
              wheelsRound={wheelsRound}
            />
            <Content>{children}</Content>
          </main>
          <Footer
            settings={settings}
            categories={categories}
            providers={providers}
            pages={pages}
          />
          <Toastify />
        </ModalProvider>
      {/*</FavoritesProvider>*/}
    </NextIntlClientProvider>
  )
}
