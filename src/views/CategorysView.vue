<script setup lang="ts">
import ItemCategory from '../components/ItemCategory.vue';
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
    <div class="titel">
      <h1>Категории:</h1>
    </div>
    <ul>
      <li v-for="l in listName" :key="l.id">
        <ItemCategory :href="'/recipes/' + l.id" :id="l.id">
          <template #name>{{l.name}}</template>
        </ItemCategory>
      </li>
    </ul>
  </main>
</template>

<style lang="less" scoped>
  main{
    height: 100vh;
    background-image: url(../assets/fone2.jpeg);
    /* background-size: contain; */
    background-repeat: round;
    padding: 200px 70px 190px 70px;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .titel{
    display: flex;
    align-items: center;
    justify-content: center;

    h1{
      font-size: 1.5em;
      margin: 0px;
      text-align: center;
    }
  }
  }
  ul {
    list-style: none;
    padding: 0px;
    margin: 0px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  li{
    display: flex;
    height: 50px;
    width: 95%;
    border-radius: 30px;
  }
</style>
