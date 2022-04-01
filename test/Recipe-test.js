import { expect } from 'chai';
import Recipe from '../src/classes/Recipe';
import sampleRecipes from '../src/data/sample-recipes';

describe('Recipe', () => {
  let recipe;
  beforeEach(() => {
    recipe = new Recipe(sampleRecipes[0]);
  });

  it('Should be a function', () => {
    expect(Recipe).to.be.a('function');
  });

  it('Should have an id', () =>{
    expect(recipe.id).to.equal(595736)
  });

  it('Should have an image', () =>{
    expect(recipe.image).to.equal("https://spoonacular.com/recipeImages/595736-556x370.jpg")
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

  it('Should have method that determines ingredient name', ()=> {
    let ingNames = recipe.getIngredientNames();
    expect(ingNames).to.deep.equal(["wheat flour", "bicarbonate of soda"])
  });

  it('Should have method to get cost of ingredients', ()=> {
    let ingCost = recipe.getRecipeCost();
    expect(ingCost).to.equal(5.04);
  });

  it('Should have method to return directions', ()=> {
    let recipeDirections = recipe.getRecipeDirections();
    expect(recipeDirections).to.deep.equal(["Step 1: In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.", "Step 2: Add egg and vanilla and mix until combined."]);
  });
});
