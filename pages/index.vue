<template>
  <div class="project-listing">
    <ul v-if="!!storeProjects" class="project-items">
      <li v-for="project in storeProjects" :key="project.id" class="project-item">
        <ProjectItem :project-data="project" />
      </li>
    </ul>
  </div>
</template>

<script>

import ProjectItem from '../components/ProjectItem.vue'

export default {
  components: {
    ProjectItem
  },
  async fetch ({ app, store, redirect }) {
    const token = await app.$cookies.get('quwi_user_token')
    if (!token) {
      store.commit('removeUserToken')
      return redirect('/login')
    }

    await store.dispatch('fetch', token)

    if (!store.state.validToken) {
      return redirect('/login')
    }
  },
  data () {
    return {
      userToken: String,
      showPage: false,
      projects: Array
    }
  },
  computed: {
    storeProjects () {
      return this.$store.getters.projects
    }
  }
}
</script>

<style>

</style>
