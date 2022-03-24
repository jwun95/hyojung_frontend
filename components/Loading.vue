<template>
  <div class="loading__component">
    <!-- <div class="loading">
        <span></span>
    </div> -->
        <client-only>
          <lottie-vue-player
            :src="lottie"
            background-color="#fff"
            :speed="1"
            style="width: 768px; height: 638px"
            :loop="true"
            :autoplay="true"
          ></lottie-vue-player>
        </client-only>
  </div>
</template>

<script>
    export default {
        name: 'LoadingComponent',
        data() {
          return  {
            lottie: 'https://assets10.lottiefiles.com/datafiles/ogIQ10UnwnKiBZS/data.json'
          }
        }
    }
</script>

<style lang="scss" scoped>
.loading__component {

  display: flex;
  justify-content: center;
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