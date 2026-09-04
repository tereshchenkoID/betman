import { useCallback, useState } from 'react'

import Action from '@/components/Action'
import Icon from '@/components/Icon'

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
      classes={['secondary', 'md', 'circle']}
      onChange={handleToggle}
    >
      <Icon name={toggle ? 'toggle-minimize' : 'toggle-maximize'} />
    </Action>
  )
}

export default FullScreen
