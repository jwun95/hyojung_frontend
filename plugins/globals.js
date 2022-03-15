import Vue from 'vue'

Vue.mixin({
  data() {
    return {
      serverUrl: process.env.serverUrl,
    }
  },
  methods: {
    isEmpty(data) {
      return typeof data === 'undefined' || data == null || data === ''
    },
    goToPrev() {
      this.$router.go(-1)
    },
  },
})
