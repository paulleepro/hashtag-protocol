<template>
  <section>
    <b-field>
      <b-autocomplete
        v-model="tagForm.nftName"
        placeholder='Search NFTs by name; eg "Dog"'
        icon="magnify"
        field="name"
        size="is-medium"
        :loading="isFetching"
        @select="onNftSelected"
        @typing="getAsyncData"
        :data="nameContains"
      >
        <template slot-scope="props">
          <div class="media">
            <div class="media-left">
              <img :src="props.option.metadataImageURI" width="32" />
            </div>
            <div class="media-content">
              {{ props.option.metadataName }}
              <br />
              <small
                >{{ props.option.contractName }}
                <b>{{ props.option.tokenId }}</b>
              </small>
            </div>
          </div>
        </template>
      </b-autocomplete>
    </b-field>
    <b-modal
      :active.sync="isTagModalActive"
      :width="720"
      scroll="keep"
      @close="resetModalForm"
    >
      <div class="modal-card markdown-modal tag-and-mint">
        <section class="modal-card-body">
          <div class="tile">
            <div class="tile is-5">
              <!-- 1/3 -->
              <div class="card">
                <div class="card-image">
                  <figure class="image">
                    <img
                      v-if="modalForm.nft"
                      :src="modalForm.nft.metadataImageURI"
                      alt="Image"
                    />
                  </figure>
                </div>
                <div class="card-content">
                  <span
                    class="has-text-weight-bold is-size-6 is-block"
                    v-if="modalForm.nft"
                    >{{ modalForm.nft.metadataName }}</span
                  >
                  <Span class="is-size-7 is-block">Known Origin</Span>
                </div>
              </div>
            </div>
            <div class="tile">
              <div class="content form-wrapper">
                <h2 class="is-title is-size-4 is-block">Tag this asset</h2>
                <p class="is-block is-size-6">
                  Choose a HASHTAG to describe this digital asset.
                </p>

                <form>
                  <div class="field">
                    <div class="control">
                      <b-taginput
                        v-model="modalForm.hashtag"
                        :data="hashtagInputTags"
                        autocomplete
                        :allow-new="true"
                        maxtags="1"
                        :has-counter="false"
                        field="name"
                        ref="tagginginput"
                        icon="pound"
                        placeholder="Enter a hashtag"
                        @typing="getFilteredTags"
                        @add="tagAssetValidation"
                        :before-adding="validateTag"
                      >
                        <template slot-scope="props">
                          <b-taglist attached>
                            <b-tag type="is-primary" size="is-medium"
                              >{{ props.option.displayHashtag }}
                            </b-tag>
                            <b-tag type="is-dark" size="is-medium"
                              >{{ props.option.tagCount }}
                            </b-tag>
                          </b-taglist>
                        </template>
                        <template slot="empty">
                          New HASHTAG! Press enter to to mint and tag...
                        </template>
                        <template slot="selected" slot-scope="props">
                          <div v-bind:class="{ box: isTaggable }">
                            <b-tag
                              v-for="(tag, index) in props.tags"
                              :key="index"
                              :tabstop="false"
                              ellipsis
                              attached
                              type="is-primary"
                              size="is-medium"
                              closable
                              close-type="is-dark"
                              @close="
                                $refs.tagginginput.removeTag(index, $event)
                              "
                            >
                              <div v-if="tag.displayHashtag">
                                {{ tag.displayHashtag }}
                              </div>
                              <div v-else>#{{ tag }}</div>
                            </b-tag>
                            <div class="field">
                              <div class="control">
                                <b-button
                                  type="is-primary"
                                  class="is-outlined"
                                  @click="tagNft()"
                                  :disabled="!isTaggable"
                                  v-bind:class="{
                                    'is-hidden': !isTaggable,
                                  }"
                                  >Tag asset
                                </b-button>
                              </div>
                            </div>
                          </div>
                        </template>
                      </b-taginput>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </b-modal>
  </section>
</template>
<script>
import {
  SNAPSHOT,
  FIRST_THOUSAND_HASHTAGS,
  NFTS_ASSETS_NAME_CONTAINS,
} from "@/queries";
import { mapGetters } from "vuex";
import HashtagValidationService from "@/services/HashtagValidationService";
import debounce from "lodash/debounce";

