import { useCallback, useState } from 'react'

import Icon from '@/components/Icon'
import Action from '@/components/Action'

const FullScreen = () => {
  const [toggle, setToggle] = useState(false)

  const handleToggle = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
        .then(() => {
          setToggle(true)
        })
        .catch(err => {
          console.error(`Error: ${err.message}`)
        })
    }
    else {
      document.exitFullscreen().then(() => {
        setToggle(false)
      })
    }
  }, [])

  return (
    <Action
      classes={['secondary', 'md', 'square']}
      onChange={handleToggle}
    >
      <Icon name={toggle ? 'icon-toggle-minimize' : 'icon-toggle-maximize'} />
    </Action>
  )
}

export default FullScreen
