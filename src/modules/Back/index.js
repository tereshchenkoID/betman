import { useRouter } from '@/i18n/navigation'

import Action from '@/components/Action'
import Icon from '@/components/Icon'

const Back = ({
  url = null,
  classes = null
}) => {
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
      classes={['secondary', 'md', 'square', classes]}
      aria-label="Back"
    >
      <Icon name="navigation-chevron-left" />
    </Action>
  )
}

export default Back
