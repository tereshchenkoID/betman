import Header from '@/widgets/Header'
import Footer from '@/widgets/Footer'
import Aside from '@/widgets/Aside'
import Content from '@/modules/Content'

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
