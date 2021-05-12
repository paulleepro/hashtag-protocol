import Vue from "vue";

// import AppConfig from "@/appconfig";
import Buefy from "buefy";
import VueMoment from "vue-moment";
import VueAxios from "vue-axios";
import VueApollo from "vue-apollo";
import axios from "axios";
import VueScreen from "vue-screen";
import ApolloClient from "apollo-boost";
import VueGtm from "vue-gtm";

// Vue.use(AppConfig);
Vue.use(Buefy);
Vue.use(VueMoment);
Vue.use(VueAxios, axios);
Vue.use(VueScreen, "bulma");

const hashtagClient = new ApolloClient({
  uri: process.env.hashtagSubgraphUrl,
});

const nftsClient = new ApolloClient({
  uri: process.env.topNftsSubgraphUrl,
});

const apolloProvider = new VueApollo({
  clients: {
    hashtagClient,
    nftsClient,
  },

  defaultClient: hashtagClient,
});

Vue.use(VueApollo);
Vue.config.productionTip = false;

Vue.filter("toDp", function (value) {
  if (!value) return value;
  return parseFloat(value).toFixed(4);
});

Vue.filter("shortEth", function (value) {
  if (!value) return value;

  return `
  ${value.substr(0, 6)}...${value.substr(value.length - 4, value.length)}
  `;
});

Vue.filter("toEth", function (value, decimals = null) {
  if (!value) return value;
  if (decimals) {
    let ether = Number(
      ethers.utils.formatEther(ethers.utils.bigNumberify(value))
    );
    return ether.toFixed(decimals);
  }
  return ethers.utils.formatEther(ethers.utils.bigNumberify(value));
});

Vue.use(VueGtm, {
  id: "GTM-MRK383F", // Your GTM single container ID or array of container ids ['GTM-xxxxxx', 'GTM-yyyyyy'] or array of objects [{id: 'GTM-xxxxxx', queryPararms: { gtm_auth: 'abc123', gtm_preview: 'env-4', gtm_cookies_win: 'x'}}, {id: 'GTM-yyyyyy', queryParams: {gtm_auth: 'abc234', gtm_preview: 'env-5', gtm_cookies_win: 'x'}}]
  defer: false, // defaults to false. Script can be set to `defer` to increase page-load-time at the cost of less accurate results (in case visitor leaves before script is loaded, which is unlikely but possible)
  enabled: true, // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
  debug: true, // Whether or not display console logs debugs (optional)
  loadScript: true, // Whether or not to load the GTM Script (Helpful if you are including GTM manually, but need the dataLayer functionality in your components) (optional)
  vueRouter: router, // Pass the router instance to automatically sync with router (optional)
  // ignoredViews: ["homepage"], // Don't trigger events for specified router names (case insensitive) (optional)
  trackOnNextTick: false, // Whether or not call trackView in Vue.nextTick
});