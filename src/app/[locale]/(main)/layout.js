import Content from '@/modules/Content'
import Aside from '@/widgets/Aside'
import Footer from '@/widgets/Footer'
import Header from '@/widgets/Header'

export default async function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main>
        <Aside />
        <Content>{children}</Content>
      </main>
      <Footer />
    </>
  )
}
