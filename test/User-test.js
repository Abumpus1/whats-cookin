import { expect } from 'chai';
import sampleUsers from '../src/data/sample-users';
import sampleIngredients from '../src/data/sample-ingredients';
import sampleRecipes from '../src/data/sample-recipes';
import User from '../src/classes/User';
import Recipe from '../src/classes/Recipe';

describe('User', () => {
  let user, recipeOne, recipeTwo;
  beforeEach(() => {
   user = new User(sampleUsers[0])
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

  it.only('Should have a method to return an array of recipe ingredients missing from users pantry', () => {
    let getMissingIngs = user.findMissingIngredients(recipeTwo);
    console.log(user.missingIngredients)

    expect(user.missingIngredients).to.have.a.lengthOf(2);
  });

  it('Should have a method that calculates amount of ingredient missing from pantry needed for recipe', () => {
    let getMissingNum = user.calculateMissing(recipeTwo.ingredients[1], user.pantry[3])

    expect(getMissingNum).to.equal(3);
});

  it('Should have a method to return pantry array with names of ingredients', () => {
    let userIngredients = user.showPantry(sampleIngredients)

    expect(userIngredients).to.have.a.lengthOf(5)
    expect(userIngredients).to.deep.include({id:20081, name: "wheat flour", amount: 5})
  });
});


/*
x 1). Determine whether a user’s pantry has enough ingredients to cook a given meal.
  - compare each pantry ingredient & amount to recipe ingredient & amount
    - if user has all, can cook

x 2). Determine the amount of missing ingredients still needed to cook a given meal, based on what’s in the user’s pantry.
  - likely links to above, compare ings, if missing ings, return which ings are missing? (guessing filter)

x 3). As a user, I should be able to view what ingredients exist inside of my pantry.
  - display pantry, return each ing name (compare pantry ing id to ingData id) and ing amount

4). As a user, I should be able to check my list of recipes to cook and see if my pantry has enough ingredients to cook a meal.
  - just DOM for #1).

5). As a user, I should be told what ingredients are still needed if I don’t have enough ingredients in my pantry to cook the recipe.
  - DOM for #2). (plus need to compare ids to get names)

6). As a user, I should not be able to cook a recipe if I don’t have the ingredients required.
  - check missingIngredients length




7). As a user, when I cook a meal, those ingredients should be removed from my pantry.
  - (probably filter? maybe splice? ehhh idk.. maybe neither) once pantry has enough ings to cook, need to compare amounts per ingredient,
    and subtract amount from pantry (and maybe possibly remove whole ingredient from pantry if 0..? may be fine if just 0)

  -iterate through both arrays,
   - if id's match, subract recipe ing amount from pantry amount



  promise all =>

   after, iterate through pantry, if pantryIng amount is <= 0, splice


8). As a user, I should be able to add more ingredients to my pantry.
  - be able to add to ingredient amount(either ++ or by specific amount?)
    - should we have the plus on pantry ingredients or recipe ingredients?


    - where it states amount missing per ingredient, have input field to add any # of that ingredient
*/
