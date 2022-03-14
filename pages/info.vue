<template>
  <div class="profile">
    <section class="profile__image flex-row">
      <img src="~/static/images/banner-image.png" alt="profile-image" />
    </section>
    <section class="profile__text flex-row">
      <div class="text__left flex-column">
        <div ref="test" class="content">
          <div class="content__title">신효정</div>
          <ul class="content__text">
            <li>2017 - 2021 계명대학교</li>
          </ul>
          <div class="divider"></div>
        </div>
        <div ref="test" class="content">
          <div class="content__title">교육</div>
          <ul class="content__text">
            <li>2017 - 2021 계명대학교</li>
          </ul>
          <ul class="content__text">
            <li>2017 - 2021 계명대학교</li>
          </ul>
          <ul class="content__text">
            <li>2017 - 2021 계명대학교</li>
          </ul>
        </div>
      </div>
      <div class="text__right flex-column">
        <div class="content">
          <div class="content__title">교육</div>
          <ul class="content__text">
            <li>2017 - 2021 계명대학교</li>
          </ul>
          <div class="divider"></div>
        </div>
        <div class="content">
          <div class="content__title">교육</div>
          <ul class="content__text">
            <li>2017 - 2021 계명대학교</li>
          </ul>
          <div class="divider"></div>
        </div>
        <div class="content">
          <div class="content__title">교육</div>
          <ul class="content__text">
            <li>2017 - 2021 계명대학교</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'InfoPage',
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
    width: 60%;
  }

  .text__left {
    width: 50%;
  }

  .text__right {
    width: 50%;
  }

  .divider {
    background-color: $primary;
    width: 70%;
    height: 2px;
    margin: 2rem 0 2rem 0;
  }

  .content {
    width: 80%;
    font-family: 'Hubballi', 'IBM Plex';
    visibility: hidden;

    &__title {
      font-size: 1.5rem;
      margin-bottom: 2rem;
      font-weight: bold;
    }

    &__text {
      margin-top: 1rem;
    }
  }
}
</style>
