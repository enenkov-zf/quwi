export const state = () => ({
  userToken: '',
  projects: [],
  validToken: false
})

export const mutations = {
  addUserToken (state, token) {
    state.userToken = token
  },
  removeUserToken (state) {
    state.userToken = ''
    state.validToken = false
  },
  setProjects (state, projects) {
    state.projects = projects
  },
  tokenIsValid (state, valid) {
    state.validToken = valid
  },
  changeProjectName (state, data) {
    state.projects.forEach((item) => {
      item.id === data.id ? item.name = data.name : ''
    })
  }
}

export const actions = {
  async fetch ({ commit, state }, token) {
    commit('addUserToken', token)

    await this.$axios.get('https://api.quwi.com/v2/projects', {
      headers: {
        Authorization: 'Bearer ' + state.userToken
      }
    }).then((response) => {
      commit('tokenIsValid', true)
      commit('setProjects', response.data.projects)
    }).catch((e) => {
      commit('tokenIsValid', false)
    })
  }
}

export const getters = {
  projects: p => p.projects
}
