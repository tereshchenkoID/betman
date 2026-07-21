import style from './index.module.scss'

const Content = ({ children }) => {
  return (
    <div className={style.block}>
      {children}
    </div>
  )
}

export default Content
