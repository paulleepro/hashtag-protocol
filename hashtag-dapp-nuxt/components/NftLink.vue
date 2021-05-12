<template>
  <span class="has-text-weight-bold">
    <router-link
      :to="{
        name: 'nft-detail',
        params: { type: type, contract: contract, id: id },
      }"
    >
      {{ name }}
    </router-link>
  </span>
</template>

<script>
export default {
  name: "NftLink",
  props: ["name", "type", "contract", "id"],
};
</script>
