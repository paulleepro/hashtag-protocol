<template>
  <section class="hashtag-mint">
    <b-field v-if="hashtags">
      <b-taginput
        v-model="hashtagInput"
        :data="hashtagInputTags"
        attached
        autocomplete
        :allow-new="true"
        maxtags="1"
        field="name"
        ref="taginput"
        icon="pound"
        size="is-medium"
        :has-counter="false"
        placeholder="Enter hashtag"
        @typing="getFilteredTags"
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
          <span class="new-hashtag"
            >Unique HASHTAG! Press enter to continue...</span
          >
        </template>
        <template slot="selected" slot-scope="props">
          <div v-bind:class="{ box: isNewTag() }">
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
              @close="$refs.taginput.removeTag(index, $event)"
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
                  @click="mintHashtag()"
                  :disabled="!isNewTag()"
                  v-bind:class="{ 'is-hidden': !isNewTag() }"
                  >Mint token
                </b-button>
              </div>
            </div>
          </div>
        </template>
      </b-taginput>
    </b-field>
  </section>
</template>
<script>
import { FIRST_THOUSAND_HASHTAGS } from "@/queries";
import HashtagValidationService from "@/services/HashtagValidationService";

export default {
  name: "Hashtags",
  components: {},
  data() {
    return {
      hashtagInput: null,
      hashtagInputTags: [],
    };
  },
  apollo: {
    hashtags: {
      query: FIRST_THOUSAND_HASHTAGS,
      pollInterval: 1000, // ms
    },
  },
  methods: {
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
    validateTag(hashtag) {
      return this.hashtagValidationService.validateTag(hashtag);
    },
  },
  created() {
    this.hashtagValidationService = new HashtagValidationService(
      this.$buefy.toast
    );
  },
};
</script>
