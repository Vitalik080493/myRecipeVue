// import type { Recipe, Ingredient, Category } from '../model/interfaces'
export interface Recipe {
  category: string,
  id: string,
  img: string,
  name: string,
  recipe: string,
}

export interface Ingredient {
  count: string,
  id: string,
  name: string,
  unit: string,
}

export interface Category {
    id: string,
    name: string,
}