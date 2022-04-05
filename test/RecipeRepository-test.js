import { expect } from 'chai';
import RecipeRepository from '../src/classes/RecipeRepository';
import sampleRecipes from '../src/data/sample-recipes';
import sampleIngredients from '../src/data/sample-ingredients';
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
    expect(recipeRepo.currentUser.name).to.equal("Saige O'Kon");
  });

  it('Should have a method that filters by tags', () => {
    expect(recipeRepo.filteredRecipes).to.deep.equal(sampleRecipes);
    recipeRepo.checkedTags = ["sauce"];
    
    recipeRepo.filterByTags();
    expect(recipeRepo.filteredRecipes).to.deep.equal([sampleRecipes[2]]);
  });

  it('Should have a method that can sort based on multiple tags', () => {
    expect(recipeRepo.filteredRecipes).to.have.a.lengthOf(4);
    
    recipeRepo.checkedTags = ["main dish"];
    recipeRepo.filterByTags();

    expect(recipeRepo.checkedTags).to.deep.equal(["main dish"]);
    expect(recipeRepo.filteredRecipes).to.have.a.lengthOf(1);
    expect(recipeRepo.filteredRecipes[0]).to.deep.equal(sampleRecipes[1]);


    recipeRepo.checkedTags = ["main dish", "sauce"];
    recipeRepo.filterByTags();

    expect(recipeRepo.checkedTags).to.deep.equal(["main dish", "sauce"]);
    expect(recipeRepo.filteredRecipes).to.have.a.lengthOf(0);
    expect(recipeRepo.filteredRecipes).to.deep.equal([]);
  });

  it('Should have a method that resets filteredRecipes array', () => {
    recipeRepo.checkedTags = ["main dish"];
    recipeRepo.filterByTags();

    expect(recipeRepo.filteredRecipes).to.have.a.lengthOf(1);
    expect(recipeRepo.filteredRecipes[0]).to.deep.equal(sampleRecipes[1]);

    recipeRepo.resetFilteredRecipes();

    expect(recipeRepo.filteredRecipes).to.have.a.lengthOf(4);
    expect(recipeRepo.filteredRecipes).to.deep.equal(sampleRecipes);
  });

  it('Should have a method that sorts based on name', () => {
    recipeRepo.filterByName("Wing Sauce");

    expect(recipeRepo.filteredRecipes).to.have.a.lengthOf(1);
    expect(recipeRepo.filteredRecipes[0]).to.deep.equal(sampleRecipes[2]);
  });

  it('Should have method that sorts by name also sort by tag', () => {
    recipeRepo.filterByName("Wing Sauce");

    expect(recipeRepo.filteredRecipes).to.have.a.lengthOf(1);
    expect(recipeRepo.filteredRecipes[0]).to.deep.equal(sampleRecipes[2]);

    recipeRepo.checkedTags = ["main dish"];

    recipeRepo.filterByName("Wing Sauce");

    expect(recipeRepo.filteredRecipes).to.deep.equal([]);
  });

  it('Should have a method to add tags to checked tags array', () => {
    expect(recipeRepo.checkedTags).to.deep.equal([]);
    recipeRepo.checkTag("main dish");
    expect(recipeRepo.checkedTags).to.deep.equal(["main dish"]);
  });

  it('Should filter recipes after adding a tag', () => {
    expect(recipeRepo.filteredRecipes).to.have.a.lengthOf(4);

    recipeRepo.checkTag("main dish");

    expect(recipeRepo.filteredRecipes).to.have.a.lengthOf(1);
    expect(recipeRepo.filteredRecipes[0]).to.deep.equal(sampleRecipes[1]);
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

  it('Should also filter recipes by name after adding a tag', () => {
    expect(recipeRepo.filteredRecipes).to.have.a.lengthOf(4);

    recipeRepo.checkTag("main dish");
    expect(recipeRepo.filteredRecipes).to.have.a.lengthOf(1);
    recipeRepo.checkTag("main dish");
    expect(recipeRepo.filteredRecipes).to.have.a.lengthOf(4);

    recipeRepo.checkTag("main dish", "Wing Sauce");

    expect(recipeRepo.filteredRecipes).to.have.a.lengthOf(0);
    expect(recipeRepo.filteredRecipes).to.deep.equal([]);
  });

  it('Should have a method that adds favorites', () => {
    expect(recipeRepo.currentUser.favoriteRecipes).to.deep.equal([]);
    
    recipeRepo.toggleFavorite("123456");
    recipeRepo.toggleFavorite("998765");

    expect(recipeRepo.currentUser.favoriteRecipes).to.deep.equal([123456, 998765]);
  });

  it('Should have that method also remove favorites', () => {    
    recipeRepo.toggleFavorite("123456");

    expect(recipeRepo.currentUser.favoriteRecipes).to.deep.equal([123456]);
  
    recipeRepo.toggleFavorite("123456");

    expect(recipeRepo.currentUser.favoriteRecipes).to.deep.equal([]);
  });

  it('Should also be able to sort by favorites', () => {
    expect(recipeRepo.filteredRecipes).to.deep.equal(sampleRecipes);
    
    recipeRepo.toggleFavorite("595736");

    recipeRepo.checkTag("favorite");

    expect(recipeRepo.filteredRecipes).to.have.a.lengthOf(1);
    expect(recipeRepo.filteredRecipes[0]).to.deep.equal(sampleRecipes[0]);
  });
});
