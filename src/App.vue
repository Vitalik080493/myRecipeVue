<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <!-- <header>
    <h1>Категории</h1>
  </header> -->

  <RouterView />
</template>

<style scoped>
  header {
    line-height: 1.5;
    max-height: 10rem;
    width: 100%;
    height: 61px;
    padding-block: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: green;
  }
</style>
