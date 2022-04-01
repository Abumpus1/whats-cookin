import Recipe from '../classes/Recipe';
class RecipeRepository {
  constructor(recipes) {
    this.recipes = recipes.map(recipe => new Recipe(recipe));
    this.filteredRecipes = [];
    this.checkedTags = {};
  }

  // sortByTag(tag) {
   // return this.recipes.filter(recipe => recipe.tags.includes(tag));
  // }

  sortByName(nameInput) {
    return this.recipes.filter(recipe => recipe.name.toLowerCase().includes(nameInput.toLowerCase()));
  }

  sortByTags() {
    this.filteredRecipes = this.recipes;
    Object.keys(this.checkedTags).forEach(tag => {
      this.filteredRecipes = this.filteredRecipes.filter(recipe => recipe.tags.includes(tag));
    });
    return this.filteredRecipes;
  }

  checkTag(tag){
    if(this.checkedTags[tag]){
      delete this.checkedTags[tag]
    } else {
      this.checkedTags[tag] = tag;
    }
    sortByTags();
  }
}

export default RecipeRepository;
