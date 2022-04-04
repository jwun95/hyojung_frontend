<template>
  <div class="loading__component flex-column">
    <div class="waviy">
      <span style="--i: 1">L</span>
      <span style="--i: 2">o</span>
      <span style="--i: 3">a</span>
      <span style="--i: 4">d</span>
      <span style="--i: 5">i</span>
      <span style="--i: 6">n</span>
      <span style="--i: 7">g</span>
      <span style="--i: 8">.</span>
      <span style="--i: 9">.</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingComponent',
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.waviy {
  font-size: 5rem;
  position: absolute;
  top: 40%;

  span {
    display: inline-block;
    animation: waviy 1s infinite;
    animation-delay: calc(0.1s * var(--i));
  }
}

.loading {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @keyframes circle-loading {
    to {
      transform: rotateZ(360deg);
    }
  }
  span {
    display: block;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: 2px solid transparent;
    border-top-color: green;
    animation: circle-loading 1200ms ease infinite;
  }
}
</style>
