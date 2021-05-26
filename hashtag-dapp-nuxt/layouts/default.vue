<template>
  <nuxt />
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' }
        },
        {
          title: 'Inspire',
          icon: 'lightbulb',
          to: { name: 'inspire' }
        },
        {
          title: 'Dashboard',
          icon: 'lightbulb',
          to: { name: 'dashboard' }
        }
      ]
    }
  }
}
</script>
