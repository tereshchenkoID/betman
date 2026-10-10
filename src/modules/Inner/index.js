import Empty from '@/modules/Empty'

import style from './index.module.scss'

const Inner = ({ data }) => {
  if (!data) return <Empty />

  return (
    <div
      className={style.block}
      dangerouslySetInnerHTML={{ __html: data }}
    />
  )
}

export default Inner
