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

  filterByName(nameInput) {
    if (!nameInput) {
      nameInput = "";
    }
    this.resetFilteredRecipes();
    this.filteredRecipes = this.filteredRecipes.filter(recipe => recipe.name.toLowerCase().includes(nameInput.toLowerCase()));
    this.filterByTags();
  }

  resetFilteredRecipes(){
    this.filteredRecipes = this.recipes;
  }

  filterByTags() {
    this.checkedTags.forEach(tag => {
      this.filteredRecipes = this.filteredRecipes.filter(recipe => recipe.tags.includes(tag));
    });
  }

  checkTag(tag, nameInput){
    if(!this.checkedTags.includes(tag)){
      this.checkedTags.push(tag);
    } else {
      this.checkedTags.forEach((checkedTag, i) => {
        if(checkedTag === tag){
          this.checkedTags.splice(i, 1)
        }
      });
    }
    this.filterByName(nameInput);
  }
}

export default RecipeRepository;
