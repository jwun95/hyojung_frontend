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
    const response = await this.$axios.get(`/settings/`)
    commit('setData', response.data)
    return response
  },
}
