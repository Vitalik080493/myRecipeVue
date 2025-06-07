<script setup lang="ts">
  import router from '@/router';

  const props = defineProps({
    href: String
  })

  function send(){
    router.push(props.href!)
  }
  // const href = "/recipes/" + props.id;
</script>
<template>
  <a @click="send">
    <slot name="name"></slot>
  </a>
</template>

<style scoped>
a {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding-inline: 20px;
  font-size: 2rem;
  background-color: var(--color-gray-20);
}
</style>
