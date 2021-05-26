export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'dapp-nuxt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href:"https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"},
      { rel: 'stylesheet', href:"https://cdn.materialdesignicons.com/5.4.55/css/materialdesignicons.min.css"}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/global-mixin.client',
    '~/plugins/vue-axios',
    '~/plugins/vue-buefy',
    '~/plugins/vue-filter',
    '~/plugins/vue-moment',
    '~/plugins/vue-screen',
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
    '@nuxtjs/apollo',
    '@nuxtjs/gtm',
    '@nuxtjs/style-resources',
  ],
  styleResources: {
    scss: [
      '~/assets/css/*.scss',
    ]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  env: {
    hashtagSubgraph: process.env.VUE_APP_HASHTAG_SUBGRAPH_URL || 'https://api.thegraph.com/subgraphs/name/hashtag-protocol/hashtag-rinkeby',
    nftSearchSubgraph: process.env.VUE_APP_TOP_NFTS_SUBGRAPH_URL || 'https://api.thegraph.com/subgraphs/name/blockrockettech/nft-tokens',
    blocknativeApiKey: process.env.VUE_APP_BLOCKNATIVE_API_KEY || '',
    onboardNetworkID: process.env.VUE_APP_ONBOARD_NETWORK_ID,
    publisherWalletAddress: process.env.VUE_APP_PUBLISHER_ADDRESS || '0xD677AEd0965AC9B54e709F01A99cEcA205aebC4B',
    localstorageWalletKey: process.env.VUE_APP_ONBOARD_LOCALSTORAGE_WALLET_KEY || 'HashtagSelectedWallet',
    discordServer: process.env.VUE_APP_DISCORD_SERVER || 'http://localhost:8080/'
  },

  gtm: {
    id: 'GTM-MRK383F',
    enabled: true,
    debug: true,
    pageTracking: true,
  },

  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: process.env.VUE_APP_HASHTAG_SUBGRAPH_URL || 'https://api.thegraph.com/subgraphs/name/hashtag-protocol/hashtag-rinkeby',
      },
      hashtagClient: {
        httpEndpoint: process.env.VUE_APP_HASHTAG_SUBGRAPH_URL || 'https://api.thegraph.com/subgraphs/name/hashtag-protocol/hashtag-rinkeby',
        nftsClient: process.env.VUE_APP_TOP_NFTS_SUBGRAPH_URL || 'https://api.thegraph.com/subgraphs/name/blockrockettech/nft-tokens',
      }
    }
  },
}
