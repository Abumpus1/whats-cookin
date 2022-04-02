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

});
