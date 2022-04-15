import { expect } from 'chai';
import sampleUsers from '../src/data/sample-users';
import User from '../src/classes/User';

describe('User', () => {
  let user;
  beforeEach(() => {
   user = new User(sampleUsers[0])
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

  
});


/* 
1). Determine whether a user’s pantry has enough ingredients to cook a given meal.
  - compare each pantry ingredient & amount to recipe ingredient & amount
    - if user has all, can cook

2). Determine the amount of missing ingredients still needed to cook a given meal, based on what’s in the user’s pantry.
  - likely links to above, compare ings, if missing ings, return which ings are missing? (guessing filter)



x 3). As a user, I should be able to view what ingredients exist inside of my pantry.
  - display pantry, return each ing name (compare pantry ing id to ingData id) and ing amount

4). As a user, I should be able to check my list of recipes to cook and see if my pantry has enough ingredients to cook a meal.
  - just DOM for #1).

5). As a user, I should be told what ingredients are still needed if I don’t have enough ingredients in my pantry to cook the recipe.
  - DOM for #2). (plus need to compare ids to get names)

6). As a user, I should not be able to cook a recipe if I don’t have the ingredients required.
  - (.every maybe?) need to make sure pantry has all needed ingredients and correct amounts

7). As a user, when I cook a meal, those ingredients should be removed from my pantry.
  - (probably filter? maybe splice? ehhh idk.. maybe neither) once pantry has enough ings to cook, need to compare amounts per ingredient,
    and subtract amount from pantry (and maybe possibly remove whole ingredient from pantry if 0..? may be fine if just 0) 

8). As a user, I should be able to add more ingredients to my pantry.
  - be able to add to ingredient amount(either ++ or by specific amount?) 
    - should we have the plus on pantry ingredients or recipe ingredients?
*/