// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/google-fonts'],
  ssr: false,
  runtimeConfig: {
    public: {
      line: {
        authUrl: process.env.LINE_AUTH_URL
      },
      discord: {
        authUrl: process.env.DISCORD_AUTH_URL
      }
    },
    line: {
      clientID: process.env.LINE_CLIENT_ID,
      callbackURI: process.env.LINE_CALLBACK_URI,
      clientSecret: process.env.LINE_CLIENT_SECRET
    },
    firebase_admin: {
      certPath: process.env.FIREBASE_ADMIN_CERT_PATH
    },
    jwt: {
      secret: process.env.JWT_SECRET
    },
    discord: {
      botToken: process.env.DISCORD_BOT_TOKEN,
      clientID: process.env.DISCORD_CLIENT_ID,
      callbackURI: process.env.DISCORD_CALLBACK_URI,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      guildID: process.env.DISCORD_GUILD_ID,
      memberRoleID: process.env.DISCORD_MEMBER_ROLE_ID
    }
  },
  // configure meta
  app: {
    head: {
      title: 'Lumos メンバー管理ページ',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Lumos メンバー管理ページ' }
      ]
    }
  },
  googleFonts: {
    families: {
      'Zen Kaku Gothic New': {
        wght: [400, 500, 600, 700]
      }
    }
  }
})
