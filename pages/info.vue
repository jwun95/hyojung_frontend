<template>
  <div>
    <Loading v-if="$fetchState.pending" />
    <div v-else class="profile">
      <section class="profile__image flex-row">
        <img :src="infopage.profile_image.file" alt="profile-image" />
      </section>
      <section
        class="profile__text is-flex is-flex-direction-column is-flex-wrap-wrap is-justify-content-center"
      >
        <div v-for="(item, idx) in infopage.info_items" :key="idx" class="profile__content">
          <div class="content__title">{{ item.title }}</div>
          <span v-dompurify-html="item.content"></span>
          <div class="divider"></div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoPage',
  data() {
    return {
    }
  },
  async fetch() {
    await this.$store.dispatch(`infopage/getItem`).catch((e) => {
      if (e.response.status) {
        this.$nuxt.error({
          statusCode: e.response.status,
          message: e.response.data.message,
        })
      }
    })
  },
  computed: {
    infopage() {
      return this.$store.state.infopage.item
    },
  },
}
</script>

<style lang="scss" scoped>
.profile {
  height: 50rem;
  display: flex;

  &__image {
    width: 40%;

    img {
      border-radius: 50%;
      width: 20rem;
      height: 20rem;
    }
  }

  &__text {
    width: 50%;
    padding-left: 10%;
  }

  .profile__content {
    font-family: 'Hubballi', 'IBM Plex';
    width: 60%;
    opacity: 0;
    animation: flying 0.5s ease-in-out forwards;

    .content__title {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      font-weight: bold;
    }
  }
}

.divider {
  margin-top: 2rem;
  margin-bottom: 2rem;
  width: 80%;
  height: 1px;
  background: black;
}
</style>
