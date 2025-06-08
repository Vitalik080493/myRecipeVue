<template>
  <div class="loading">
    <img src="../assets/loading.svg" alt="loading">
  </div>
</template>

<style lang="less" scoped>
  .loading{
    position: absolute;
    top: calc(100vh/2 - 50px);
    left: calc(100vw/2 - 50px);
  
    img{
      width: 100px;

      @keyframes myAnim {
        0% {
          transform: rotate(0);
        }

        100% {
          transform: rotate(360deg);
        }
      }
      animation: myAnim 2s linear infinite;
    }
  }
</style>
