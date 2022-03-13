<template>
    <nav class="nav flex-row">
    <NuxtLink to="/" class="nav__title">SHIN HYO JUNG</NuxtLink>
    <ul class="nav__items">
        <li class="item"><NuxtLink to="/" class="active">Home</NuxtLink></li>
        <li class="item"><NuxtLink to="/projects">Projects</NuxtLink></li>
        <li class="item"><NuxtLink to="/info">Info</NuxtLink></li>
    </ul>
    </nav>
</template>

<script>
    export default {
        name: 'MainNavbar'
    }
</script>

<style lang="scss" scoped>
// nav
.nav {
  justify-content: space-between;
  font-family: "Smooch Sans", sans-serif;
  border-bottom: 2px solid $primary;
  padding-bottom: 1rem;

  &__title {
    font-size: 1.5rem;
    letter-spacing: 0.3rem;
    margin-left: 1.5rem;
    color: black;
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