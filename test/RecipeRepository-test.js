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

  it('Should have a method that filters by tag', () => {
    recipeRepo.checkedTags = ["sauce"];
    
    recipeRepo.filterByTags();

    expect(recipeRepo.filteredRecipes).to.deep.equal([sampleRecipes[2]]);
  });

  it('Should have a method that can filter by a different tag', () => {
    recipeRepo.checkedTags = ["snack"];

    recipeRepo.filterByTags();

    expect(recipeRepo.filteredRecipes).to.have.a.lengthOf(2);
    expect(recipeRepo.filteredRecipes[0]).to.deep.equal(sampleRecipes[0]);
    expect(recipeRepo.filteredRecipes[1]).to.deep.equal(sampleRecipes[2]);
  });


  it('Should have a method that can sort based on multiple tags', () => {
    recipeRepo.checkedTags = ["snack"];
    recipeRepo.filterByTags();

    expect(recipeRepo.filteredRecipes).to.have.a.lengthOf(2);
    expect(recipeRepo.filteredRecipes[0]).to.deep.equal(sampleRecipes[0]);
    expect(recipeRepo.filteredRecipes[1]).to.deep.equal(sampleRecipes[2]);

    recipeRepo.checkedTags = ["snack", "sauce"];
    recipeRepo.filterByTags();

    expect(recipeRepo.filteredRecipes).to.have.a.lengthOf(1);
    expect(recipeRepo.filteredRecipes[0]).to.deep.equal(sampleRecipes[2]);
  });

  it('Should have filteredRecipes be empty if tag combination results in no matches', () => {
    recipeRepo.checkedTags = ["snack", "main dish"];
    recipeRepo.filterByTags();

    expect(recipeRepo.filteredRecipes).to.deep.equal([]);
  });

  it('Should have a method that resets filteredRecipes array', () => {
    recipeRepo.checkedTags = ["main dish"];
    recipeRepo.filterByTags();

    expect(recipeRepo.filteredRecipes).to.have.a.lengthOf(1);

    recipeRepo.resetFilteredRecipes();

    expect(recipeRepo.filteredRecipes).to.have.a.lengthOf(4);
    expect(recipeRepo.filteredRecipes).to.deep.equal(sampleRecipes);
  });

  it('Should have a method that sorts based on name', () => {
    recipeRepo.filterBySearchTerm("Cookie");

    expect(recipeRepo.filteredRecipes).to.have.a.lengthOf(1);
    expect(recipeRepo.filteredRecipes[0]).to.deep.equal(sampleRecipes[0]);
  });

  it('Should have a method that sorts based on a different name', () => {
    recipeRepo.filterBySearchTerm("Wing Sauce");

    expect(recipeRepo.filteredRecipes).to.have.a.lengthOf(1);
    expect(recipeRepo.filteredRecipes[0]).to.deep.equal(sampleRecipes[2]);
  });

  it('Should not care about capitals', () => {
    recipeRepo.filterBySearchTerm("COOKIE");

    expect(recipeRepo.filteredRecipes).to.have.a.lengthOf(1);
    expect(recipeRepo.filteredRecipes[0]).to.deep.equal(sampleRecipes[0]);
  });

  it('Should show zero results if search input is not found', () => {
    recipeRepo.filterBySearchTerm("avacado toast");

    expect(recipeRepo.filteredRecipes).to.deep.equal([]);
  });

  it('Should have that method call filterByTags', () => {
    recipeRepo.checkedTags = ["main dish"];
    recipeRepo.filterBySearchTerm("");

    expect(recipeRepo.filteredRecipes).to.have.a.lengthOf(1);
    expect(recipeRepo.filteredRecipes[0]).to.deep.equal(sampleRecipes[1]);
  });

  it('Should not break when input is undefined', () => {
    expect(recipeRepo.filteredRecipes).to.deep.equal(sampleRecipes);

    recipeRepo.filterBySearchTerm();

    expect(recipeRepo.filteredRecipes).to.deep.equal(sampleRecipes);
  });

  it('Should have method that sorts by both name and tag', () => {
    recipeRepo.checkedTags = ["snack"];
    recipeRepo.filterBySearchTerm();

    expect(recipeRepo.filteredRecipes).to.have.a.lengthOf(2);
    expect(recipeRepo.filteredRecipes[0]).to.deep.equal(sampleRecipes[0]);
    expect(recipeRepo.filteredRecipes[1]).to.deep.equal(sampleRecipes[2]);

    recipeRepo.filterBySearchTerm("Wing Sauce");

    expect(recipeRepo.filteredRecipes).to.have.a.lengthOf(1);
    expect(recipeRepo.filteredRecipes[0]).to.deep.equal(sampleRecipes[2]);
  });

  it('Should reset filteredRecipes before filtering to allow for multiple searches', () => {
    recipeRepo.filterBySearchTerm("wing sauce");

    expect(recipeRepo.filteredRecipes).to.have.a.lengthOf(1);
    expect(recipeRepo.filteredRecipes[0]).to.deep.equal(sampleRecipes[2]);

    recipeRepo.filterBySearchTerm("cookie");

    expect(recipeRepo.filteredRecipes).to.have.a.lengthOf(1);
    expect(recipeRepo.filteredRecipes[0]).to.deep.equal(sampleRecipes[0]);
  });

  it('Should have a method to add tag to checked tags array', () => {
    recipeRepo.checkTag("main dish");

    expect(recipeRepo.checkedTags).to.deep.equal(["main dish"]);
  });

  it('Should have a method to add a different tag to checked tags array', () => {
    recipeRepo.checkTag("snack");

    expect(recipeRepo.checkedTags).to.deep.equal(["snack"]);
  });

  it('Should filter recipes after adding a tag', () => {
    recipeRepo.checkTag("main dish");

    expect(recipeRepo.filteredRecipes).to.have.a.lengthOf(1);
    expect(recipeRepo.filteredRecipes[0]).to.deep.equal(sampleRecipes[1]);
  });

  it('Should have a method that removes existing tags from checked tags array', () => {

    recipeRepo.checkTag("main dish");

    expect(recipeRepo.checkedTags).to.deep.equal(["main dish"]);
    expect(recipeRepo.filteredRecipes).to.have.a.lengthOf(1);
    expect(recipeRepo.filteredRecipes[0]).to.deep.equal(sampleRecipes[1]);

    recipeRepo.checkTag("main dish");

    expect(recipeRepo.checkedTags).to.deep.equal([]);
    expect(recipeRepo.filteredRecipes).to.have.a.lengthOf(4);
    expect(recipeRepo.filteredRecipes).to.deep.equal(sampleRecipes);
  });

  it('Should only remove the correct tag from checked tags array', () => {

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
    recipeRepo.checkTag("snack", "Wing Sauce");

    expect(recipeRepo.filteredRecipes).to.have.a.lengthOf(1);
    expect(recipeRepo.filteredRecipes[0]).to.deep.equal(sampleRecipes[2]);
  });

  it('Should have a method that adds favorites', () => {
    expect(recipeRepo.currentUser.favoriteRecipes).to.deep.equal([]);
    
    recipeRepo.toggleFavorite("998765");

    expect(recipeRepo.currentUser.favoriteRecipes).to.deep.equal([998765]);
  });

  it('Should have a method that adds multiple favorites', () => {
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
    recipeRepo.checkedTags = ["favorite"];
    recipeRepo.filterByTags();

    expect(recipeRepo.filteredRecipes).to.have.a.lengthOf(1);
    expect(recipeRepo.filteredRecipes[0]).to.deep.equal(sampleRecipes[0]);
  });

  it('Should have checkTag work with favorites', () => {
    expect(recipeRepo.filteredRecipes).to.deep.equal(sampleRecipes);
    
    recipeRepo.toggleFavorite("595736");
    recipeRepo.checkTag("favorite");

    expect(recipeRepo.filteredRecipes).to.have.a.lengthOf(1);
    expect(recipeRepo.filteredRecipes[0]).to.deep.equal(sampleRecipes[0]);
  });
});
