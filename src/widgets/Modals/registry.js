export const MODAL_REGISTRY = {
  age: () => import('./AgeModal'),
  game: () => import('./GameModal'),
  login: () => import('./LoginModal'),
  email: () => import('./EmailModal'),
  recovery: () => import('./RecoveryModal'),
  quest: () => import('./QuestModal'),
  search: () => import('./SearchModal'),
  notification: () => import('./NotificationModal'),
  verify: () => import('./VerifyModal'),
  crypto: () => import('./CryptoModal'),
  paymentDetails: () => import('./PaymentDetailsModal'),
  deposit: () => import('./DepositModal'),
}
