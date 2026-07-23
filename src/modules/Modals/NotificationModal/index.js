import Image from 'next/image'

import style from './index.module.scss'

const NotificationModal = ({ data }) => {
  return (
    <div className={style.block}>
      {
        data.image &&
        <div className={style.picture}>
          <Image
            className={style.image}
            src={data.image}
            alt={data?.title}
            fill
            sizes="120px"
          />
        </div>
      }
      <div dangerouslySetInnerHTML={{ __html: data?.text }} />
    </div>
  )
}

export default NotificationModal
