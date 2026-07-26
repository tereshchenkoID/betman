import { getPageMetadata } from '@/app/actions/metadata'

import SectionAccountPromocode from '@/sections/SectionAccountPromocode'
import SectionTooltip from '@/sections/SectionTooltip'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return await getPageMetadata('profile', locale)
}

export default async function Promocode() {
  return (
    <SectionAccountPromocode>
      <SectionTooltip alias={'promocode'} />
    </SectionAccountPromocode>
  )
}
