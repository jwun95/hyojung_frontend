<template>
  <div class="info-page" @mousewheel="wheelEvent">
    <Loading v-if="$fetchState.pending" />
    <div v-else class="info is-flex is-flex-direction-column">
      <div class="profile">
        <div class="info-section"></div>
        <section class="profile__image flex-row">
          <div class="image-figure">
            <img :src="profile_image.file" alt="profile-image" />
          </div>
        </section>
        <section
          class="profile__text is-flex is-flex-direction-column is-flex-wrap-wrap is-justify-content-center"
        >
          <div
            v-for="(item, idx) in infopage.info_items"
            :key="idx"
            class="profile__content"
          >
            <div class="content__title">{{ item.title }}</div>
            <span v-dompurify-html="item.content"></span>
            <div class="divider"></div>
          </div>
        </section>
      </div>

      <div class="has-text-centered">
        <button class="is-size-3 bottom--move" @click="goContact"><i class="fa-solid fa-angle-down"></i></button>
      </div>

      <form v-if="!submit" id="contact" class="contact is-flex flex-column" @submit.prevent="submitForm">
        <div class="contact__title has-text-centered">
          <h1>Message Me</h1>
          <h3>문의주세요</h3>
        </div>
        <div class="contact__content is-size-4">
          <div class="content__top is-flex my-6">
            <div class="name-input mr-6 border-bottom">
              <div class="input-title"><span>Name</span><span> 이름</span></div>
              <b-input ref="name" v-model="form.name" placeholder="이름"></b-input>
            </div>
            <div class="email-input border-bottom">
              <div class="input-title">
                <span>Email</span><span> 이메일</span>
                <b-field><b-input ref="email" v-model="form.email" placeholder="이메일"></b-input></b-field>
              </div>
            </div>
          </div>
          <div class="content__middle border-bottom my-6">
            <div class="input-title">
              <span>Subject</span><span> 제목</span>
            </div>
            <b-input ref="title" v-model="form.title" placeholder="제목"></b-input>
          </div>
          <div class="content__bottom border-bottom mt-6">
            <div class="input-title">
              <span>Message</span><span> 메시지</span>
              <b-input ref="content" v-model="form.content" style="border:none" type="textarea" placeholder="메시지"></b-input>
            </div>
          </div>
        </div>
        <recaptcha
        class="mt-4"
          @success="recaptcha=true"
        />
        <div class="mt-3 mb-6">
          <button v-if="recaptcha" class="contact__button" type="submit">Submit</button>
        </div>
      </form>
      <div v-else class="submit--completion flex-column mt-6">
        <span class="is-size-3">확인하고 연락드릴게요!</span>
        <client-only>
          <lottie-vue-player
            :src="lottie"
            background-color="#fff"
            :speed="1"
            style="width: 350px; height: 250px"
            :loop="false"
            :autoplay="true"
          ></lottie-vue-player>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoPage',
  data() {
    return {
      profile_image: { file: '' },
      form: {
        name: null,
        email: null,
        title: null,
        content: null,
      },
      recaptcha: false,
      submit: false,
      lottie: "https://assets7.lottiefiles.com/packages/lf20_b4ojt04m.json",
    }
  },
  async fetch() {
    await this.$store
      .dispatch(`infopage/getItem`)
      .then((response) => {
        this.profile_image.file = response.data.profile_image.file
      })
      .catch((e) => {
        if (e.response.status) {
          this.$nuxt.error({
            statusCode: e.response.status,
          })
        }
      })
  },
  fetchDelay: 1000,
  computed: {
    infopage() {
      return this.$store.state.infopage.item
    },
  },
  beforeMount () {
    // window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    async submitForm() {

      if (this.form.name === "" || this.form.name === null) {
        this.$refs.name.focus();
        return false;
      }
      else if (this.form.email === "" || this.form.email === null) {
        this.$refs.email.focus();
        return false;
      }
      else if (this.form.title === "" || this.form.title === null) {
        this.$refs.title.focus();
        return false;
      }
      else if (this.form.content === "" || this.form.content === null) {
        this.$refs.content.focus();
        return false;
      }

      try {
        const reToken = await this.$recaptcha.getResponse()

        const data = {
          title: this.form.title,
          content: this.form.content,
          name: this.form.name,
          email_addr: this.form.email,
          token: reToken,
        }

        await this.$store
          .dispatch(`infopage/postItem`, data)
          .then((res) => {
            this.submit = true
          })
          .catch((e) => {
            if (e.response.status) {
              this.$nuxt.error({
                statusCode: e.response.status,
              })
            }
          })
      } catch (error) {
        console.log('Login error:', error)
      }
    },
    goContact() {
      if (process.client) {
        window.scrollTo(0, 1018)
      }
    },
    wheelEvent(e) {
      if (e.deltaY > 0) {
        window.scrollTo(0, 1018)
      }
      else if(e.deltaY < 0) {
        window.scrollTo(0, 0)
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.profile {
  height: 48rem;
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

.border-bottom {
  border-bottom: 1px solid black;
}

.contact {
  &__title {
    height: 15rem;
    padding-top: 7rem;
  }

  &__button {
    background: black;
    color: white;
    height: 2rem;
    width: 5rem;

    &:hover {
      transform: scale(1.1);
    }
  }
  &__content {
    max-width: 458px;

    &::v-deep input {
      border: none !important;
    }

    &::v-deep textarea {
      border: none !important;
      resize: none;
    }
  }
}

.bottom--move {
  border: none;
  color: grey;
  height: 2rem;
  animation: bounce-in 2s infinite;
}

.submit--completion {
  height: 76vh;
}
</style>
