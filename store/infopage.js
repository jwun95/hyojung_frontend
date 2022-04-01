export const state = () => ({
  item: {},
})

export const mutations = {
  setData(state, data) {
    state.item = { ...data }
  },
}

export const actions = {
  async getItem({ commit }) {
    const response = await this.$axios.get(`/info_page/`)
    commit('setData', response.data)
    return response
  },

  async postItem({ commit }, data) {
    const response = await this.$axios.post(`/info_page/`, data)
    return response
  }
}
