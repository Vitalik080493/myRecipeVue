<script setup lang="ts">
  import router from '@/router';

  const props = defineProps({
    href: String,
    id: String,
  })

  const src = props.id ? "/src/assets/categorys/"+props.id+".jpg" : ""

  function send(){
    router.push(props.href!)
  }
  // const href = "/recipes/" + props.id;
</script>
<template>
  <a class="category" @click="send">
    <img :src="src" alt="">
    <h1><slot name="name"></slot></h1>
  </a>
</template>

<style lang="less" scoped>
.category {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  // padding-inline: 20px;
  background-color: var(--color-gray-20);
  gap: 20px;
  border-radius: 10px;

  img{
    width: 50px;
    height: 50px;
    border-radius: 10px;
  }

  h1{
    font-size: 1.5rem;
  }
}
</style>
