class RecipeRepository {
  constructor(recipes) {
    this.recipes = recipes;
  }

  sortByTag(tag) {
   return this.recipes.filter(recipe => recipe.tags.includes(tag));
  }
}

export default RecipeRepository;
