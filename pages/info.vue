<template>
  <div>
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
        <button class="is-size-3">&#8595;</button>
      </div>
      <section class="contact is-flex flex-column">
        <div class="contact__title has-text-centered">
          <h1>Message Me</h1>
          <h3>문의주세요</h3>
        </div>
        <div class="contact__content is-size-4">
          <div class="content__top is-flex my-6">
            <div class="name-input mr-6 border-bottom">
              <div class="input-title"><span>Name</span><span>  이름</span></div>
              <b-input v-model="form.name"></b-input>
            </div>
            <div class="email-input border-bottom">
              <div class="input-title">
                <span>Email</span><span>  이메일</span>
                <b-input v-model="form.email"></b-input>
              </div>
            </div>
          </div>
          <div class="content__middle border-bottom my-6">
            <div class="input-title"><span>Subject</span><span>  제목</span></div>
            <b-input v-model="form.title"></b-input>
          </div>
          <div class="content__bottom border-bottom mt-6">
            <div class="input-title">
              <span>Message</span><span>  메시지</span>
              <b-input v-model="form.content" type="textarea"></b-input>
            </div>
          </div>
        </div>
        <div class="mt-5 mb-6">
          <button class="contact__button" @click="submitForm()">Submit</button>
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
      profile_image: { file: '' },
      form: {
        name: null,
        email: null,
        title: null,
        content: null
      }
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
  methods: {
    async submitForm() {

      const data = {
        title: this.form.title,
        content: this.form.content,
        name: this.form.name,
        email_addr: this.form.email
      }

      await this.$store.dispatch(`infopage/postItem`, data)
      .then((res) => {
        console.log(res)
      })
      .catch((e) => {
        if (e.response.status) {
          this.$nuxt.error({
            statusCode: e.response.status,
          })
        }
      })
    }
  }
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
  }
}
</style>
