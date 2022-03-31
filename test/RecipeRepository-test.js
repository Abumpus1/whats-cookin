import { expect } from 'chai';
import RecipeRepository from '../src/classes/RecipeRepository';
import sampleRecipes from '../src/data/sample-recipes'
import Recipe from '../src/classes/Recipe';

describe('Recipe Repository', () => {
  let recipeRepo;

  beforeEach(() => {
    recipeRepo = new RecipeRepository(sampleRecipes.map(recipe => new Recipe(recipe)));
  });

  it('Should be a function', () => {
    expect(RecipeRepository).to.be.a('function');
  });

  it('should hold recipe data', () => {
    expect(recipeRepo.recipes).to.deep.equal(sampleRecipes);
  });

  it('should have a method that sorts based on tag', ()=> {
    let sortedRecipes = recipeRepo.sortByTag("main dish");

    expect(sortedRecipes).to.have.a.lengthOf(1);
    expect(sortedRecipes[0]).to.deep.equal(sampleRecipes[1]);
  });

  it('should have a method that sorts based on name', () => {
    let sortedRecipes = recipeRepo.sortByName("Wing Sauce");

    expect(sortedRecipes).to.have.a.lengthOf(1);
    expect(sortedRecipes[0]).to.deep.equal(sampleRecipes[2]);
  });
});
