<script setup lang="ts">
import ItemList from '../components/ItemList.vue'
import { collection, getDocs, getDoc, doc } from 'firebase/firestore/lite';
import { ref } from 'vue';
import { reactive } from 'vue';
import { useFirebase } from '@/stores/data';
import router from '@/router';
import { useRoute } from 'vue-router'

const store = useFirebase();
const { db } = store;
const idCategory = useRoute().params.idCategory as string
const idRecipe = useRoute().params.idRecipe as string

interface Recipe{
  category: string,
  id: string,
  img: string,
  name: string,
  recipe: string,
}

// Рецепт
let recipe: Recipe =
  {
    category: 'Супы',
    id: '1622215953464',
    img: '',
    name: 'Окрошка',
    recipe: 'Отварить картошку и яйца. Все ингредиенты нарезать кубиком. Зелень мелко покрошить. Перемешать. Залить кефиром, минералкой',
  }

// Получаем список категорий
async function getRecipes(db: any) {
  console.log('1')
  const recipesDoc = doc(db, 'Recipe', '01', 'ListRecipe', '1622215953464');
  const recipeSnap = await getDoc(recipesDoc);
  if (recipeSnap.exists()) {
    console.log("Document data:", recipeSnap.data());
  } else {
  // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
  return recipeSnap;
}

getRecipes(db);
// const list = getRecipes(db);
// list.then((result) => {
//   // console.log(result);
//   recipe = result as Recipe;
//   console.log(listName);
// },
// (error) => {
//   console.log(error)
// }
// );
</script>

<template>
  <main>
    <!-- <ul>
      <li v-for="l in listName" :key="l.id">
        <ItemList :id="l.id">
          <template #name>{{l.name}}</template>
        </ItemList>
      </li>
    </ul> -->
  </main>
</template>

<style scoped>
  main{
    height: calc(100vh);
    overflow-y: scroll;
    background-image: url(../assets/fone2.jpeg);
    /* background-size: contain; */
    background-repeat: round;
    /* background-position: center; */
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
