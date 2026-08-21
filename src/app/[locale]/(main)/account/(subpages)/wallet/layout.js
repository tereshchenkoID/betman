import { getCachedUser } from '@/app/actions/static'

import SectionAccountWallet from '@/sections/SectionAccountWallet'

export default async function WalletLayout({ children }) {
  const user = await getCachedUser()

  return (
    <SectionAccountWallet user={user}>
      {children}
    </SectionAccountWallet>
  )
}
