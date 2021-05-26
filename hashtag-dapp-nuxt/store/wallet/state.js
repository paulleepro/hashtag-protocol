export default () => ({
  address: null,
  networkId: null,
  balance: null,
  wallet: {},
  web3Objects: {},
  fees: {
    protocol: 0,
    // @ todo: pull fee from contract.
    tagging: null,
    mintAndTag: null,
  },
  accrued: null,
  openModalCloseFn: () => {},
})