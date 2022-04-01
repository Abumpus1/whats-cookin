import ingredientsData from '../data/ingredients';

class Recipe {
  constructor(recipe) {
    this.id = recipe.id;
    this.image = recipe.image;
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions;
    this.name = recipe.name;
    this.tags = recipe.tags;
  }

  filterIngredients(ingredient){
    return ingredientsData.filter(dataIng => dataIng.id === ingredient.id);
  }

  getIngredientNames() {
    return this.ingredients.reduce((acc, ingredient) => {
      let filteredIngs = this.filterIngredients(ingredient);
      filteredIngs.forEach((filterIng) => acc.push(filterIng.name));
      return acc;
    },[]);
  }

  getRecipeCost(){
    let costInCents = this.ingredients.reduce((acc, ingredient) => {
      let filteredIngs = this.filterIngredients(ingredient);
      filteredIngs.forEach((filterIng) => {
        acc += (ingredient.quantity.amount * filterIng.estimatedCostInCents);
      });
      return acc;
    },0);
    return Math.round(costInCents)/100;
  }

  getRecipeDirections(){
    return this.instructions.map((instruction) => {
      return `Step ${instruction.number}: ${instruction.instruction}`;
    });
  }
}

export default Recipe;
