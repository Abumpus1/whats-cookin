import { expect } from 'chai';
import sampleUsers from '../src/data/sample-users';
import sampleIngredients from '../src/data/sample-ingredients';
import sampleRecipes from '../src/data/sample-recipes';
import User from '../src/classes/User';
import Recipe from '../src/classes/Recipe';

describe('User', () => {
  let user, userTwo, recipeOne, recipeTwo;
  beforeEach(() => {
   user = new User(sampleUsers[0])
   userTwo = new User(sampleUsers[1])
   recipeOne = new Recipe(sampleRecipes[0])
   recipeTwo = new Recipe(sampleRecipes[2])
  });

  it('Should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('Should have a name', () => {
    expect(user.name).to.equal('Saige O\'Kon');
  });

  it('Should have an id', () => {
    expect(user.id).to.equal(1);
  });

  it('Should have a pantry', () => {
    expect(user.pantry).to.deep.equal(sampleUsers[0].pantry);
  });

  it('Should have an array of favorite recipes', () => {
    expect(user.favoriteRecipes).to.deep.equal([]);
  });

  it('Should have an array of recipe to cook', () => {
    expect(user.recipesToCook).to.deep.equal([]);
  });

  it('Should have an array of missing Ingredients', () => {
    expect(user.missingIngredients).to.deep.equal([]);
  });

  it('Should have a method to add recipe ID to array', () => {
    user.toggleId(595736, user.favoriteRecipes);

    expect(user.favoriteRecipes).to.deep.equal([595736]);
  });

  it('Should allow that method to add several recipe IDs to array', () => {
    user.toggleId(595736, user.favoriteRecipes);
    user.toggleId(412309, user.favoriteRecipes);

    expect(user.favoriteRecipes).to.deep.equal([595736, 412309]);
  });

  it('Should have a method to remove recipe IDs from array', () => {
    user.toggleId(595736, user.favoriteRecipes);

    expect(user.favoriteRecipes).to.deep.equal([595736]);

    user.toggleId(595736, user.favoriteRecipes);

    expect(user.favoriteRecipes).to.deep.equal([]);
  });

  it('Should have same method be able to add to a different array', () => {
    user.toggleId(595736, user.recipesToCook);

    expect(user.recipesToCook).to.deep.equal([595736]);
  });

  it('Should have a method that calls toggleId for favorites', () => {
    user.toggleFavoriteRecipe(595736);

    expect(user.favoriteRecipes).to.deep.equal([595736]);
  });

  it('Should have a method that calls toggleId for recipesToCook', () => {
    user.decideToCook(595736);

    expect(user.recipesToCook).to.deep.equal([595736]);
  });

  it('Should have a method to return an array of recipe ingredients missing from users pantry', () => {
    user.findMissingIngredients(recipeTwo);

    expect(user.missingIngredients).to.have.a.lengthOf(2);
    expect(user.missingIngredients[0]).to.deep.equal({ id: 1002030, amountMissing: 4 });
    expect(user.missingIngredients[1]).to.deep.equal({ id: 19334, amountMissing: 3 });
  });

  //THIS EXISTS JUST NOT ENOUGH
  it.only('Should calculate amount if user has ingredient in pantry but not enough for recipe', () => {
    user.findMissingIngredients(recipeTwo);

    expect(recipeTwo.ingredients[1].quantity.amount).to.equal(8);
    expect(user.pantry[3].amount).to.equal(5);
    expect(user.missingIngredients[1]).to.deep.equal({ id: 19334, amountMissing: 3 });
  })

  //THIS ONE DOES NOT EXIST IN PANTRY - 1002030
  // it('Should have a method to ')



  it('Should have a method that calculates amount of ingredient missing from pantry needed for recipe', () => {
    let getMissingNum = user.calculateMissing(recipeTwo.ingredients[1], user.pantry[3]);

    expect(getMissingNum).to.equal(3);
  });

  it('Should have a method to return pantry array with names of ingredients', () => {
    let userIngredients = user.showPantry(sampleIngredients);

    expect(userIngredients).to.have.a.lengthOf(5);
    expect(userIngredients).to.deep.include({id:20081, name: "wheat flour", amount: 5});
  });

});
