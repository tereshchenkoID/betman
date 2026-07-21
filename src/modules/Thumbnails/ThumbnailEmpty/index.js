import ThumbnailPreload from '@/modules/Thumbnails/ThumbnailPreload'

import style from './index.module.scss'

const ThumbnailEmpty = ({ settings }) => {

  return (
    <div className={style.block}>
      <ThumbnailPreload settings={settings} />
    </div>
  )
}

export default ThumbnailEmpty
