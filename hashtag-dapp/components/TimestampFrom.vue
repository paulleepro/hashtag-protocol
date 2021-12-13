<template>
  <b-tooltip :label="formattedDate" position="is-top" type="is-dark" size="is-small">
    <time><timeago :datetime="timestamp"></timeago></time>
  </b-tooltip>
</template>

<script>
export default {
  name: "TimestampFrom",
  props: ["value"],
  data() {
    return {
      timestamp: null,
      formattedDate: null,
    };
  },
  mounted() {
    this.timestamp = new Date(parseInt(this.value) * 1000);
    const d = new Date(this.timestamp).toLocaleDateString("en-us");
    const t = new Date(this.timestamp).toLocaleTimeString("en-US");
    this.formattedDate = d + " " + t;
  },
};
</script>
