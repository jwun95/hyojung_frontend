<template>
<div>
      <section class="banner">
        <div class="banner__image">
          <!--로티 적용-->
          <client-only>
          <lottie-vue-player
            :src="`https://assets5.lottiefiles.com/packages/lf20_2oW79h.json`"
            :background-color="`#4c4c4c`"
            :speed="0.8"
            style="width: 768px; height: 638px"
            :loop="true"
            :autoplay="true"
          ></lottie-vue-player>
          </client-only>
        </div>
        <div class="banner__title flex-column">
          <p class="banner__top">LET'S MAKE</p>
          <div class="banner__bot">
            <span>DIFFERENCE</span>
            <span class="plus">+</span>
          </div>
        </div>
      </section>
      <section class="intro flex-column">
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati,
          eligendi!
          <br />
          저는 이쁘니 귀요미 효쁘니에요
          <br />
          잘 부탁드려용 ㅎㅎ
        </span>
      </section>
</div>
</template>

<script>
  export default {
    name: 'IndexPage'
  }
</script>

<style lang="scss" scoped>
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
      font-size: 3.8rem;
      letter-spacing: 0.5rem;
    }

    &__top {
      margin-left: 5rem;
    }

    &__bot {
      color: $primary;

      .plus {
        font-size: 2rem;
        position: absolute;
        margin: 5px;
      }
    }
  }

  .intro {
    height: 18rem;
    font-family: "Hubballi", "IBM Plex";
    font-size: 1.2rem;
    text-align: center;
  }
</style>