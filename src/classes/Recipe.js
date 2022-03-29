import ingredientsData from '../data/ingredients'
class Recipe {
  constructor(recipe) {
    this.id = recipe.id;
    this.image = recipe.image;
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions;
    this.name = recipe.name;
    this.tags = recipe.tags;
  }
  //GOAL - array of strings that are ingredient names
  //input - array of objs(ingredientsData)
  //compare ids of ingredientsData.id and recipe.ingredients.id
  //filter ingredientsData, then for each filtered obj, push obj.name to acc
  //output - ["wheat flour", "bicarbonate of soda"]
  filterIngredients(ingredient){
    return ingredientsData.filter(dataIng => dataIng.id === ingredient.id);
  }

  getIngredientNames() {
    return this.ingredients.reduce((acc, ingredient) => {
      let filteredIngs = this.filterIngredients(ingredient);
      filteredIngs.forEach((filterIng) => {
        acc.push(filterIng.name);
      });
      return acc;
    },[]);
  }

  getRecipeCost(){
    return this.ingredients.reduce((acc, ingredient) => {
      let filteredIngs = this.filterIngredients(ingredient);
      filteredIngs.forEach((filterIng) => {
        acc += (ingredient.quantity.amount * filterIng.estimatedCostInCents)
      });
      return acc;
    },0);
  };

    getRecipeDirections(){
      return this.instructions.map((instruction) => {
        return `Step ${instruction.number}: ${instruction.instruction}`
      })
    }

}

export default Recipe;

// Determine the names of ingredients needed
// Get the cost of its ingredients
// Return its directions / instructions
