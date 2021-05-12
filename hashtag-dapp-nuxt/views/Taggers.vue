<template>
  <div class="body">
    <Header />
    <section class="main">
      <div class="container">
        <h1 class="title is-1">Taggers</h1>
        <h2 class="subtitle">
          Hashtag Protocol Taggers
          <span class="is-pulled-right is-size-6 has-text-weight-bold">
            <router-link :to="{ name: 'dashboard' }">Dashboard</router-link
            >&nbsp;
            <b-icon icon="arrow-up" type="is-dark" size="is-small"></b-icon>
          </span>
        </h2>
        <div class="columns is-tablet is-centered">
          <div class="column is-12">
            <article class="is-white box">
              <h2 class="title is-4 is-spaced"></h2>
              <div class="b-table">
                <!---->
                <!---->
                <div class="table-wrapper has-mobile-cards">
                  <table tabindex="0" class="table is-hoverable">
                    <thead>
                      <tr>
                        <!---->
                        <!---->
                        <th class="">
                          <div class="th-wrap">
                            Tagger
                            <!---->
                          </div>
                        </th>
                        <th class="">
                          <div class="th-wrap is-centered">
                            Tag count
                            <!---->
                          </div>
                        </th>
                        <!---->
                      </tr>
                      <!---->
                      <!---->
                    </thead>
                    <tbody v-if="pagedTaggers">
                      <tr
                        draggable="false"
                        class=""
                        v-for="tagger in pagedTaggers"
                        v-bind:key="tagger.id"
                      >
                        <!---->
                        <!---->
                        <td data-label="Tagger" class="">
                          <eth-account
                            :value="tagger.id"
                            route="tagger-detail"
                          ></eth-account>
                        </td>
                        <td data-label="Tag count" class="has-text-centered">
                          {{ tagger.tagCount }}
                        </td>
                        <!---->
                      </tr>
                      <!---->
                      <!---->
                    </tbody>
                  </table>
                </div>
                <!---->
              </div>
              <Pagination
                :entity-count="taggersCount"
                :page-size="pageSize"
                @tabSelected="tabSelected"
              />
            </article>
          </div>
        </div>
      </div>
    </section>
    <Footer></Footer>
  </div>
</template>

<script>
import EthAccount from "../components/EthAccount";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Pagination from "../components/Pagination";
import { PAGED_TAGGERS, ALL_TAGGERS } from "../queries";

const PAGE_SIZE = 10;

export default {
  name: "Nfts",
  components: {
    EthAccount,
    Footer,
    Header,
    Pagination,
  },
  data() {
    return {
      activeTab: null,
      pageSize: PAGE_SIZE,
      first: PAGE_SIZE,
      skip: 0,
      taggersCount: 0,
    };
  },
  apollo: {
    taggerCount: {
      query: ALL_TAGGERS,
      manual: true,
      result({ data }) {
        this.taggersCount = data.taggers.length;
      },
    },
    pagedTaggers: {
      query: PAGED_TAGGERS,
      variables() {
        return {
          first: this.first,
          skip: this.skip,
        };
      },
    },
  },
  methods: {
    tabSelected(id) {
      this.skip = id * PAGE_SIZE;
    },
  },
};
</script>

<style lang="scss"></style>
