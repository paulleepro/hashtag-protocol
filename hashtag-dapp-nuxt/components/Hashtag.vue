<template>
  <span class="has-text-weight-bold">
    <router-link :to="{ name: 'hashtag-detail', params: { hashtag: dest } }">
      {{ value }}
    </router-link>
  </span>
</template>

<script>
export default {
  name: "Hashtag",
  props: ["value"],
  data() {
    // Modify HASHTAG for pretty url.
    let dest = this.value;
    dest = dest.replace("#", "");
    dest = dest.toLowerCase();
    return {
      dest: dest,
    };
  },
};
</script>
