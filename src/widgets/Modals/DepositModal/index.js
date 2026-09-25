import { useEffect } from 'react'

import style from './index.module.scss'

const DepositModal = ({ data }) => {
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === 'PAYMENT_SUCCESS_REDIRECT' && event.data?.url) {
        window.location.href = event.data.url
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  if (!data?.link) return null

  return (
    <div className={style.block}>
      <iframe
        className={style.iframe}
        src={`${data}&embedded=true`}
        frameBorder="0"
        title="Crypto Deposit"
        allow="payment clipboard-write"
        // sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation-by-user-activation"
      ></iframe>
    </div>
  )
}

export default DepositModal
