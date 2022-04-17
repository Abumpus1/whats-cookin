class User {
  constructor(user) {
    this.name = user.name;
    this.id = user.id;
    this.pantry = user.pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
    this.missingIngredients = [];
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

  calculateMissing(recipeIng, pantryIng) {
    let sum = recipeIng.quantity.amount - pantryIng.amount
      return sum;
  }

  findMissingIngredients(recipe) {
    this.missingIngredients = recipe.ingredients.reduce((acc,recipeIng) => {
      this.pantry.forEach(pantryIng => {
        if (pantryIng.ingredient === recipeIng.id && pantryIng.amount < recipeIng.quantity.amount) {
          acc.push({
            id: pantryIng.ingredient,
            amountMissing: this.calculateMissing(recipeIng, pantryIng)
          });
        } else if (!this.pantry.find(pantryIng => pantryIng.ingredient === recipeIng.id)) {
          acc.push({
            id: recipeIng.id,
            amountMissing: recipeIng.quantity.amount
          });
        }
      });
      return acc;
    },[]);
  }

  showPantry(ingredientsData) {
    return this.pantry.map(pantryIng => {
      return {
        id: pantryIng.ingredient,
        name: ingredientsData.find(dataIng => pantryIng.ingredient === dataIng.id).name,
        amount: pantryIng.amount
      }
    });
  }
}

export default User;
