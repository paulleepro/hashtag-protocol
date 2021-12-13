<template>
  <div>
    <section class="main">
      <div class="container">
        <span class="is-pulled-right is-size-6 has-text-weight-bold">
          <nuxt-link :to="{ name: 'index' }">Dashboard</nuxt-link>&nbsp;
          <b-icon icon="arrow-up" type="is-dark" size="is-small"></b-icon>
        </span>
        <h1 class="title is-1">Tagged assets</h1>
        <div class="columns is-tablet is-centered">
          <div class="column is-12">
            <article class="is-white box">
              <h2 class="title is-4 is-spaced"></h2>
              <div class="b-table">
                <div class="table-wrapper has-mobile-cards">
                  <table tabindex="0" class="table is-hoverable">
                    <thead>
                      <tr>
                        <th>
                          <div class="th-wrap">Target</div>
                        </th>
                        <th>
                          <div class="th-wrap">Tag</div>
                        </th>
                        <th>
                          <div class="th-wrap">Txn hash</div>
                        </th>
                        <th>
                          <div class="th-wrap">Age</div>
                        </th>

                        <th>
                          <div class="th-wrap">Tagger</div>
                        </th>
                        <th>
                          <div class="th-wrap">Publisher</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody v-if="pagedTags">
                      <tr draggable="false" v-for="tag in pagedTags" v-bind:key="tag.id">
                        <td data-label="Target">
                          <target-link :tagData="tag" />
                        </td>
                        <td data-label="Hashtag">
                          <hashtag :value="tag.hashtagDisplayHashtag"></hashtag>
                        </td>
                        <td data-label="Txn hash">
                          <txn-link :txnHash="tag.transaction" :chainId="tag.nftChainId" />
                        </td>
                        <td data-label="Tagging date">
                          <timestamp-from :value="tag.timestamp" class="nowrap"></timestamp-from>
                        </td>

                        <td data-label="Tagger">
                          <eth-account :value="tag.tagger" route="tagger-address"></eth-account>
                        </td>
                        <td data-label="Publisher">
                          <eth-account :value="tag.publisher" route="publisher-address"></eth-account>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <Pagination :entity-count="tagsCount" :page-size="pageSize" @tabSelected="tabSelected" />
            </article>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import EthAccount from "~/components/EthAccount";
import Hashtag from "~/components/Hashtag";
import TxnLink from "~/components/TxnLink";
import TargetLink from "~/components/TargetLink";
import Pagination from "~/components/Pagination";
import TimestampFrom from "~/components/TimestampFrom";
import { PAGED_TAGS, ALL_TAG_IDS } from "~/apollo/queries";
import onBoardChainMap from "~/data/onBoardChainMap";

const PAGE_SIZE = 20;

export default {
  name: "Nfts",
  components: {
    EthAccount,
    Hashtag,
    TxnLink,
    Pagination,
    TimestampFrom,
  },
  data() {
    return {
      pageSize: PAGE_SIZE,
      first: PAGE_SIZE,
      skip: 0,
      tagsCount: 0,
      pagedTags: null,
    };
  },
  apollo: {
    pagedTags: {
      query: PAGED_TAGS,
      variables() {
        return {
          first: this.first,
          skip: this.skip,
        };
      },
    },
    tagsCount: {
      query: ALL_TAG_IDS,
      manual: true,
      result({ data }) {
        this.tagsCount = data.tags.length;
      },
    },
  },
  methods: {
    chainName(chainId) {
      return onBoardChainMap[chainId].explorerName;
    },
    tabSelected(id) {
      this.skip = id * PAGE_SIZE;
      console.log(this.pagedTags);
    },
    // pullTagsFromAPI: async function () {
    //   let taggedData = await this.$apollo.queries.pagedTags.refetch();
    //   taggedData = taggedData.data.pagedTags;
    //   const promises = [];
    //   const headers = {
    //     Authorization: this.$config.nftPortAPIKey,
    //   };
    //   taggedData.forEach((nft) => {
    //     let chain = "";
    //     if (nft.nftChainId === "1") {
    //       chain = "ethereum";
    //     } else if (nft.nftChainId === "137") {
    //       chain = "polygon";
    //     }
    //     promises.push(
    //       axios.get("https://api.nftport.xyz/nfts/" + nft.nftContract + "/" + nft.nftId, {
    //         params: {
    //           chain: chain,
    //           page_number: 1,
    //           page_size: 50,
    //         },
    //         data: {
    //           tagInfo: nft,
    //         },
    //         headers: headers,
    //       }),
    //     );
    //   });
    //   await axios.all(promises).then((response) => {
    //     let nftData = [];
    //     let count = 0;
    //     response.forEach((nft) => {
    //       if (nft.data.response == "OK") {
    //         const config = JSON.parse(nft.config.data);
    //         nft.data.nft.nftId = nft.data.nft.token_id;
    //         nft.data.nft.nftName = nft.data.nft.metadata.name;
    //         nft.data.nft.timestamp = config.tagInfo.timestamp;
    //         nft.data.nft.hashtagDisplayHashtag = config.tagInfo.hashtagDisplayHashtag;
    //         nft.data.nft.publisher = config.tagInfo.publisher;
    //         nft.data.nft.tagger = config.tagInfo.tagger;
    //         nft.data.nft.nftContract = nft.data.nft.contract_address;
    //         nft.data.nft.nftChain = nft.config.params.chain;
    //         let res = nft.data.nft.cached_image_url.split("//");
    //         if (res[0] == "ipfs:") {
    //           nft.data.nft.image_url = "https://ipfs.io/" + res[1];
    //         }
    //         nft.data.nft.nftImage = nft.data.nft.cached_image_url;
    //         nft.data.nft.id = count;
    //         count++;
    //         nftData.push(nft.data.nft);
    //       }
    //     });
    //     this.nftInfo = nftData;
    //   });
    // },
  },
};
</script>

<style lang="scss"></style>
