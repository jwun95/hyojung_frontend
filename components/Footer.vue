<template>
  <footer class="d-footer">
    <div class="d-footer__info flex-column">
      <p class="d-footer__title">SHINHYOJUNG</p>
      <ul class="d-footer__icons">
        <li v-for="(item, idx) in footer.social_setting" :key="idx" class="d-footer__icon">
          <a :href="'//' + item.url" target="_blank"><i :class="item.icon"></i></a>
        </li>
      </ul>
      <p class="d-footer__copyright mt-3">copy right 2022</p>
      <p class="is-size-7">made by hyojung & jaewoon</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'MainFooter',
      data() {
        return {

        }
      },
      async fetch() {
      await this.$store.dispatch(`settings/getItem`)
      .catch((e) => {
        if(e.response.status) {
          this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
        }
      });
    },
    computed: {
      footer() {
        return this.$store.state.settings.item;
      }
    },
}
</script>

<style lang="scss" scoped>
.d-footer {
  padding: 0;

  &__info {
    margin-top: 0.2rem;
    height: 10rem;
    color: white;
    background-color: $primary-dark;
  }

  &__title {
    font-size: 1.2rem;
    letter-spacing: 0.3rem;
    margin-top: 1rem;
  }

  &__icons {
    display: flex;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
  }

  &__icon {
    margin: 0 0.5rem 0 0.5rem;

    i {
      color: $primary;
      font-size: 1.2rem;
    }

    i:hover {
      color: #fb6e2b;
    }

    i:active {
      transform: scale(1.2);
    }
  }

  &__copyright {
    font-size: 0.8rem;
    display: inline-block;
  }
}
</style>
