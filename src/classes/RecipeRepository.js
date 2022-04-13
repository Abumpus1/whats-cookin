import Recipe from '../classes/Recipe';
import Ingredient from '../classes/Ingredient';
import User from '../classes/User';

class RecipeRepository {
  constructor(recipes, ingredients, user) {
    this.recipes = recipes.map(recipe => new Recipe(recipe));
    this.ingredients = ingredients.map(ingredient => new Ingredient(ingredient));
    this.filteredRecipes = this.recipes;
    this.checkedTags = [];
    this.currentUser = new User(user);
  }

  checkTag(tag, searchInput){
    if(!this.checkedTags.includes(tag)){
      this.checkedTags.push(tag);
    } else {
      this.checkedTags.forEach((checkedTag, i) => {
        if(checkedTag === tag){
          this.checkedTags.splice(i, 1);
        }
      });
    }
    this.filterBySearchTerm(searchInput);
  }

  resetFilteredRecipes(){
    this.filteredRecipes = this.recipes;
  }

  filterBySearchTerm(searchInput) {
    if (!searchInput) {
      searchInput = "";
    }
    this.resetFilteredRecipes();

    this.filteredRecipes = this.filteredRecipes.filter(recipe =>
      this.filterByRecipeName(searchInput, recipe) || this.filterbyIngredientName(searchInput, recipe));

    this.filterByTags();
  }

  filterByRecipeName(searchInput, recipe) {
    return recipe.name.toLowerCase().includes(searchInput.toLowerCase());
  }

  filterbyIngredientName(searchInput, recipe) {
    let recipeIngNames = recipe.ingredients.reduce((acc, recipeIng) => {
      acc.push(this.ingredients.find((actualIng) => {
        return actualIng.id === recipeIng.id;
      }).name);
      return acc;
    },[]);

    return recipeIngNames.some(ingredient => ingredient.includes(searchInput.toLowerCase()));
  }


  filterByTags() {
    this.checkedTags.forEach(tag => {
      this.filteredRecipes = this.filteredRecipes.filter(recipe => recipe.tags.includes(tag) || (tag === "favorite" && this.currentUser.favoriteRecipes.includes(recipe.id)));
    });
  }

  toggleFavorite(recipeId) {
    recipeId = parseInt(recipeId);
    this.currentUser.toggleFavoriteRecipe(recipeId);
  }
}

export default RecipeRepository;
