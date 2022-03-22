export const state = () => ({
  item: {},
  list: [],
  page: {},
})

export const mutations = {
  setData(state, data) {
    state.item = { ...data }
  },
  setPage(state, data) {
    state.page = { ...data }
  },
  setList(state, list) {
    state.list = list
  },
}

export const actions = {
  async getItem({ commit }, id) {
    const response = await this.$axios.get(`/project_page/project/${id}`)
    commit('setData', response.data)
    return response
  },
  async getPage({ commit }) {
    const response = await this.$axios.get(`/project_page/`)
    commit('setPage', response.data)
    return response
  },
  async getList({ commit }) {
    const response = await this.$axios.get(`/project_page/project/`)
    commit('setList', response.data)
    return response
  },
}
