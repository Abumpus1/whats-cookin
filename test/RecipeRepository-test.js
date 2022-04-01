import { expect } from 'chai';
import RecipeRepository from '../src/classes/RecipeRepository';
import sampleRecipes from '../src/data/sample-recipes'

describe('Recipe Repository', () => {
  let recipeRepo;

  beforeEach(() => {
    recipeRepo = new RecipeRepository(sampleRecipes);
  });

  it('Should be a function', () => {
    expect(RecipeRepository).to.be.a('function');
  });

  it('Should hold recipe data', () => {
    expect(recipeRepo.recipes).to.deep.equal(sampleRecipes);
  });

  it('Should start with all recipes as filtered recipes', () => {
    expect(recipeRepo.filteredRecipes).to.deep.equal(sampleRecipes);
  });

  it('Should start with an empty object of checked tags', () => {
    expect(recipeRepo.checkedTags).to.deep.equal({});
  });

  it('Should have a method to add tags to checked tags object', () => {
    expect(recipeRepo.checkedTags).to.deep.equal({});
    recipeRepo.checkTag("main dish");
    expect(recipeRepo.checkedTags).to.deep.equal({"main dish": "main dish"});
  });

  it('Should have a method that sorts based on tag', ()=> {
    let sortedRecipes = recipeRepo.checkTag("main dish");

    expect(sortedRecipes).to.have.a.lengthOf(1);
    expect(sortedRecipes[0]).to.deep.equal(sampleRecipes[1]);
  });

  it('Should have a method that can sort based on multiple tags', () => {
    recipeRepo.checkTag("main dish");

    expect(recipeRepo.checkedTags).to.deep.equal({"main dish": "main dish"});
    expect(recipeRepo.filteredRecipes).to.have.a.lengthOf(1);
    expect(recipeRepo.filteredRecipes[0]).to.deep.equal(sampleRecipes[1]);

    recipeRepo.checkTag("sauce");

    expect(recipeRepo.checkedTags).to.deep.equal({"main dish": "main dish", "sauce": "sauce"});
    expect(recipeRepo.filteredRecipes).to.have.a.lengthOf(0);
    expect(recipeRepo.filteredRecipes).to.deep.equal([]);
  });

  it('Should have a method that removes existing tags from checked tags object', () => {

    recipeRepo.checkTag("main dish");

    expect(recipeRepo.checkedTags).to.deep.equal({"main dish": "main dish"});
    expect(recipeRepo.filteredRecipes).to.have.a.lengthOf(1);
    expect(recipeRepo.filteredRecipes[0]).to.deep.equal(sampleRecipes[1]);

    recipeRepo.checkTag("sauce");

    expect(recipeRepo.checkedTags).to.deep.equal({"main dish": "main dish", "sauce": "sauce"});
    expect(recipeRepo.filteredRecipes).to.have.a.lengthOf(0);
    expect(recipeRepo.filteredRecipes).to.deep.equal([]);

    recipeRepo.checkTag("main dish");

    expect(recipeRepo.checkedTags).to.deep.equal({"sauce": "sauce"});
    expect(recipeRepo.filteredRecipes).to.have.a.lengthOf(1);
    expect(recipeRepo.filteredRecipes[0]).to.deep.equal(sampleRecipes[2]);
  });

  it('Should have a method that sorts based on name', () => {
    let sortedRecipes = recipeRepo.filterByName("Wing Sauce");

    expect(sortedRecipes).to.have.a.lengthOf(1);
    expect(sortedRecipes[0]).to.deep.equal(sampleRecipes[2]);
  });
});