export default {
  name: "Hashtags",
  data() {
    return {
      isTagModalActive: false,
      isCustom: false,
      modalForm: {
        hashtag: null,
        nft: null,
        nftName: null,
        mintAndTag: false,
      },
      hashtagInput: null,
      hashtagInputTags: [],
      nameContains: [],
      isFetching: false,
      tagForm: {
        hashtag: null,
        nft: null,
        nftName: null,
      },
    };
  },
  computed: {
    ...mapGetters(["supportedNfts", "nftAssetCache"]),
    isTaggable() {
      return (
        this.modalForm.nftName &&
        this.modalForm.nftName.length > 0 &&
        this.modalForm.hashtag &&
        this.modalForm.hashtag.length > 0
      );
    },
  },
  apollo: {
    hashtags: {
      query: FIRST_THOUSAND_HASHTAGS,
      pollInterval: 1000, // ms
    },
    publishers: {
      query: SNAPSHOT,
      pollInterval: 1000, // ms
    },
    owners: {
      query: SNAPSHOT,
      pollInterval: 1000, // ms
    },
    tags: {
      query: SNAPSHOT,
      pollInterval: 1000, // ms
    },
    popular: {
      query: SNAPSHOT,
      pollInterval: 1000, // ms
    },
    platform: {
      query: SNAPSHOT,
      pollInterval: 1000, // ms
    },
    taggers: {
      query: SNAPSHOT,
      pollInterval: 1000, // ms
    },
  },
  methods: {
    getAsyncData: debounce(async function (name) {
      if (!name.length) {
        this.nameContains = [];
        return;
      }

      const { data } = await this.$apollo.query({
        query: NFTS_ASSETS_NAME_CONTAINS,
        client: "nftsClient",
        variables: {
          first: 100,
          name: name,
        },
      });

      this.nameContains = data.nameContains;
    }, 300),
    async tagNft() {
      if (this.modalForm.mintAndTag) {
        await this.$store.dispatch("mintAndTag", {
          hashtag: this.modalForm.hashtag[0],
          nftContract: this.modalForm.nft.contractAddress,
          nftId: this.modalForm.nft.tokenId,
        });
      } else {
        const hashtag = this.modalForm.hashtag[0];
        let hashtagValue = hashtag && hashtag.name ? hashtag.name : hashtag;
        if (hashtagValue.charAt(0) !== "#") {
          hashtagValue = `#${hashtagValue}`;
        }

        const hashtags = this.hashtags || [];
        const findExistingHashtagResult = hashtags.filter(
          (tag) => tag.name.toLowerCase() === hashtagValue.toLowerCase()
        );

        await this.$store.dispatch("tag", {
          hashtagId: findExistingHashtagResult[0].id,
          nftContract: this.modalForm.nft.contractAddress,
          nftId: this.modalForm.nft.tokenId,
        });
      }

      this.resetModalForm();
      this.isTagModalActive = false;
    },
    getFilteredTags: function (text) {
      const hashtags = this.hashtags || [];
      this.hashtagInputTags = hashtags.filter(
        (tag) => `${tag.name.toLowerCase()}`.indexOf(text.toLowerCase()) === 1
      );
    },
    isNewTag: function () {
      if (
        this.hashtagInput &&
        Array.isArray(this.hashtagInput) &&
        (typeof this.hashtagInput[0] === "string" ||
          this.hashtagInput[0] instanceof String)
      ) {
        return (
          (this.hashtags || []).filter((option) => {
            return (
              option.name
                .toLowerCase()
                .indexOf("#" + this.hashtagInput[0].toLowerCase()) >= 0
            );
          }).length === 0
        );
      }
      return false;
    },
    mintHashtag() {
      this.$store.dispatch("mint", `#${this.hashtagInput[0]}`);
    },
    onNftSelected(nft) {
      this.modalForm.nft = nft;
      this.modalForm.nftName = nft.metadataName;
      this.isTagModalActive = true;
    },
    resetModalForm() {
      this.modalForm = {
        hashtag: null,
        nft: null,
        nftName: null,
      };
    },
    validateTag(hashtag) {
      return this.hashtagValidationService.validateTag(hashtag);
    },
    tagAssetValidation(hashtag) {
      const tagContentValid = this.validateTag(hashtag);
      if (tagContentValid) {
        const hashtagValue =
          this.modalForm.hashtag[0] && this.modalForm.hashtag[0].name
            ? this.modalForm.hashtag[0].name
            : this.modalForm.hashtag[0];

        const isNewHashtag =
          (this.hashtagInputTags || []).filter((option) => {
            return (
              option.name.toLowerCase().indexOf(hashtagValue.toLowerCase()) >= 0
            );
          }).length === 0;

        this.modalForm.mintAndTag = isNewHashtag;
      }
    },
  },
  created() {
    this.hashtagValidationService = new HashtagValidationService(
      this.$buefy.toast
    );
  },
};
</script>
<style lang="scss" scoped>
.tag-and-mint {
  .form-wrapper {
    padding: 1rem;
  }
}
</style>
