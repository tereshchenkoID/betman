import { useRouter } from '@/i18n/navigation'

import Icon from '@/components/Icon'
import Action from '@/components/Action'

const Back = ({ url = null }) => {
  const router = useRouter()

  const handleBack = () => {
    if (url) {
      router.push(url)
    } else {
      router.back()
    }
  }

  return (
    <Action
      onChange={handleBack}
      classes={['secondary', 'md', 'square']}
      placeholder="Back"
    >
      <Icon name="navigation-chevron-left" />
    </Action>
  )
}

export default Back
