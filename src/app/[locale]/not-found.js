import Header from '@/widgets/Header'
import Aside from '@/widgets/Aside'
import Footer from '@/widgets/Footer'
import Content from '@/modules/Content'
import SectionNotFound from '@/sections/SectionNotFound'

export default async function NotFoundPage() {
  return (
    <>
      <Header />
      <main>
        <Aside />
        <Content>
          <SectionNotFound />
        </Content>
      </main>
      <Footer />
    </>
  )
}
