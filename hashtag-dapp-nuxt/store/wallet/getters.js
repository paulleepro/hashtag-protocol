import onBoardChainMap from "~/data/onBoardChainMap";

export default {
  homesteadProvider: (state) => state.web3Objects.homesteadProvider,
  accrued: (state) => state.accrued,
  address: (state) => state.address,
  networkId: (state) => state.networkId,
  networkInfo: (state) => {
    return onBoardChainMap[state.networkId];
  },
  balance: (state) => state.balance,
  wallet: (state) => state.wallet,
}