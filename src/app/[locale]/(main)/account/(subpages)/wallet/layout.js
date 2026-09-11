import SectionAccountWallet from '@/sections/Account/SectionAccountWallet'

export default async function WalletLayout({ children }) {
  return (
    <SectionAccountWallet>
      {children}
    </SectionAccountWallet>
  )
}
