<template>
  <div v-html="docBody" class="content"></div>
</template>
<script>
const axios = require("axios");
const md = require("markdown-it")();
/**
 * Load up a raw markdown file from the hashtag-docs directory,
 * and return it as HTML.
 */
export default {
  name: "MarkdownDoc",
  props: {
    /**
     * Name of the doc file to load.
     */
    filename: String,
  },
  data() {
    return {
      docBody: null,
    };
  },
  created() {
    this.getDoc();
  },
  methods: {
    async getDoc() {
      axios
        .get(`/docs/${this.filename}.md`)
        .then((response) => {
          this.docBody = md.render(response.data);
        })
        .catch((error) => {
          if (error.response) {
            // client received an error response (5xx, 4xx)
            this.docBody =
              "Error parsing document response: " +
              error.response.status +
              " " +
              error.response.statusText;
          } else if (error.request) {
            // client never received a response, or request never left
            this.docBody = "Error requesting document : " + error.response;
          } else {
            // anything else
            this.docBody = "Error parsing document.";
          }
        });
    },
  },
};
</script>
