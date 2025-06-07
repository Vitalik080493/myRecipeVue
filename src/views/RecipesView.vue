<script setup lang="ts">
import ItemList from '../components/ItemList.vue';
import { collection, getDocs } from 'firebase/firestore/lite';
import { ref, type Ref } from 'vue';
import { useFirebase, loadingVisible } from '@/stores/data';
import { useRoute } from 'vue-router'
import type { Recipe } from '../model/interfaces'

const store = useFirebase();
const { db } = store;
const idCategory = useRoute().params.idCategory as string;
const visible = loadingVisible();

// Список категорий
let listName: Ref<Recipe[]> = ref([
  {
    category: '',
    id: '',
    img: '',
    name: '',
    recipe: '',
  },
])

// Получаем список категорий
async function getRecipes(db: any) {
  visible.isVisible = false;
  const recipesCol = collection(db, 'Recipe', idCategory, 'ListRecipe');
  const recipesSnapshot = await getDocs(recipesCol);
  const recipesList = recipesSnapshot.docs.map(doc => doc.data());
  return recipesList;
}

const list = getRecipes(db);
list.then((result) => {
  listName.value = result as Recipe[];
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
        <ItemList :href="'/recipes/' + idCategory + '/ListRecipe/' + l.id">
          <template #name>{{l.name}}</template>
        </ItemList>
      </li>
    </ul>
  </main>
</template>

<style scoped>
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
