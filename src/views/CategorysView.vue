<script setup lang="ts">
import ItemList from '../components/ItemList.vue';
import ItemLoading from '../components/ItemLoading.vue';
import { collection, getDocs } from 'firebase/firestore/lite';
import { ref, type Ref } from 'vue';
import { useFirebase } from '@/stores/data';
import type { Category } from '../model/interfaces'

const store = useFirebase();
const { db } = store;
let isVisible = false;

// Список категорий
let listName: Ref<Category[]> = ref([
  {
    id: '01',
    name: 'Загрузка списка'
  },
])

// Получаем список категорий
async function getCategorys(db: any) {
  const categorysCol = collection(db, 'Recipe');
  const categorysSnapshot = await getDocs(categorysCol);
  const categorysList = categorysSnapshot.docs.map(doc => doc.data());
  return categorysList;
}

const list = getCategorys(db);
list.then((result) => {
  listName.value = result as Category[];
  isVisible = true;
},
(error) => {
  console.log(error)
}
);
</script>

<template>
  <main>
    <ul>
      <li v-for="l in listName" :key="l.id">
        <ItemList :href="'/recipes/' + l.id">
          <template #name>{{l.name}}</template>
        </ItemList>
      </li>
    </ul>
  </main>

  <ItemLoading :class="{ invisible: isVisible }"/>
</template>

<style lang="less" scoped>
  main{
    height: calc(100vh - 61px);
    overflow-y: scroll;
  }
  ul {
    list-style: none;
    padding-inline-start: 0px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  li{
    display: flex;
    height: 70px;
    width: 95%;
  }
</style>
