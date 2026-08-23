import dynamic from 'next/dynamic'

export const MODAL_REGISTRY = {
  age: dynamic(() => import('./AgeModal')),
  game: dynamic(() => import('./GameModal')),
  login: dynamic(() => import('./LoginModal')),
  recovery: dynamic(() => import('./RecoveryModal')),
  quest: dynamic(() => import('./QuestModal')),
  search: dynamic(() => import('./SearchModal')),
  notification: dynamic(() => import('./NotificationModal')),
  verify: dynamic(() => import('./VerifyModal')),
  crypto: dynamic(() => import('./CryptoModal')),
  paymentDetails: dynamic(() => import('./PaymentDetailsModal')),
  cryptoDeposit: dynamic(() => import('./CryptoDepositModal')),
}
