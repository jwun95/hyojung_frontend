<template>
  <div>
    <Loading v-if="$fetchState.pending" />
    <div v-else class="profile">
      <section class="profile__image flex-row">
        <div class="image-figure">
          <img :src="profile_image.file" alt="profile-image" />
        </div>
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
      profile_image: {file:''}
    }
  },
  async fetch() {
    await this.$store.dispatch(`infopage/getItem`)
    .then((response) => {
      this.profile_image.file = response.data.profile_image.file;
    })
    .catch((e) => {
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

    .image-figure {
      text-align: center;

    img {
      object-fit: contain;
      object-position: center;
      border-radius: 50%;
      width: 15rem;
      height: 15rem;
    }
    }
  }

  &__text {
    width: 50%;
    padding-left: 10%;
  }

  .profile__content {
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
