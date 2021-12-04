<template>
  <div class="body">
    <div class="content-wrapper">
      <section class="section nav">
        <div class="container">
          <Navbar></Navbar>
        </div>
      </section>
      <section class="section has-background-white">
        <div class="container">
          <div class="columns is-vcentered">
            <div class="column is-5">
              <h1 class="is-size-1 title is-spaced">Build with us.</h1>
              <div class="content is-size-6">
                <p>
                  Hashtag Protocol is an experimental, early stage project
                  focused on helping application developers provide
                  decentralized tagging to their application and earning revenue
                  at the same time.
                </p>
                <p>
                  Besides questions, suggestions or critiques, we are especially
                  interested in hearing from those who are:
                </p>
                <ul>
                  <li>
                    Interested in offering decentralized asset/content tagging
                    functionality in your application.
                  </li>
                  <li>
                    Interested in setting up one or more independent HASHTAG
                    registration and auction sites (think Go Daddy but for
                    HASHTAG tokens).
                  </li>
                  <li>
                    Non-fungible token projects or token owners who would like
                    to have their digital assets be taggable on our
                    demonstration dApp.
                  </li>
                  <li>
                    Any developer interested in our vision and would like to get
                    involved “early on”.
                  </li>
                  <li>
                    Seed stage/pre-product-market fit VCs who want to disrupt
                    the centralized social networks' stranglehold on the vast
                    social, informational and financial equity of stored in
                    hashtags.
                  </li>
                </ul>
                <p>
                  To earn revenue from Hashtag Protocol your publisher wallet
                  address must be whitelisted in our Protocol contracts.
                </p>
                <p>
                  To whitelist your application/project or to access our
                  repository and Discord channel or for general inquiries,
                  please email
                  <a href="mailto:contact@hashtag-protocol.org"
                    >contact@hashtag-protocol.org</a
                  >.
                </p>
              </div>
            </div>
            <div class="column is-offset-1 is-4"></div>
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
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";

export default {
  name: "Developers",
  components: {
    Footer,
    Navbar,
    Newsletter,
  },
};
</script>

<style lang="scss"></style>
