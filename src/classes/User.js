class User {
  constructor(user) {
    this.name = user.name;
    this.id = user.id;
    this.pantry = user.pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }

  toggleId(recipeId, dataArray) {
    if(!dataArray.includes(recipeId)){
      dataArray.push(recipeId)
    } else {
      dataArray.forEach((recipe, i) => {
        if(recipe === recipeId) {
          dataArray.splice(i, 1)
        }
      });
    }
  }

  toggleFavoriteRecipe(recipeId) {
    this.toggleId(recipeId, this.favoriteRecipes);
  }

  decideToCook(recipeId) {
    this.toggleId(recipeId,this.recipesToCook);
  }
}

export default User;
