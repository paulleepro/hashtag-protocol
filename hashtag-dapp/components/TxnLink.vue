<template>
  <span class="nowrap">
    <b-tooltip position="is-top" type="is-dark" multilined>
      <template v-slot:content>
        View transaction on <b>{{ label }}</b>
      </template>
      <a :href="this.txnUrl" target="_blank">
        {{ txnHash | shortTxn }}
      </a>
    </b-tooltip>
  </span>
</template>

<script>
import onBoardChainMap from "~/data/onBoardChainMap";
export default {
  name: "TxnLink",
  props: {
    txnHash: String,
    chainId: String,
  },
  //data() {
  //  return {
  //    txnUrl: "",
  //    label: "",
  //  };
  //},
  computed: {
    // Here we make link and label to the scanner based on app network Id.
    txnUrl() {
      return `${onBoardChainMap[this.$config.onboardNetworkID].url}/tx/${this.txnHash}`;
    },
    label() {
      return onBoardChainMap[this.$config.onboardNetworkID].explorerName;
    },
  },
};
</script>
