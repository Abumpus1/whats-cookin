class User {
  constructor(user) {
    this.name = user.name;
    this.id = user.id;
    this.pantry = user.pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }

  toggleFavoriteRecipe(recipeId) {
    if(!this.favoriteRecipes.includes(recipeId)){
      this.favoriteRecipes.push(recipeId)
    } else {
      this.favoriteRecipes.forEach((recipe, i) => {
        if(recipe === recipeId) {
          this.favoriteRecipes.splice(i, 1)
        }
      });
    }
  }

  decideToCook(recipeId) {
    if(!this.recipesToCook.includes(recipeId)){
      this.recipesToCook.push(recipeId)
    } else {
      this.recipesToCook.forEach((recipe, i) => {
        if (recipe === recipeId) {
          this.recipesToCook.splice(i, 1)
        }
      });
    }
  }
}

export default User;
