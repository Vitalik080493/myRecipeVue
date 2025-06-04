<script setup lang="ts">
import ItemList from '../components/ItemList.vue'
import { collection, getDocs } from 'firebase/firestore/lite';
import { ref } from 'vue';
import { useFirebase } from '@/stores/data';
import router from '@/router';
import { useRoute } from 'vue-router'

const store = useFirebase();
const { db } = store;
const idCategory = useRoute().params.idCategory as string

interface Recipe{
  category: string,
  id: string,
  img: string,
  name: string,
  recipe: string,
}

// Список категорий
let listName = ref([
  {
    category: 'Супы',
    id: '1622215953464',
    img: '',
    name: 'Окрошка',
    recipe: 'Отварить картошку и яйца. Все ингредиенты нарезать кубиком. Зелень мелко покрошить. Перемешать. Залить кефиром, минералкой',
  },
])

// Получаем список категорий
async function getRecipes(db: any) {
  const recipesCol = collection(db, 'Recipe', idCategory, 'ListRecipe');
  const recipesSnapshot = await getDocs(recipesCol);
  const recipesList = recipesSnapshot.docs.map(doc => doc.data());
  return recipesList;
}

const list = getRecipes(db);
list.then((result) => {
  listName.value = result as Recipe[];
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
