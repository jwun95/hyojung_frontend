<template>
  <footer class="d-footer">
    <div class="d-footer__info flex-column">
      <p class="d-footer__title">SHINHYOJUNG</p>
      <ul class="d-footer__icons">
        <li class="d-footer__icon">
          <NuxtLink to=""><i class="fa-brands fa-blogger-b"></i></NuxtLink>
        </li>
        <li class="d-footer__icon">
          <NuxtLink to=""><i class="fa-brands fa-instagram"></i></NuxtLink>
        </li>
        <li class="d-footer__icon">
          <NuxtLink to=""><i class="fa-brands fa-facebook-f"></i></NuxtLink>
        </li>
      </ul>
      <span class="d-footer__copyright">copy right 2022 made by hyojung</span>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'MainFooter',
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
  }
}
</style>
