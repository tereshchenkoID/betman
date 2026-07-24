import SectionAccountNavigation from '@/sections/SectionAccountNavigation'

export default async function AccountLayout({ children }) {
  return (
    <>
      <SectionAccountNavigation />
      {children}
    </>
  )
}
