<template>
  <div>
    <article class="projects pt-6">
      <div
        class="projects__intro is-size-4 has-text-weight-semibold is-flex is-flex-direction-row-reverse has-text-centered"
      >
        <span v-dompurify-html="projectspage.text"></span>
      </div>
      <Loading v-if="$fetchState.pending" />
      <section v-else class="projects__main mt-6 mb-6">
        <ul class="projects__items">
          <li
            v-for="(item, idx) in projectspage.project_item"
            :key="idx"
            class="project__item my-3 mx-3"
            @click="switchGallery(true, idx)"
          >
            <img :src="item.image.file" alt="project-image" />
          </li>
        </ul>
      </section>
    </article>
    <b-carousel
      v-if="modalStatus"
      v-model="selected"
      :autoplay="false"
      with-carousel-list
      :indicator="false"
      :overlay="gallery"
      @click="switchGallery(true)"
    >
      <b-carousel-item v-for="(item, idx) in getImages" :key="idx">
        <figure class="image">
          <img :src="item.image" alt="project-image" />
        </figure>
      </b-carousel-item>
      <template #list="props">
        <div class="text__content">
          <client-only>
            <lottie-vue-player
              :src="`https://assets7.lottiefiles.com/private_files/lf30_T5tVEx.json`"
              background-color="#fff"
              :speed="1"
              style="width: 100px; height: 100px"
              :loop="true"
              :autoplay="true"
            ></lottie-vue-player>
          </client-only>
          <div
            v-dompurify-html="projectspage.project_item[props.active].intro"
            class="carousel__text"
          ></div>
        </div>
        <b-carousel-list
          v-model="props.active"
          :data="getImages"
          v-bind="al"
          as-indicator
          @switch="props.switch($event, false)"
        />
      </template>
      <template #overlay>
        <div
          v-if="gallery"
          class="modal-close is-large"
          @click="switchGallery(false)"
        />
      </template>
    </b-carousel>
  </div>
</template>

<script>
export default {
  name: 'ProjectsPage',
  data() {
    return {
      modalStatus: false,
      selected: 0,
      gallery: false,
      al: {
        hasGrayscale: true,
      },
    }
  },
  async fetch() {
    await this.$store.dispatch(`projectspage/getItem`).catch((e) => {
      if (e.response.status) {
        this.$nuxt.error({
          statusCode: e.response.status,
          message: e.response.data.message,
        })
      }
    })
  },
  computed: {
    projectspage() {
      return this.$store.state.projectspage.item
    },
    getImages() {
      const items = []
      const images = this.$store.state.projectspage.item.project_item
      images.forEach((element) => {
        items.push({ image: element.image.file })
      })
      return items
    },
  },
  methods: {
    switchGallery(value, idx) {
      this.gallery = value
      if (value) {
        this.modalStatus = true
        this.selected = idx
        document.documentElement.classList.add('is-clipped')
      } else {
        document.documentElement.classList.remove('is-clipped')
        this.modalStatus = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.projects {
  &__items {
    width: 100%;
    display: inline-flex;
    flex-wrap: wrap;
    padding-left: 5%;
    animation: opacity-transition 1s ease-in-out forwards;

    li {
      position: relative;
      width: 30%;
      height: 20rem;
      cursor: pointer;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      &::after {
        content: '';
        position: absolute;
        left: 0;
        height: 100%;
        color: white;
        text-align: center;
        font-size: 1.5rem;
        padding-top: 9rem;
        width: 100%;
        background: white;
        opacity: 0;
        transition: all 0.2s ease-in-out;
      }
      &:hover {
        &::after {
          opacity: 0.6;
        }
      }
    }
  }
}

.is-active .al img {
  filter: grayscale(0%);
}
.al img {
  filter: grayscale(100%);
}

.modal-close {
  transition: all ease 1s;

  &::after {
    background: #000000;
  }
  &::before {
    background: #000000;
  }
  &:hover {
    background: #fff;
    transform: rotate(360deg);
  }
}

.carousel {
  &.is-overlay {
    min-width: 768px;
    flex-direction: row !important;
    flex-wrap: wrap;
    animation: opacity-transition 0.5s ease-in-out forwards;
    background: #fff;
  }

  &::v-deep .carousel-items {
    width: 70%;
    height: 80%;
    background-color: #fff;
    border-radius: 8px;

    figure {
      height: 100%;
      width: 100%;
      display: flex;

      img {
        object-fit: contain;
        object-position: center;
      }
    }
  }

  &::v-deep .carousel-list {
    .carousel-slide {
      figure {
        height: 100%;

        img {
          object-fit: cover;
          height: 100%;
          filter: grayscale(80%);

          &:hover {
            filter: grayscale(0%);
            cursor: pointer;
          }
        }
      }
    }
  }
}
.text__content {
  width: 25%;
  margin: auto;
  height: 70%;

  .carousel__text {
    background: #fff;
    display: flex;
    height: 90%;
    justify-content: center;
    align-items: center;

    border-top: 1px solid black;
    border-bottom: 1px solid black;
  }
}
</style>
