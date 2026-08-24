export const NAVIGATION = {
  home: {
    text: 'navigation.home',
    icon: 'navigation-home',
    url: '/',
  },
  games_hall: {
    text: 'navigation.games_hall',
    url: '/games',
  },
  tournament: {
    text: 'navigation.tournaments',
    icon: 'games-trophy',
    url: '/tournaments',
  },
  quests: {
    text: 'navigation.quests',
    icon: 'commerce-payment-summary',
    url: '/quests',
  },
  jackpots: {
    text: 'navigation.jackpots',
    icon: 'games-jackpot-hub',
    url: '/jackpots',
  },
  wheels_of_fortune: {
    text: 'navigation.wheels_of_fortune',
    icon: 'games-spinner',
    url: '/wheel-of-fortune',
  },
  promotions: {
    text: 'navigation.promo',
    icon: 'commerce-gift',
    url: '/promotions',
  },
  providers: {
    text: 'navigation.providers',
    url: '/providers',
  },
  registration: {
    text: 'navigation.registration',
    url: '/registration',
  },
  game: {
    text: 'navigation.game',
    url: '/game',
  },
  login: {
    text: 'navigation.login',
    url: '/login',
  },
  info: {
    text: 'navigation.info',
    icon: 'navigation-home',
    url: '/info',
  },
  not_found: {
    text: 'navigation.not_found',
    url: '/not-found',
  },
  password_recovery: {
    text: 'navigation.password_recovery',
    url: '/password-recovery',
  }
}

export const ROUTES_USER = {
  account: {
    text: 'navigation.account',
    icon: 'human-user',
    url: '/account',
  },
  wallet: {
    text: 'navigation.wallet',
    icon: 'commerce-wallet',
    url: '/account/wallet',
  },
  profile: {
    text: 'navigation.profile',
    icon: 'human-user-id',
    url: '/account/profile',
  },
  history: {
    text: 'navigation.history',
    icon: 'commerce-transactions',
    url: '/account/history',
  },
  bonuses: {
    text: 'navigation.bonus',
    icon: 'commerce-bonus',
    url: '/account/bonuses',
  },
  favourites: {
    text: 'navigation.favorites',
    icon: 'toggle-favorite-filled',
    url: '/account/favorites',
  },
  promocode: {
    text: 'navigation.promocode',
    icon: 'actions-scan',
    url: '/account/promocode',
  },
  verification: {
    text: 'navigation.verification',
    icon: 'commerce-wallet',
    url: '/verification',
  },
  invite_friends: {
    text: 'navigation.invite_friends',
    icon: 'human-user-add',
    url: '/invite-friends',
  }
}

export const LIST_COUNT = 16

export const USER_VERIFY = {
  0: 'not',
  1: 'verification',
  2: 'rejected',
  3: 'verified',
}

export const TASK_STATUS = {
  0: 'new',
  1: 'done',
  2: 'pending',
  3: 'expired',
}

export const VOUCHER_STATUS = {
  0: 'new',
  1: 'paid',
  2: 'expired',
  3: 'cancelled'
}

export const BONUS_STATUS = {
  0: 'expired',
  1: 'finished',
  2: 'deactivated',
}

export const PAYMENT_TYPE = {
  0: 'deposit',
  1: 'withdrawal'
}

export const QUANTITY = [
  { value: 10, label: '10' },
  { value: 20, label: '20' },
  { value: 50, label: '50' },
  { value: 100, label: '100' },
]
