<script setup lang="ts">
  import ItemLoading from './components/ItemLoading2.vue';
  import { RouterView } from 'vue-router'
  import { loadingVisible } from '@/stores/data';

  const visible = loadingVisible();
</script>

<template>

  <RouterView />

  <ItemLoading :class="{ invisible: visible.isVisible }"/>

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
  .test{
    position: absolute;
    top: 0px;
    left: 0px;
  }
</style>
