<template>
  <div class="default-layout">
    <header>
      <Navbar />
    </header>
    <main>
      <Nuxt />
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'DefaultLayout'
  }
</script>

<style lang="scss" scoped>
.default-layout {
    padding: 2rem 2rem 0 2rem;
    width: 1600px;
    margin: auto;
    min-height: 100vh;

    main {
      min-height: 70.7vh;
      font-family: 'Helvetica','Hubballi', 'IBM Plex';
    }
}
</style>
