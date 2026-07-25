import SectionAccountHistory from '@/sections/SectionAccountHistory'

export default async function HistoryLayout({ children }) {
  return (
    <>
      <SectionAccountHistory />
      {children}
    </>
  )
}
