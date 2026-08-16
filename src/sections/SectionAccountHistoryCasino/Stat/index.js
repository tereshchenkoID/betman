import style from './index.module.scss'

const Stat = () => {
  return (
    <div className={style.block}>
      <p className={style.subtitle}>Net results</p>
      <h2 className={style.title}>+$342.50</h2>
      <p className={style.text}>vs last 7 days</p>
    </div>
  )
}

export default Stat
