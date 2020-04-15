<template>
  <div class="app-layout wrapper">
    <Header :is-logged="isLogged" />
    <main class="main">
      <div class="container">
        <nuxt />
      </div>
    </main>
    <Footer />
    <modals-container />
    <v-dialog />
  </div>
</template>

<script>
import Header from './partials/Header.vue'
import Footer from './partials/Footer.vue'

export default {
  components: {
    Header,
    Footer
  },
  computed: {
    isLogged () {
      return this.$store.state.validToken
    }
  }
}
</script>
