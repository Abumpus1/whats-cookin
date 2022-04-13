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
