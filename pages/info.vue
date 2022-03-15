<template>
  <div class="profile">
    <section class="profile__image flex-row">
      <img :src="serverUrl + infopage.profile_image.file" alt="profile-image" />
    </section>
    <section class="profile__text is-flex is-flex-direction-column is-flex-wrap-wrap is-justify-content-center">
        <div v-for="(item, idx) in infopage.info_items" :key="idx" ref="test" class="profile__content">
          <div class="content__title">{{ item.title }}</div>
          <span v-dompurify-html="item.content"></span>
          <div class="divider"></div>
        </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'InfoPage',
      async fetch() {
      await this.$store.dispatch(`infopage/getItem`)
      .catch((e) => {
        if(e.response.status) {
          this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
        }
      });
    },
    computed: {
      infopage() {
        return this.$store.state.infopage.item;
      }
    },
  mounted() {
    const content = this.$el.querySelectorAll('.content');
    const flyingText = async () => {
      await setTimeout(function () {
        content.forEach((element, idx) => {
          setTimeout(function () {
            element.style.cssText = 'visibility: visible;'
            element.classList.add('flying-text')
          }, idx * 100)
        })
      }, 100);
    }
    flyingText();
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


  .divider {
    background-color: $primary;
    width: 70%;
    height: 2px;
    margin: 2rem 0 0 0;
  }

  .profile__content {
    font-family: 'Hubballi', 'IBM Plex';
    visibility: visible;
    width: 60%;
    height: 30%;

    .content__title {
      font-size: 1.5rem;
      margin-bottom: 2rem;
      font-weight: bold;
    }
  }
}
</style>
