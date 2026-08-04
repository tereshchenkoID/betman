import dynamic from 'next/dynamic'

export const MODAL_REGISTRY = {
  age: dynamic(() => import('./AgeModal')),
  cryptoDeposit: dynamic(() => import('./CryptoDepositModal')),
  game: dynamic(() => import('./GameModal')),
  login: dynamic(() => import('./LoginModal')),
  notification: dynamic(() => import('./NotificationModal')),
  paymentDetails: dynamic(() => import('./PaymentDetailsModal')),
  quest: dynamic(() => import('./QuestModal')),
  search: dynamic(() => import('./SearchModal')),
}
