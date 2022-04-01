import Recipe from '../classes/Recipe';
import Ingredient from '../classes/Ingredient';
class RecipeRepository {
  constructor(recipes, ingredients) {
    this.recipes = recipes.map(recipe => new Recipe(recipe));
    this.ingredients = ingredients.map(ingredient => new Ingredient(ingredient));
    this.filteredRecipes = this.recipes;
    this.checkedTags = {};
  }

  filterByName(nameInput) {
    return this.recipes.filter(recipe => recipe.name.toLowerCase().includes(nameInput.toLowerCase()));
  }

  resetFilteredRecipes(){
    this.filteredRecipes = this.recipes;
  }

  filterByTags() {
    this.resetFilteredRecipes();
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
    return this.filterByTags();
  }
}

export default RecipeRepository;
