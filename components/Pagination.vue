<template>
  <div class="has-text-centered">
    <NuxtLink :to="`#page${current-1}`">&lt;</NuxtLink>

    <NuxtLink v-for="(i,idx) in list" :key="idx" :to="`#page${i}`">{{ i }}</NuxtLink>

    <NuxtLink :to="`#page${current+1}`">&gt;</NuxtLink>

    {{data}}
  </div>
</template>

<script>
export default {
  name: 'MyPagenation',
  props: {
    dataLength: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      list : [1,2,3,4,5,6],
      data : 0,
      current: 1
    }
  },
  watch: {
    dataLength: {
      handler(oldVal, newVal) {
        this.data = newVal
      }
    }
  },
  methods: {

  },
}
</script>

<style lang="scss" scoped></style>
