<template>
  <div class="nowrap inline">
    <b-tooltip
      position="is-right"
      :active="active"
      :auto-close="['outside', 'escape']"
      :triggers="['click']"
      type="is-light"
      size="is-large"
      multilined
    >
      <template v-slot:content>
        <b-loading v-model="isLoading" :can-cancel="true"></b-loading>
        <div class="card">
          <div class="card-image">
            <figure class="image is-square">
              <video
                class="has-ratio"
                v-if="tag.video"
                autoplay=""
                controls=""
                controlslist="nodownload"
                loop=""
                playsinline=""
                poster=""
                preload="metadata"
                muted=""
              >
                <source :src="tag.metadataImageURI" @error="setPendingImage" type="video/mp4" />
              </video>
              <img
                class="auto-size-image"
                v-else
                :src="tag.metadataImageURI"
                @error="setPendingImage"
                :alt="tag.nftName"
              />
            </figure>
          </div>
          <div class="card-content">
            <h2 class="title is-5">
              <div class="text-overflow">{{ tag.nftName }}</div>
            </h2>
            <div class="b-table">
              <div class="table-wrapper">
                <table class="table has-text-left is-size-6">
                  <tbody>
                    <tr draggable="false" class="">
                      <td class="has-text-weight-bold">Type</td>
                      <td>ERC721 NFT</td>
                    </tr>
                    <tr draggable="false" class="">
                      <td class="has-text-weight-bold">Chain</td>
                      <td>
                        {{ tag.chainName }}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p class="mt-4 is-size-6">
                  <nuxt-link
                    :to="{
                      name: 'type-contract-id',
                      params: {
                        type: 'nft',
                        contract: tag.nftContract,
                        id: tag.nftId,
                      },
                    }"
                    >See more details</nuxt-link
                  >
                  <b-icon icon="arrow-right" type="is-dark" size="is-small"></b-icon>
                </p>
              </div>
            </div>
          </div>
        </div>
      </template>
      <button @click="dataLens()" class="button is-small is-light mr-2">
        <span class="icon is-small">
          <i class="mdi mdi-dark mdi-18px mdi-eye"></i>
        </span>
      </button>
    </b-tooltip>
    <nuxt-link
      :to="{
        name: 'type-contract-id',
        params: {
          type: 'nft',
          contract: this.tag.nftContract,
          id: this.tag.nftId,
        },
      }"
    >
      ERC721 NFT
    </nuxt-link>
  </div>
</template>
<script>
import axios from "axios";
import onBoardChainMap from "~/data/onBoardChainMap";
export default {
  name: "TargetLink",
  props: {
    tagData: Object,
  },
  data() {
    return {
      active: false,
      isLoading: false,
      tag: this.tagData,
    };
  },
  methods: {
    dataLens: async function () {
      this.active = !this.active;
      this.nftInfo = [];
      this.isLoading = true;
      const headers = {
        Authorization: this.$config.nftPortAPIKey,
      };
      if (this.active) {
        axios
          .get("https://api.nftport.xyz/nfts/" + this.tag.nftContract + "/" + this.tag.nftId, {
            params: {
              chain: onBoardChainMap[this.tag.nftChainId].machineName,
              page_number: 1,
              page_size: 50,
            },
            headers: headers,
          })
          .then((response) => {
            if (response.data.response == "OK") {
              console.log(response.data.nft);
              this.tag.nftName = response.data.nft.metadata.name;
              this.tag.chainName = onBoardChainMap[this.tag.nftChainId].name;
              // nft.data.nft.timestamp = config.tagInfo.timestamp;
              // nft.data.nft.hashtagDisplayHashtag = config.tagInfo.hashtagDisplayHashtag;
              // nft.data.nft.publisher = config.tagInfo.publisher;
              // nft.data.nft.tagger = config.tagInfo.tagger;
              // nft.data.nft.nftContract = nft.data.nft.contract_address;
              // nft.data.nft.nftChain = nft.config.params.chain;
              //let res = response.data.nft.cached_image_url.split("//");
              //if (res[0] == "ipfs:") {
              //  this.tag.image_url = "https://ipfs.io/" + res[1];
              //}
              this.tag.metadataImageURI = response.data.nft.cached_image_url;
              this.tag.video = false;
              if (this.tag.metadataImageURI.includes("mp4")) {
                this.tag.video = true;
              }
              this.isLoading = false;
            } else {
              this.isLoading = false;
            }
          });
      }
    },
  },
  computed: {
    tagInfoPrint() {
      return this.tagInfo.nftName;
    },
    targetChainLabel() {
      return onBoardChainMap[this.tag.nftChainId].name;
    },
  },
};
</script>
<style lang="scss" scoped>
.inline {
  display: flex;
  align-items: center;
}
</style>
