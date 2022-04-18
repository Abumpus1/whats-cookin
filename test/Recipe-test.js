import { expect } from 'chai';
import Recipe from '../src/classes/Recipe';
import sampleRecipes from '../src/data/sample-recipes';
import sampleIngredients from '../src/data/sample-ingredients';

describe('Recipe', () => {
  let recipe;

  beforeEach(() => {
    recipe = new Recipe(sampleRecipes[0]);
  });

  it('Should be a function', () => {
    expect(Recipe).to.be.a('function');
  });

  it('Should have an id', () => {
    expect(recipe.id).to.equal(595736);
  });

  it('Should have an image', () => {
    expect(recipe.image).to.equal("https://spoonacular.com/recipeImages/595736-556x370.jpg");
  });

  it('Should have ingredients', () => {
    expect(recipe.ingredients).to.deep.equal(sampleRecipes[0].ingredients);
  });

  it('Should have instructions', () => {
    expect(recipe.instructions).to.deep.equal(sampleRecipes[0].instructions);
  });

  it('Should have a name', () => {
    expect(recipe.name).to.equal("Loaded Chocolate Chip Pudding Cookie Cups");
  });

  it('Should have tags', () => {
    expect(recipe.tags).to.deep.equal([
      "antipasti",
      "starter",
      "snack"
    ]);
  });

  it('Should have method that returns ingredients that include names', () => {
    let ingNames = recipe.getIngredientNames(sampleIngredients);
    expect(ingNames).to.deep.equal([{"amount": 1.5, "id": 20081, "name": "wheat flour"}, {"amount": 0.5, "id": 18372, "name": "bicarbonate of soda"}]);
  });

  it('Should have method to get cost of ingredients', () => {
    let ingCost = recipe.getRecipeCost(sampleIngredients);
    expect(ingCost).to.equal(5.04);
  });

  it('Should have method to return directions', () => {
    let recipeDirections = recipe.getRecipeDirections();
    expect(recipeDirections).to.deep.equal(["Step 1: In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.", "Step 2: Add egg and vanilla and mix until combined."]);
  });

  it('Should have a helper function that returns array of correct ingredients', () => {
    let correctIngredients = recipe.filterIngredients(recipe.ingredients[0], sampleIngredients)
    expect(correctIngredients).to.deep.equal([{"id": 20081, "name": "wheat flour", "estimatedCostInCents": 142}]);
  });
});
