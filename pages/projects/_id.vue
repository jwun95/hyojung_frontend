<template>
  <div class="project">
    <section class="project-title flex-row has-text-centered">
      <span v-dompurify-html="projectspage.main_title"></span>
    </section>
    <section class="project-items">
      <div class="project-items__top is-flex has-text-weight-bold">
        <div class="table__name">Title</div>
        <div class="table__title">{{ project.title }}</div>
        <div class="table__date">{{ project.date }}</div>
      </div>
      <div class="project-items__bottom is-flex">
        <div class="table__name">file</div>
        <div class="table__title">
          <a :href="doc.file" download>{{ doc.title }}</a>
        </div>
      </div>
      <div class="project-content p-6">
        <div v-if="project.video_url" class="content-video">
        <client-only>
                  <iframe
          width="560"
          height="315"
          :src="`https://www.youtube.com/embed/`+project.video_url"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        </client-only>
        </div>
                <div class="mt-6 content-text">
          <div v-dompurify-html="project.content"></div>
        </div>
      </div>
    </section>
    <section class="project-button">
      <NuxtLink :to="{ name: 'projects' }" class="has-text-white">
        <div class="back-button">목록</div>
      </NuxtLink>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ProjectsPage',
  data() {
    return {
      doc: {file: '', title: ''},
      playerVars: {
        autoplay: 1,
      },
    }
  },
  async fetch() {
    await this.$store.dispatch(`projectspage/getItem`, this.$route.params.id)
    .then((response)=> {
      this.doc.file = response.data.doc.file;
      this.doc.title = response.data.doc.title;
    })
    .catch((e) => {
        this.$nuxt.error({
          statusCode: 404,
        })
    })
    await this.$store.dispatch(`projectspage/getPage`)
  },
  computed: {
    projectspage() {
      return this.$store.state.projectspage.page
    },
    project() {
      return this.$store.state.projectspage.item
    },
  },
}
</script>

<style lang="scss" scoped>
.project {
  padding: 0 6rem 0 6rem;

  &-title {
    height: 15rem;
  }
}

.project-items {
  border-bottom: 3px solid $primary-light;

  &__top {
    border-top: 3px solid grey;
    border-bottom: 3px solid grey;
    padding: 1rem;
  }
  &__bottom {
    border-bottom: 3px solid $primary-light;
    padding: 1rem;
  }
}
.table {
  &__name {
    width: 7%;
  }
  &__title {
    width: 80%;
    a {
      color: blue;
      &:hover {
        color: red;
      }
    }
  }
  &__date {
    width: 13%;
  }
}

.content-video {
  width: 100%;
  text-align: center;
}

.project-button {
  margin: 2rem 0 5rem 0;
  display: flex;
  justify-content: right;

  .back-button {
    width: 6rem;
    padding-top: 0.3rem;
    height: 2rem;
    text-align: center;
    background: $primary-dark;

    &:active {
      transform: scale(1.1);
    }
  }
}
</style>
