<script setup lang="ts">
// import ItemList from '../components/ItemList.vue'
import { collection, getDocs, getDoc, doc } from 'firebase/firestore/lite';
import { reactive, ref, type Reactive, type Ref } from 'vue';
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
let recipe: Reactive<Recipe> = reactive(
  {
    category: '',
    id: '',
    img: '',
    name: '',
    recipe: '',
  }
)

let listIngredient: Ref<Ingredient[]> = ref([
  {
    count: '',
    id: '',
    name: '',
    unit: '',
  },
])

// Получаем рецепт
async function getRecipe(db: any) {
  const recipeDoc = doc(db, 'Recipe', idCategory, 'ListRecipe', idRecipe);
  const recipeSnap = await getDoc(recipeDoc);
  if (recipeSnap.exists()) {
    recipe = recipeSnap.data() as Recipe;
    console.log("Document data:", recipeSnap.data());
  } else {
    console.log("No such document!");
  }
  return recipeSnap;
}

getRecipe(db);

// Получаем список ингредиентов
async function getIngredients(db: any) {
  const ingredientsCol = collection(db, 'Recipe', idCategory, 'ListRecipe', idRecipe, 'ListIngredient');
  const ingredientsSnapshot = await getDocs(ingredientsCol);
  const ingredientsList = ingredientsSnapshot.docs.map(doc => doc.data());
  return ingredientsList;
}

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
    <div class="recipe">
      <div class="listIngredient">
        <ul>
          <li v-for="i in listIngredient" :key="i.id">
            {{ i.name }} - {{ i.count }} {{ i.unit }}
          </li>
        </ul>
      </div>
      <div class="description">
        <p>
          {{ recipe.recipe }}
        </p>
      </div>
    </div>
  </main>
</template>

<style scoped>
  main{
    height: 100vh;
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
    font-size: 1.5em;
    margin: 0px;
  }
  .recipe{
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow-y: auto;
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
</style>
