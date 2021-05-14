import Vue from "vue";

// import AppConfig from "@/appconfig";
import VueApollo from "vue-apollo";
import ApolloClient from "apollo-boost";

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