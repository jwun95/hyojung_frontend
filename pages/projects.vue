<template>
  <div>
    <article class="projects pt-6">
      <div
        class="projects__intro is-size-4 has-text-weight-semibold is-flex is-flex-direction-row-reverse has-text-centered"
      >
        <span v-dompurify-html="projectspage.text"></span>
      </div>
      <section class="projects__main mt-6 mb-6">
        <ul class="projects__items">
          <li v-for="(item, idx) in projectspage.project_item" :key="idx" class="project__item my-3 mx-3" @click="switchGallery(true, idx)">
            <img :src="serverUrl + item.image.file" alt="project-image" />
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
        @click="switchGallery(true)">
        <b-carousel-item v-for="(item, idx) in getImages" :key="idx">
            <figure class="image">
                <img :src="item.image" alt="project-image">
            </figure>
        </b-carousel-item>
        <span v-if="gallery" class="modal-close is-large" @click="switchGallery(false)" />
        <template #list="props">
            <b-carousel-list
                v-model="props.active"
                :data="getImages"
                v-bind="al"
                as-indicator
                @switch="props.switch($event, false)"
            />
        </template>
        <template #overlay>
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
      await this.$store.dispatch(`projectspage/getItem`)
      .catch((e) => {
        if(e.response.status) {
          this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
        }
      });
    },
    computed: {
      projectspage() {
        return this.$store.state.projectspage.item;
      },
      getImages() {
        const items = [];
        const images = this.$store.state.projectspage.item.project_item;
        images.forEach(element => {
        items.push({'image': this.serverUrl + element.image.file, 'text': element.intro})
      });
        return items;
      }
    },
  methods: {
    modalClick(id) {
      this.modalStatus = true;
    },
        switchGallery(value, idx) {
            this.gallery = value
            if (value) {
              this.modalStatus = true;
              this.selected = idx;
                document.documentElement.classList.add('is-clipped')
            } else {
                document.documentElement.classList.remove('is-clipped')
                this.modalStatus = false;
            }
        }
  }
}
</script>

<style lang="scss" scoped>
.projects {
  &__items {
    width: 100%;
    display: inline-flex;
    flex-wrap: wrap;
    padding-left: 5%;

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

.carousel {

  &.is-overlay {
    min-width: 768px;
  }

  &::v-deep .carousel-items {
    height: 80%;

    figure {
      height: 100%;

      img {
        height: 100%;
      }
    }
  }

  &::v-deep .carousel-list {

    height: 20%;

    .carousel-slide {
      width: 25% !important;

      figure {
        height: 100%;

      img {
        object-fit: cover;
        height: 100%;
      }
      }
    }
  }
}
</style>
