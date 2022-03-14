<template>
  <div>
    <article class="projects pt-6">
      <div
        class="projects__intro is-size-4 has-text-weight-semibold is-flex is-flex-direction-row-reverse has-text-centered"
      >
        Textile Designer, <br />
        Fabric&nbsp;&nbsp;& &nbsp;&nbsp;Pattern.
      </div>
      <section class="projects__main mt-6 mb-6">
        <ul class="projects__items is-flex is-flex-wrap-wrap">
          <li v-for="(item, idx) in items" :key="idx" class="project__item my-3" @click="switchGallery(true, idx)">
            <img :src="item.image" alt="test" />
          </li>
        </ul>
      </section>
    </article>
    <!--Modal-->
<!--     <div v-if="modalStatus" class="image-modal">
      <button class="closeBtn" role="button" @click="modalStatus = false"
        >&times;</button
      >
      <div class="modal-content">
      </div>
    </div> -->
        <b-carousel
        v-if="modalStatus"
        v-model="selected"
        :autoplay="false"
        with-carousel-list
        :indicator="false"
        :overlay="gallery"
        @click="switchGallery(true)">
        <b-carousel-item v-for="(item, i) in items" :key="i">
            <figure class="image">
                <img :src="item.image">
            </figure>
        </b-carousel-item>
        <span v-if="gallery" class="modal-close is-large" @click="switchGallery(false)" />
        <template #list="props">
            <b-carousel-list
                v-model="props.active"
                :data="items"
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
                itemsToShow: 2,
                breakpoints: {
                    768: {
                        hasGrayscale: false,
                        itemsToShow: 4
                    },
                    960: {
                        hasGrayscale: true,
                        itemsToShow: 6
                    }
                }
            },
            items: [
                {
                    title: 'Slide 1',
                    image: 'https://picsum.photos/id/0/1230/500'
                },
                {
                    title: 'Slide 2',
                    image: 'https://picsum.photos/id/1/1230/500'
                },
                {
                    title: 'Slide 3',
                    image: 'https://picsum.photos/id/2/1230/500'
                },
                {
                    title: 'Slide 4',
                    image: 'https://picsum.photos/id/3/1230/500'
                },
                {
                    title: 'Slide 5',
                    image: 'https://picsum.photos/id/4/1230/500'
                },
                {
                    title: 'Slide 6',
                    image: 'https://picsum.photos/id/5/1230/500'
                },
                {
                    title: 'Slide 7',
                    image: 'https://picsum.photos/id/6/1230/500'
                },
                {
                    title: 'Slide 8',
                    image: 'https://picsum.photos/id/7/1230/500'
                }
            ]
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

    li {
      position: relative;
      width: 30%;
      margin: auto;
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

.image-modal {
  z-index: 50;
  position: fixed;
  height: 100%;
  background: #f4f4f4;
  top: 0;
  left: 0;
  width: 100%;

  &-content {
    height: 100%;
    width: 100%;
    animation: modalopen 0.5s;
  }

  .closeBtn {
    color: #ccc;
    font-size: 60px;
    margin-right: 4rem;
    background: #f4f4f4;

    &:hover,
    &:focus {
      color: #000;
      text-decoration: none;
      cursor: pointer;
    }
  }
}

.is-active .al img {
    filter: grayscale(0%);
}
.al img {
    filter: grayscale(100%);
}
</style>
