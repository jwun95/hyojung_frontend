<template>
  <div class="error-page py-5">
    <div v-if="error.statusCode === 404">
        <client-only>
          <lottie-vue-player
            :src="lottie_404"
            background-color="#fff"
            :speed="1"
            style="width: 768px; height: 638px"
            :loop="true"
            :autoplay="true"
          ></lottie-vue-player>
        </client-only>
    </div>
    <div v-else>
        <client-only>
          <lottie-vue-player
            :src="lottie_other"
            background-color="#fff"
            :speed="1"
            style="width: 768px; height: 638px"
            :loop="false"
            :autoplay="true"
          ></lottie-vue-player>
        </client-only>
    </div>
    <div class="mb-3 homepage--move">
      <NuxtLink to="/" class="is-size-3">"홈페이지로 이동"</NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
name: 'ErrorPage',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      lottie_404: 'https://assets1.lottiefiles.com/packages/lf20_rz0hyab1.json',
      lottie_other: 'https://assets4.lottiefiles.com/packages/lf20_awxs6x6k.json'
    }
  },
}
</script>
<style lang="scss" scoped>
.error-page {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.homepage--move {
  a {
    color: black;
    display: inline-block;

    &:hover {
      transform: scale(1.1);
    }
  }
}
</style>
