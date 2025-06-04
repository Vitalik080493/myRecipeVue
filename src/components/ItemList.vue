<script setup lang="ts">
  const props = defineProps({
    href: String
  })
  // const href = "/recipes/" + props.id;
</script>
<template>
  <a :href="props.href">
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
