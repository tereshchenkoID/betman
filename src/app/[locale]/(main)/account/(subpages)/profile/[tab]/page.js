import { USER_VERIFY } from '@/constant/config'

import { getCountries, getProfile, getSettings } from '@/app/actions/static'

import SectionTooltip from '@/sections/SectionTooltip'

import Section from './_view'

export default async function Profile({ params }) {
  const { tab } = await params

  const [
    settings,
    res,
    countries
  ] = await Promise.all([
    getSettings(),
    getProfile(),
    getCountries()
  ])

  const verify = USER_VERIFY[res?.profile?.isVerify]
  const alias = tab === 'verification' ? `verification/${verify}` : tab

  return (
    <Section
      settings={settings}
      data={res}
      countries={countries}
      tab={tab}
    >
      <SectionTooltip alias={alias} />
    </Section>
  )
}
