<template>
  <div>
    <Loading v-if="$fetchState.pending" />
      <div v-else>
    <section class="banner">
      <div class="banner__image flex-row">
        <client-only>
          <lottie-vue-player
            :src="homepage.url"
            :background-color="homepage.background_color"
            :speed="homepage.speed"
            :style="`width: ${homepage.lottie_width}px; height: ${homepage.lottie_height}px`"
            :loop="homepage.loop"
            :autoplay="homepage.auto_play"
          ></lottie-vue-player>
        </client-only>
      </div>
      <div class="banner__title ">
        <div v-dompurify-html="homepage.text" class="title__text"></div>
      </div>
    </section>
    <section class="intro flex-column">
      <div v-dompurify-html="homepage.intro"></div>
    </section>
  </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  async fetch() {
    await this.$store.dispatch(`homepage/getItem`).catch((e) => {
      if (e.response.status) {
        this.$nuxt.error({
          statusCode: e.response.status,
        })
      }
    })
  },
  fetchDelay: 1000,
  computed: {
    homepage() {
      return this.$store.state.homepage.item
    },
  },
}
</script>

<style lang="scss" scoped>

pre {
  background: white;
}
.banner {
  margin-top: 0.5rem;
  border-bottom: 2px solid $primary;
  display: flex;
  height: 40rem;
  margin-top: 0;

  &__image {
    width: 50%;
    background-size: cover;
  }

  &__title {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 3.8rem;
    letter-spacing: 0.5rem;
    line-height: 1.5em;
      background-image: linear-gradient(
    -225deg,
    #231557 0%,
    #44107a 29%,
    #ff1361 67%,
    #fff800 100%
  );
  background-size: auto auto;
  background-clip: border-box;
  background-clip: text;
  background-size: 200% auto;
  -webkit-text-fill-color: transparent;
  animation: textclip 5s linear infinite;
  }
}

.intro {
  min-height: 18rem;
  font-size: 1.2rem;
  text-align: center;
}
</style>
