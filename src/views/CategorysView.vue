<script setup lang="ts">
import ItemList from '../components/ItemList.vue';
import { collection, getDocs } from 'firebase/firestore/lite';
import { ref, type Ref } from 'vue';
import { useFirebase, loadingVisible } from '@/stores/data';
import type { Category } from '../model/interfaces'

const store = useFirebase();
const { db } = store;
const visible = loadingVisible();

// Список категорий
let listName: Ref<Category[]> = ref([
  {
    id: '',
    name: ''
  },
])

// Получаем список категорий
async function getCategorys(db: any) {
  visible.isVisible = false;
  const categorysCol = collection(db, 'Recipe');
  const categorysSnapshot = await getDocs(categorysCol);
  const categorysList = categorysSnapshot.docs.map(doc => doc.data());
  return categorysList;
}

const list = getCategorys(db);
list.then((result) => {
  listName.value = result as Category[];
  visible.isVisible = true;
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
