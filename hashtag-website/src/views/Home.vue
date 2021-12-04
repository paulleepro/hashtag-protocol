<template>
  <div class="body">
    <div class="content-wrapper">
      <section class="nav">
        <div class="container">
          <Navbar />
        </div>
      </section>
      <section class="main">
        <div class="container">
          <div class="hero">
            <div class="columns is-vcentered is-desktop">
              <div class="column overview">
                <h1 class="is-size-1 title is-spaced">
                  An experimental content tagging protocol for the decentralized
                  internet.
                </h1>
                <div class="is-size-4 content">
                  <p>
                    Hashtag Protocol is a simple, decentralized protocol built
                    for developers to tokenize hashtag strings as non-fungible
                    tokens (NFTs), link them with online media and surface this
                    data for use in networks, platforms and applications.
                  </p>
                  <p>
                    <a
                      class="button is-medium is-primary is-outlined"
                      href="/developers"
                      >Learn more</a
                    >
                  </p>
                </div>
              </div>
              <div class="column hero-img">
                <span class="image">
                  <img :src="require(`../assets/img/hero.png`)" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <Newsletter />
    <Footer />
  </div>
</template>

<script>
import Footer from "hashtag-components/src/components/Footer";
import Newsletter from "../components/Newsletter";
import Navbar from "../components/Navbar";

export default {
  name: "Home",
  components: {
    Footer,
    Navbar,
    Newsletter,
  },
};
</script>

<style lang="scss">
.main {
  padding-bottom: 0;

  .hero {
    padding-top: 4rem;
    padding-bottom: 0;

    .hero-img {
      align-self: flex-end;
    }
  }

  .overview {
    padding-bottom: 4rem;
  }
}
</style>
