class Recipe {
  constructor(recipe) {
    this.id = recipe.id;
    this.image = recipe.image;
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions;
    this.name = recipe.name;
    this.tags = recipe.tags;
  }

  filterIngredients(ingredient, ingredientsData){
    return ingredientsData.filter(dataIng => dataIng.id === ingredient.id);
  }

  getIngredientNames(ingredientsData) {
    return this.ingredients.reduce((acc, ingredient) => {
      let filteredIngs = this.filterIngredients(ingredient, ingredientsData);
      filteredIngs.forEach((filterIng) => acc.push(filterIng));
      return acc;
    },[]);
  }

  getRecipeCost(ingredientsData){
    let costInCents = this.ingredients.reduce((acc, ingredient) => {
      let filteredIngs = this.filterIngredients(ingredient, ingredientsData);
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
