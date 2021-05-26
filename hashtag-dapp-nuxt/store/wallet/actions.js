import { ethers } from "ethers";
import Onboard from "bnc-onboard";
import BlocknativeSdk from "bnc-sdk";
import { ToastProgrammatic as Toast } from "buefy";
import HashtagProtocolTruffleConf from "~/truffleconf/HashtagProtocol";
import ERC721HashtagRegistry from "~/truffleconf/ERC721HashtagRegistry";
import utils from "~/utils";
import eventMap from "~/data/blocknativeEventMap";

let provider;
let onboard = {};
let blocknative = {};

const localstorageWalletKey = process.env.localstorageWalletKey;

export default {
  async initOnboard({ dispatch, commit }) {
    // Initialize onboard.
    onboard = Onboard({
      dappId: process.env.blocknativeApiKey,
      networkId: process.env.onboardNetworkID,
      subscriptions: {
        address: (address) => {
          commit("setWalletAddress", address);
        },
        network: (networkId) => {
          commit("setWalletNetworkId", networkId);
        },
        balance: (balance) => {
          commit("setWalletBalance", balance);
        },
        wallet: (wallet) => {
          dispatch("setWallet", wallet);
        },
      },
      walletSelect: {
        heading: "Connect wallet",
        description: " ",
      },
    });

    // Initialize blocknative SDK for mempool notifications.
    blocknative = new BlocknativeSdk({
      dappId: process.env.blocknativeApiKey,
      networkId: process.env.onboardNetworkID,
    });

    dispatch("reconnectWallet");
  },

  async initProtocol({ state, commit, dispatch }) {
    const signer = provider.getSigner();
    const chain = state.networkId;

    const hashtagProtocolContractAddress = utils.getContractAddressFromTruffleConf(
      HashtagProtocolTruffleConf,
      chain
    );

    const hashtagProtocolContract = new ethers.Contract(
      hashtagProtocolContractAddress,
      HashtagProtocolTruffleConf.abi,
      signer
    );

    const erc721HashtagRegistryAddress = utils.getContractAddressFromTruffleConf(
      ERC721HashtagRegistry,
      chain
    );

    const erc721HashtagRegistryContract = new ethers.Contract(
      erc721HashtagRegistryAddress,
      ERC721HashtagRegistry.abi,
      signer
    );

    commit("setWeb3Objects", {
      provider,
      homesteadProvider: ethers.getDefaultProvider("homestead"),
      signer: signer,
      contracts: {
        hashtagProtocolContract,
        erc721HashtagRegistryContract,
      },
      publisher: process.env.publisherWalletAddress,
    });

    dispatch("getTaggingFee");
    dispatch("getMintAndTagFee");
    dispatch("getAccruedEthFromRegistry");
  },

  setWallet({ commit }, wallet) {
    if (wallet.provider) {
      commit("setWallet", wallet);
      const ethersProvider = new ethers.providers.Web3Provider(wallet.provider);
      provider = ethersProvider;
      // store the selected wallet name to be retrieved next time the app loads.
      localStorage.setItem(localstorageWalletKey, wallet.name);
    } else {
      provider = null;
      commit("setWallet", {});
    }
  },

  // Called any time page is loaded. If a wallet
  // has been previously selected, it initializes
  // and checks the wallet.
  async reconnectWallet() {
    const previouslySelectedWallet = window.localStorage.getItem(
      localstorageWalletKey
    );
    if (!previouslySelectedWallet) {
      return false;
    }

    if (previouslySelectedWallet && onboard) {
      const walletSelected = await onboard.walletSelect(
        previouslySelectedWallet
      );
      return walletSelected;
    }
  },

  async connectWallet({ dispatch }) {
    if (!provider) {
      const walletSelected = await onboard.walletSelect();
      if (!walletSelected) {
        return false;
      }
    }

    const ready = await onboard.walletCheck();
    if (!ready) {
      dispatch("disconnectWallet");
    }
    return ready;
  },

  async changeWallet() {
    await onboard.walletSelect();
  },

  disconnectWallet({ state, commit }) {
    localStorage.removeItem(localstorageWalletKey);
    onboard.walletReset();
    state.openModalCloseFn();
    commit("setOpenModalCloseFn", () => {});
  },

  async readyToTransact({ dispatch }) {
    if (!provider) {
      const walletSelected = await onboard.walletSelect();
      if (!walletSelected) {
        return false;
      }
    }

    const ready = await onboard.walletCheck();
    if (!ready) {
      dispatch("disconnectWallet");
    }
    return ready;
  },

  captureOpenModalCloseFn({ commit }, openModalCloseFn) {
    commit("setOpenModalCloseFn", openModalCloseFn);
  },

  async mint({ state, dispatch }, payload) {
    const ready = await dispatch("readyToTransact");
    if (!ready) return;

    const { contracts, publisher } = state.web3Objects;
    const { hashtagProtocolContract } = contracts;

    const tx = await hashtagProtocolContract.mint(
      payload,
      publisher,
      state.address
    );

    const { emitter } = blocknative.transaction(tx.hash);

    emitter.on("all", (transaction) => {
      Toast.open({
        duration: 5000,
        message: eventMap[transaction.eventCode].msg,
        position: "is-bottom",
        type: eventMap[transaction.eventCode].type,
      });
    });
  },

  async tag({ state, dispatch }, payload) {
    const ready = await dispatch("readyToTransact");
    if (!ready) return;

    const { web3Objects, fees } = state;
    const { contracts, publisher } = web3Objects;
    const { erc721HashtagRegistryContract } = contracts;
    const { hashtagId, nftContract, nftId } = payload;

    // function tag(uint256 _hashtagId, address _nftContract, uint256 _nftId, address _publisher, address _tagger) payable public {
    const tx = await erc721HashtagRegistryContract.tag(
      hashtagId,
      nftContract,
      nftId,
      publisher,
      state.address,
      {
        value: ethers.utils.bigNumberify(fees.tagging),
      }
    );

    const { emitter } = blocknative.transaction(tx.hash);

    emitter.on("all", (transaction) => {
      Toast.open({
        duration: 5000,
        message: eventMap[transaction.eventCode].msg,
        position: "is-bottom",
        type: eventMap[transaction.eventCode].type,
      });
    });
  },

  async mintAndTag({ state, dispatch }, payload) {
    const ready = await dispatch("readyToTransact");
    if (!ready) return;

    const { web3Objects, fees } = state;
    const { contracts, publisher } = web3Objects;
    const { erc721HashtagRegistryContract } = contracts;
    const { hashtag, nftContract, nftId } = payload;

    const tx = await erc721HashtagRegistryContract.mintAndTag(
      hashtag.indexOf("#") === 0 ? hashtag : `#${hashtag}`,
      nftContract,
      nftId,
      publisher,
      state.address,
      {
        value: ethers.utils.bigNumberify(fees.tagging),
      }
    );

    const { emitter } = blocknative.transaction(tx.hash);

    emitter.on("all", (transaction) => {
      Toast.open({
        duration: 5000,
        message: eventMap[transaction.eventCode].msg,
        position: "is-bottom",
        type: eventMap[transaction.eventCode].type,
      });
    });
  },

  async getProtocolFee({ commit }) {
    commit("setProtocolFee", "0");
  },

  async getTaggingFee({ state, commit }) {
    const { erc721HashtagRegistryContract } = state.web3Objects.contracts;
    const fee = (await erc721HashtagRegistryContract.tagFee()).toString();
    commit("setTaggingFee", fee);
  },

  async getAccruedEthFromRegistry({ state, commit }) {
    const { contracts } = state.web3Objects;
    const { erc721HashtagRegistryContract } = contracts;
    const accrued = await erc721HashtagRegistryContract.totalDue(state.address);

    commit("setAccrued", accrued);
  },

  async getMintAndTagFee({ commit }) {
    const { erc721HashtagRegistryContract } = state.web3Objects.contracts;
    const fee = (await erc721HashtagRegistryContract.tagFee()).toString();

    commit("setMintAndTagFee", fee);
  },

  async drawDownFromRegistry({ state, dispatch, commit }) {
    const { contracts } = state.web3Objects;
    const { erc721HashtagRegistryContract } = contracts;
    const tx = await erc721HashtagRegistryContract.drawDown(state.address);

    const { emitter } = blocknative.transaction(tx.hash);

    emitter.on("all", function (transaction) {
      Toast.open({
        duration: 5000,
        message: eventMap[transaction.eventCode].msg,
        position: "is-bottom",
        type: eventMap[transaction.eventCode].type,
      });

      if (transaction.eventCode === "txConfirmed") {
        state.openModalCloseFn();
        dispatch("getAccruedEthFromRegistry");
        commit("setOpenModalCloseFn", () => {});
      }
    });
  },
}