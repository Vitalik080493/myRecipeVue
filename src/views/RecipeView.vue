<script setup lang="ts">
// import ItemList from '../components/ItemList.vue'
import { collection, getDocs, getDoc, doc } from 'firebase/firestore/lite';
import { ref, type Ref } from 'vue';
// import { reactive } from 'vue';
import { useFirebase } from '@/stores/data';
// import router from '@/router';
import { useRoute } from 'vue-router'
import type { Recipe, Ingredient } from '../model/interfaces'

const store = useFirebase();
const { db } = store;
const idCategory = useRoute().params.idCategory as string
const idRecipe = useRoute().params.idRecipe as string

// Рецепт
let recipe: Ref<Recipe> = ref(
  {
    category: 'Супы',
    id: '1622215953464',
    img: '',
    name: 'Окрошка',
    recipe: 'Отварить картошку и яйца. Все ингредиенты нарезать кубиком. Зелень мелко покрошить. Перемешать. Залить кефиром, минералкой',
  }
)

let listIngredient: Ref<Ingredient[]> = ref([
  {
    count: '6',
    id: '101',
    name: 'Картошка',
    unit: 'шт.',
  },
])

// Получаем рецепт
async function getRecipe(db: any) {
  const recipeDoc = doc(db, 'Recipe', idCategory, 'ListRecipe', idRecipe);
  const recipeSnap = await getDoc(recipeDoc);
  if (recipeSnap.exists()) {
    console.log("Document data:", recipeSnap.data());
  } else {
    console.log("No such document!");
  }
  return recipeSnap;
}

// Получаем список ингредиентов
async function getIngredients(db: any) {
  const ingredientsCol = collection(db, 'Recipe', idCategory, 'ListRecipe', idRecipe, 'ListIngredient');
  const ingredientsSnapshot = await getDocs(ingredientsCol);
  const ingredientsList = ingredientsSnapshot.docs.map(doc => doc.data());
  return ingredientsList;
}

getRecipe(db);

const list = getIngredients(db);
list.then((result) => {
  listIngredient.value = result as Ingredient[];
  console.log(listIngredient.value);
},
(error) => {
  console.log(error)
}
);

</script>

<template>
  <main>
    <div class="titel">
      <h1>{{ recipe.name }}</h1>
    </div>
    <div class="listIngredient">
      <ul>
        <li v-for="i in listIngredient" :key="i.id">
          {{ i.name }} - {{ i.count }} {{ i.unit }}
        </li>
      </ul>
    </div>
    <div class="recipe">
      <p>
        {{ recipe.recipe }}
      </p>
    </div>
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
    height: 100vh;
    overflow: hidden;
    background-image: url(../assets/fone2.jpeg);
    /* background-size: contain; */
    background-repeat: round;
    /* background-position: center; */
    display: flex;
    flex-direction: column;
    padding: 190px 70px 190px 70px;
    gap: 20px;
  }
  .titel{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .titel h1{
    margin: 0px;
  }
  ul {
    list-style: none;
    padding-inline-start: 0px;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 0px;
  }
  li{
    display: flex;
  }
  .recipe{

  }
</style>
