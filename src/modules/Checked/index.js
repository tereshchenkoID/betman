import classNames from 'classnames'

import style from './index.module.scss'

const Checked = ({
  data,
  onChange,
  isDisabled = false,
  placeholder
}) => {
  return (
    <label
      className={
        classNames(
          style.block,
          {
            [style.active]: data === '1',
            [style.disabled]: isDisabled
          },
        )
      }
    >
      <input
        type={'checkbox'}
        className={style.input}
        checked={data === '1'}
        onChange={() => onChange(data === '1' ? '0' : '1')}
      />
      <span className={style.item}>
        <span className={style.left}>{placeholder[0]}</span>
        <span className={style.right}>{placeholder[1]}</span>
      </span>
    </label>
  )
}

export default Checked
