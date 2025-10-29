export interface Recipe {
  id: number;
  name: string;
}

export interface RecipeResponse {
  recipes: Array<Recipe>;
}
