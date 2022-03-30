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

  // it('should have a method that sorts based on tag', ()=> {
  //   let sortedRecipes = recipeRepo.sortByTag("side dish");
  
  //   expect(sortedRecipes[0]).to.have.nested.property('id', 741603)
  //   expect(sortedRecipes).to.have.a.lengthof
  // });
});
