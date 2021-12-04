<template>
  <div class="body">
    <!-- Google Tag Manager (noscript) -->
    <noscript
      ><iframe
        src="https://www.googletagmanager.com/ns.html?id=GTM-MRK383F"
        height="0"
        width="0"
        style="display: none; visibility: hidden"
      ></iframe
    ></noscript>
    <!-- End Google Tag Manager (noscript) -->
    <div class="content-wrapper">
      <section class="nav">
        <div class="container"><Navbar /></div>
      </section>
      <section class="section main">
        <div class="container">
          <div class="columns">
            <div
              class="column is-2-widescreen is-3-desktop is-hidden-touch has-background-white-ter"
            >
              <div>
                <Sidebar :items="sidebarItems"></Sidebar>
              </div>
            </div>
            <div
              class="column is-8-widescreen is-9-desktop is-12-touch has-background-white"
            >
              <div class="content">
                <Content />
                <PageEdit />
              </div>
            </div>
            <div
              class="column is-2-desktop is-hidden-touch is-hidden-desktop-only has-background-white"
            >
              <div class="sticky">
                <template v-if="this.$page.headers">
                  <div class="toc-menu menu">
                    <p class="menu-label is-size-7">
                      <span>Page contents</span>
                    </p>
                    <div class="is-size-7 menu-list">
                      <TOC />
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "hashtag-components/src/components/Footer";
import Navbar from "../components/Navbar";
import PageEdit from "../components/PageEdit";
import Sidebar from "../components/Sidebar";
import { resolveSidebarItems } from "@vuepress/theme-default/util/index.js";

export default {
  name: "Layout",

  components: {
    Footer,
    Navbar,
    PageEdit,
    Sidebar,
  },

  computed: {
    sidebarItems() {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      );
    },
  },
  mounted() {
    this.$gtm.trackView(this.$page, this.$page.regularPath);
  },
};
</script>

<style lang="scss">
section.main {
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: $white;

  @include from($desktop) {
    background: linear-gradient(
      to right,
      $white-ter 0%,
      $white-ter 50%,
      $white 50%,
      $white 100%
    );
  }

  .column {
    padding-top: 2rem;

    .content {
      padding-bottom: 3.5rem;

      // Give content more padding from tablet upwards.
      @include from($desktop) {
        padding-left: 2rem;
      }
    }
  }
}

.sticky {
  position: sticky;
  top: 40px;
}
</style>
