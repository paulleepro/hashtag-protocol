export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'hashtag-dapp-nuxt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'An experimental content tagging protocol for the decentralized internet.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/theme',
    '~/assets/css/variables',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '~/plugins/buefy.js', mode: 'client'},
    {src: '~/plugins/filters.js', mode: 'client'},
    {src: '~/plugins/vue-apollo.js', mode: 'client'},
    {src: '~/plugins/vue-axios.js', mode: 'client'},
    {src: '~/plugins/vue-gtm.js', mode: 'client'},
    {src: '~/plugins/vue-moment.js', mode: 'client'},
    {src: '~/plugins/vue-screen.js', mode: 'client'},
    {src: '~/plugins/index.js', mode: 'client'},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    'nuxt-buefy',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  env: {
    hashtagSubgraphUrl: process.env.NUXT_ENV_HASHTAG_SUBGRAPH_URL,
    topNftsSubgraphUrl: process.env.NUXT_ENV_TOP_NFTS_SUBGRAPH_URL,
    publisherAddress: process.env.NUXT_ENV_PUBLISHER_ADDRESS,
    blocknativeApiKey: process.env.NUXT_ENV_BLOCKNATIVE_API_KEY,
    onboardNetworkId: process.env.NUXT_ENV_ONBOARD_NETWORK_ID,
    discordServer: process.env.NUXT_ENV_DISCORD_SERVER,
    localstorageWalletKey: process.env.NUXT_ENV_ONBOARD_LOCALSTORAGE_WALLET_KEY
  }
}
