export const NAVIGATION = {
  home: {
    text: 'navigation.home',
    icon: 'icon-navigation-home',
    url: '/',
  },
  games_hall: {
    text: 'navigation.games_hall',
    url: '/games',
  },
  tournament: {
    text: 'navigation.tournaments',
    icon: 'icon-games-trophy',
    url: '/tournaments',
  },
  quests: {
    text: 'navigation.quests',
    icon: 'icon-commerce-payment-summary',
    url: '/quests',
  },
  jackpots: {
    text: 'navigation.jackpots',
    icon: 'icon-games-jackpot-hub',
    url: '/jackpots',
  },
  wheels_of_fortune: {
    text: 'navigation.wheels_of_fortune',
    icon: 'icon-games-spinner',
    url: '/wheel-of-fortune',
  },
  promotions: {
    text: 'navigation.promo',
    icon: 'icon-commerce-gift',
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
    icon: 'icon-navigation-home',
    url: '/info',
  },
  not_found: {
    text: 'navigation.not_found',
    url: '/not-found',
  },
  invite_friends: {
    text: 'navigation.invite_friends',
    icon: 'icon-human-user-add',
    url: '/invite-friends',
  },
  password_recovery: {
    text: 'navigation.password_recovery',
    url: '/password-recovery',
  },
}

export const ROUTES_USER = {
  account: {
    text: 'navigation.account',
    icon: 'icon-human-user',
    url: '/account',
  },
  wallet: {
    text: 'navigation.wallet',
    icon: 'icon-commerce-wallet',
    url: '/account/wallet',
  },
  profile: {
    text: 'navigation.profile',
    icon: 'icon-human-user-id',
    url: '/account/profile',
  },
  history: {
    text: 'navigation.history',
    icon: 'icon-commerce-transactions',
    url: '/account/history',
  },
  bonuses: {
    text: 'navigation.bonus',
    icon: 'icon-commerce-bonus',
    url: '/account/bonuses',
  },
  favourites: {
    text: 'navigation.favorites',
    icon: 'icon-toggle-favorite-filled',
    url: '/account/favorites',
  },
  promocode: {
    text: 'navigation.promocode',
    icon: 'icon-actions-scan',
    url: '/account/promocode',
  },
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
