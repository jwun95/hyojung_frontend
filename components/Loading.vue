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
            style="width: 500px; height: 400px"
            :loop="true"
            :autoplay="true"
          ></lottie-vue-player>
        </client-only>
        <div class="waviy">
             <span style="--i:1">L</span>
   <span style="--i:2">o</span>
   <span style="--i:3">a</span>
   <span style="--i:4">d</span>
   <span style="--i:5">i</span>
   <span style="--i:6">n</span>
   <span style="--i:7">g</span>
   <span style="--i:8">.</span>
   <span style="--i:9">.</span>
        </div>
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
  align-items: center;
  flex-direction: column;
}

.waviy {
  font-size: 60px;

  span {
    display: inline-block;
    animation: waviy 1s infinite;
    animation-delay: calc(.1s * var(--i));
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