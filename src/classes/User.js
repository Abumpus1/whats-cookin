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
//decideToCook method

}

export default User;


//USER METHODS
// Allow a user to favorite or unfavorite recipes (add to / remove from the user’s favoriteRecipes)
// Decide to cook a recipe that week (add to my recipesToCook)
// Filter my favoriteRecipes by a tag. (Extension option: filter by multiple tags)
// Filter my favoriteRecipes by its name. (Extension option: filter by name or ingredients)
