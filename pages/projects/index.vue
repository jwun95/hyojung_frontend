<template>
  <div>
    <Loading v-if="$fetchState.pending" />
    <div v-else class="project">
      <section class="project-title">
        <div v-dompurify-html="projectspage.main_title"></div>
      </section>
      <section class="project-items">
        <div class="project-items__title table-flex has-text-weight-bold">
          <div class="table-no">No</div>
          <div class="table-title">Title</div>
          <div class="table-date">Date</div>
        </div>
        <div class="reverse">
          <div
            v-for="(item, idx) in projects"
            :key="idx"
            class="project-items__item table-flex"
          >
            <div class="table-no">{{ idx + 1 }}</div>
            <div class="table-title has-text-centered">
                <NuxtLink
                :to="{ name: 'projects-id', params: { id: item.id } }"
                >{{ item.title }}</NuxtLink
              >
            </div>
            <div class="table-date">{{ item.date }}</div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectsPage',
  data() {
    return {}
  },
  async fetch() {
    await this.$store.dispatch(`projectspage/getList`)
    await this.$store.dispatch(`projectspage/getPage`)
  },
  fetchDelay: 1000,
  computed: {
    projectspage() {
      return this.$store.state.projectspage.page
    },
    projects() {
      const items = this.$store.state.projectspage.list
      const projectList = []

      items.forEach((element) => {
        projectList.push({
          id: element.id,
          title: element.title,
          date: element.date,
        })
      })
      return projectList
    },
  },
}
</script>

<style lang="scss" scoped>
.project {
  padding: 0 6rem 0 6rem;

  &-title {
    height: 15rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
}
.reverse {
  display: flex;
  flex-direction: column-reverse;
}

.table-flex {
  display: flex;
  align-items: center;
  text-align: center;

  .table-no {
    width: 5%;
  }

  .table-title {
    width: 80%;
    display: flex;
    justify-content: center;
    margin-left: 5%;

    a {
      color: black;

      &:hover {
        transform: scale(1.2);
      }
    }
  }
  .table-date {
    width: 10%;
  }
}

.project-items {
  &__title {
    border-top: 3px solid grey;
    border-bottom: 3px solid grey;
    padding: 1rem;
  }
  &__item {
    border-bottom: 1px solid $primary-light;
    padding: 2.5rem 1rem 2.5rem 1rem;
  }
}
</style>
