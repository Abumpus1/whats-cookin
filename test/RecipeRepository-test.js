import { expect } from 'chai';
import RecipeRepository from '../src/classes/RecipeRepository';
import sampleRecipes from '../src/data/sample-recipes';
import sampleIngredients from '../src/data/sample-ingredients';
import User from '../src/classes/User';
import sampleUsers from '../src/data/sample-users';

describe('Recipe Repository', () => {
  let recipeRepo;

  beforeEach(() => {
    recipeRepo = new RecipeRepository(sampleRecipes, sampleIngredients, sampleUsers[0]);
  });

  it('Should be a function', () => {
    expect(RecipeRepository).to.be.a('function');
  });

  it('Should hold recipe data', () => {
    expect(recipeRepo.recipes).to.deep.equal(sampleRecipes);
  });

  it('Should hold ingredients data', () => {
    expect(recipeRepo.ingredients).to.deep.equal(sampleIngredients);
  });

  it('Should start with all recipes as filtered recipes', () => {
    expect(recipeRepo.filteredRecipes).to.deep.equal(sampleRecipes);
  });

  it('Should start with an empty array of checked tags', () => {
    expect(recipeRepo.checkedTags).to.deep.equal([]);
  });

  it('Should have a current user', () => {
    expect(recipeRepo.currentUser.name).to.equal("Saige O'Kon")
  });

  it('Should have a method to add tags to checked tags array', () => {
    expect(recipeRepo.checkedTags).to.deep.equal([]);
    recipeRepo.checkTag("main dish");
    expect(recipeRepo.checkedTags).to.deep.equal(["main dish"]);
  });

  it('Should have a method that sorts based on tag', ()=> {
    recipeRepo.checkTag("main dish");

    expect(recipeRepo.filteredRecipes).to.have.a.lengthOf(1);
    expect(recipeRepo.filteredRecipes[0]).to.deep.equal(sampleRecipes[1]);
  });

  it('Should have a method that can sort based on multiple tags', () => {
    recipeRepo.checkTag("main dish");

    expect(recipeRepo.checkedTags).to.deep.equal(["main dish"]);
    expect(recipeRepo.filteredRecipes).to.have.a.lengthOf(1);
    expect(recipeRepo.filteredRecipes[0]).to.deep.equal(sampleRecipes[1]);

    recipeRepo.checkTag("sauce");

    expect(recipeRepo.checkedTags).to.deep.equal(["main dish", "sauce"]);
    expect(recipeRepo.filteredRecipes).to.have.a.lengthOf(0);
    expect(recipeRepo.filteredRecipes).to.deep.equal([]);
  });

  it('Should have a method that removes existing tags from checked tags array', () => {

    recipeRepo.checkTag("main dish");

    expect(recipeRepo.checkedTags).to.deep.equal(["main dish"]);
    expect(recipeRepo.filteredRecipes).to.have.a.lengthOf(1);
    expect(recipeRepo.filteredRecipes[0]).to.deep.equal(sampleRecipes[1]);

    recipeRepo.checkTag("sauce");

    expect(recipeRepo.checkedTags).to.deep.equal(["main dish", "sauce"]);
    expect(recipeRepo.filteredRecipes).to.have.a.lengthOf(0);
    expect(recipeRepo.filteredRecipes).to.deep.equal([]);

    recipeRepo.checkTag("main dish");

    expect(recipeRepo.checkedTags).to.deep.equal(["sauce"]);
    expect(recipeRepo.filteredRecipes).to.have.a.lengthOf(1);
    expect(recipeRepo.filteredRecipes[0]).to.deep.equal(sampleRecipes[2]);
  });

  it('Should have a method that sorts based on name', () => {
    recipeRepo.filterByName("Wing Sauce");

    expect(recipeRepo.filteredRecipes).to.have.a.lengthOf(1);
    expect(recipeRepo.filteredRecipes[0]).to.deep.equal(sampleRecipes[2]);
  });
});
