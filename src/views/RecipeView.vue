<script setup lang="ts">
import { collection, getDocs, getDoc, doc } from 'firebase/firestore/lite';
import { reactive, ref, type Reactive, type Ref } from 'vue';
import { useFirebase, loadingVisible } from '@/stores/data';
import { useRoute } from 'vue-router'
import type { Recipe, Ingredient } from '../model/interfaces'

const store = useFirebase();
const { db } = store;
const idCategory = useRoute().params.idCategory as string
const idRecipe = useRoute().params.idRecipe as string
const visible = loadingVisible();

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
  visible.isVisible = false; // показываем загрузку
  const recipeDoc = doc(db, 'Recipe', idCategory, 'ListRecipe', idRecipe);
  const recipeSnap = await getDoc(recipeDoc);
  if (recipeSnap.exists()) {
    recipe = recipeSnap.data() as Recipe;
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
      <h1>{{ recipe.name }}</h1>
    </div>
    <div class="recipe">
      <div class="listIngredient">
        <ul>
          <li v-for="i in listIngredient" :key="i.id">
            <div class="listIngredient__ingredient ingredient">
              <div class="ingredient__name">{{ i.name }}</div>
              <div class="ingredient__count">{{ i.count != "0" ? i.count : ""}} <span>{{ i.unit }}</span></div>
            </div>
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

<style lang="less" scoped>
  main{
    height: 100vh;
    background-image: url(../assets/fone2.jpeg);
    /* background-size: contain; */
    background-repeat: round;
    /* background-position: center; */
    display: flex;
    flex-direction: column;
    padding: 190px 70px 190px 70px;
    gap: 10px;
  }

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

  .recipe{
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  ul {
    list-style: none;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 0px;
    padding: 0px;

    li{
      background: url("../assets/point_black.svg") no-repeat left center;
      background-size: 8px;
      padding-inline-start: 15px;
    }
  }
  
  .ingredient{
    display: flex;
    justify-content: space-between;
    #__count {
      min-width: 60px;
      display: flex;
      align-self: center;
      justify-content: end;

      span {
        display: inline-block;
      }
    }
  }
</style>
