import { createRouter, createWebHistory } from 'vue-router'
import CategorysView from '../views/CategorysView.vue'
import RecipesView from '../views/RecipesView.vue'
import RecipeView from '../views/RecipeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'categorys',
      component: CategorysView,
    },
    {
      path: '/recipes/:idCategory',
      name: 'recipes',
      component: RecipesView,
    },
    {
      path: '/recipes/:idCategory/ListRecipe/:idRecipe',
      name: 'recipe',
      component: RecipeView,
    },
    // {
    //   path: '/recipe',
    //   name: 'recipe',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/RecipeView.vue'),
    // },
  ],
})

export default router
