import { ROUTES_USER } from '@/constant/config'

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/*/account',
          '/*/account/*',
          `*${ROUTES_USER.account.url}`,
          `*${ROUTES_USER.account.url}/*`,
          `/*${ROUTES_USER.verification.url}`,
          `/*${ROUTES_USER.invite_friends.url}`,
        ],
      },
    ],
    sitemap: `${process.env.BASE_URL}/sitemap.xml`,
  }
}
