import style from './index.module.scss'

const Preload = ({
  styles,
  counts,
  rows = 1,
  columns = 1
}) => {
  return (
    <div
      className={style.block}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {
        Array.from({ length: counts }).map((_, idx) => (
          <div
            key={idx}
            style={styles}
            className={style.item}
          />
        ))
      }
    </div>
  )
}

export default Preload
