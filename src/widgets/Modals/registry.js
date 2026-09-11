export const MODAL_REGISTRY = {
  age: () => import('./AgeModal'),
  game: () => import('./GameModal'),
  login: () => import('./LoginModal'),
  recovery: () => import('./RecoveryModal'),
  quest: () => import('./QuestModal'),
  search: () => import('./SearchModal'),
  notification: () => import('./NotificationModal'),
  verify: () => import('./VerifyModal'),
  crypto: () => import('./CryptoModal'),
  paymentDetails: () => import('./PaymentDetailsModal'),
  cryptoDeposit: () => import('./CryptoDepositModal'),
}
