class RecipeRepository {
  constructor(recipes) {
    this.recipes = recipes;
  }

  sortByTag(tag) {
   return this.recipes.filter(recipe => recipe.tags.includes(tag));
  }

  sortByName(nameInput) {
    return this.recipes.filter(recipe => recipe.name.toLowerCase().includes(nameInput.toLowerCase()));
  }
}

export default RecipeRepository;
