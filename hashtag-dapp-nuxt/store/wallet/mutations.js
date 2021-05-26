import Vue from "vue";

export default {
  async setProtocolFee(state, fee) {
    //Vue.set(state, "fees.platform", fee);
    state.fees.platform = fee;
  },

  async setTaggingFee(state, fee) {
    //Vue.set(state, "fees.tagging", fee);
    state.fees.tagging = fee;
  },

  async setMintAndTagFee(state, fee) {
    //Vue.set(state, "fees.mintAndTag", fee);
    state.fees.mintAndTag = fee;
  },

  setWeb3Objects(state, payload) {
    Vue.set(state, "web3Objects", payload);
  },

  setAccrued(state, accrued) {
    Vue.set(state, "accrued", accrued);
  },

  setOpenModalCloseFn(state, openModalCloseFn) {
    Vue.set(state, "openModalCloseFn", openModalCloseFn);
  },

  setWalletAddress(state, address) {
    Vue.set(state, "address", address);
  },

  setWalletNetworkId(state, networkId) {
    Vue.set(state, "networkId", networkId);
  },

  setWalletBalance(state, balance) {
    Vue.set(state, "balance", balance);
  },

  setWallet(state, wallet) {
    Vue.set(state, "wallet", wallet);
  },

  setProvider(state, provider) {
    Vue.set(state, "provider", provider);
  },
}