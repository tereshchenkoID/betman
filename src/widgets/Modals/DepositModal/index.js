import style from './index.module.scss'

const DepositModal = ({ data }) => {
  if (!data?.link) return null

  return (
    <div className={style.block}>
      <iframe
        className={style.iframe}
        src={`${data}&embedded=true`}
        frameBorder="0"
        title="Crypto Deposit"
        allow="payment clipboard-write"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation"
      ></iframe>
    </div>
  )
}

export default DepositModal
