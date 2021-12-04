<template>
  <div class="block newsletter">
    <div class="block container has-text-centered has-text-white-ter">
      <p class="is-size-3 has-text-weight-bold">#TokenizeEverything</p>
      <p class="has-text-grey-light">
        Sign up for occasional updates about our movement to decentralize
        hashtags.
      </p>
    </div>
    <NewsletterForm />
  </div>
</template>

<script>
import NewsletterForm from "./NewsletterForm";

export default {
  name: "Newsletter",
  components: {
    NewsletterForm,
  },
};
</script>

<style scoped lang="scss">
.newsletter {
  padding: 9rem 0;
  margin-bottom: 0;
  background-color: $grey-dark;
}
</style>
