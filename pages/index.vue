<template>
  <div>
    <Loading v-if="$fetchState.pending" />
    <section v-else class="banner">
      <div class="banner__image">
        <!--로티 적용-->
        <client-only>
          <lottie-vue-player
            :src="homepage.url"
            :background-color="homepage.background_color"
            :speed="homepage.speed"
            style="width: 768px; height: 638px"
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
</template>

<script>
export default {
  name: 'IndexPage',
  async fetch() {
    await this.$store.dispatch(`homepage/getItem`).catch((e) => {
      if (e.response.status) {
        this.$nuxt.error({
          statusCode: e.response.status,
          message: e.response.data.message,
        })
      }
    })
  },
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
  height: 18rem;
  font-size: 1.2rem;
  text-align: center;
}
</style>
