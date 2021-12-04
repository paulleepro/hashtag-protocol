<template>
  <section class="newsletter-signup has-text-centered-mobile">
    <b-field group horizontal>
      <b-input
        placeholder="Email address"
        v-model="email"
        type="email"
        icon="email"
        @keyup.native.enter="addSubscription"
        required
        :loading="this.isLoading"
        :disabled="this.isLoading"
        style="width: 300px;"
      >
      </b-input>
      <p>
        <b-button
          label="Subscribe"
          @click="addSubscription"
          type="is-primary"
          :disabled="this.isLoading"
        />
      </p>
    </b-field>
  </section>
</template>
<script>
import newsletterManager from "@/mixins/newsletterManager";

export default {
  mixins: [newsletterManager],
  name: "Newsletter",
  data: () => ({
    email: null,
    isLoading: false,
  }),
  methods: {
    async addSubscription() {
      if (!this.isValidEmail) {
        return;
      }

      // Close the snackbar if it's open.
      if (this.snackbar) {
        this.snackbar.close();
      }

      // Enable the loading animation and disable the input field.
      this.isLoading = true;

      // Add the subscriber using our handler in newsletterManager mixin.
      const subscriptionResponse = await this.addSubscriber(this.payload);
      this.responseHandler(subscriptionResponse);
    },
    // @TODO: Better error handling.
    responseHandler(response) {
      let message;

      if (response.requires_confirmation) {
        message =
          "Thanks for subscribing. Please check your inbox for a confirmation email.";
      } else if (response.error) {
        // This is a user who has subscribed but not yet clicked validation link.
        message = response.error;
      } else {
        message =
          "That address is already subscribed. Maybe check your spam filter?";
      }

      // Turn off loading animation and re-enable the input field.
      this.isLoading = false;
      this.snackbar = this.$buefy.snackbar.open({
        message: message,
        indefinite: true,
      });
      this.email = null; // Flush email
    },
  },
  computed: {
    isValidEmail() {
      const rule =
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      return Boolean(this.email && rule.test(this.email));
    },
    payload() {
      return {
        email: this.email,
      };
    },
  },
};
</script>
<style lang="scss">
.newsletter-signup {
  display: flex;
  justify-content: center;

  .field-label {
    display: none;
  }
}
</style>
