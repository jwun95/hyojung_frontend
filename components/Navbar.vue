<template>
    <nav class="nav flex-row">
    <NuxtLink to="/" class="nav__title"><img :src="logo" alt="logo"></NuxtLink>
    <ul class="nav__items">
        <li class="item"><NuxtLink to="/" :class="{'active' : currentSlug === 'index'}">Home</NuxtLink></li>
        <li class="item"><NuxtLink to="/projects" :class="{'active' : currentSlug === 'projects'}">Projects</NuxtLink></li>
        <li class="item"><NuxtLink to="/info" :class="{'active' : currentSlug === 'info'}">Info</NuxtLink></li>
    </ul>
    </nav>
</template>

<script>
    export default {
        name: 'MainNavbar',
        data() {
          return {
            currentSlug: 'index',
            logo: ''
          }
        },
            async fetch() {
      await this.$store.dispatch(`homepage/getItem`)
      .catch((e) => {
        if(e.response.status) {
          this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
        }
      });
    },
    computed: {
      navbar() {
        return this.$store.state.homepage.item;
      }
    },
        watch: {
            $route: {
                immediate: true,
                handler(newVal, oldVal) {
                    if (newVal) {
                        this.currentSlug = newVal.name;
                    }
                },
            },
        },
        mounted() {
          this.logo = this.navbar.logo.file;
        }
    }
</script>

<style lang="scss" scoped>
.nav {
  justify-content: space-between;
  font-family: "Smooch Sans", sans-serif;
  border-bottom: 2px solid $primary;
  padding-bottom: 1rem;

  &__title {
    margin-left: 1.5rem;
    color: black;

    img {
      height: 3rem;
    }
  }

  &__items {
    display: flex;

    .item {
      margin: 0 1.5rem 0 1.5rem;

      &:active {
        transform: scale(1.2);
      }

      a {
        color: $primary-light;

        &:hover {
          color: black;
        }

        &.active {
          color: black;
        }
      }
    }
  }
}
</style>