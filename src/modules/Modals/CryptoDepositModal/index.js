import style from './index.module.scss'

const CryptoDepositModal = ({ data }) => {
  if (!data?.link) return null

  return (
    <div className={style.block}>
      <iframe
        className={style.iframe}
        src={data}
        frameBorder="0"
        title="Crypto Deposit"
        allow="clipboard-write"
      ></iframe>
    </div>
  )
}

export default CryptoDepositModal
