import { expect } from 'chai';
import Ingredient from '../src/classes/Ingredient';
import sampleIngredients from '../src/data/sample-ingredients';

describe('Ingredient', () => {
  let ingredient
  beforeEach(() => {
    ingredient = new Ingredient(sampleIngredients[0])
  });

  it('Should be a function', () => {
    expect(Ingredient).to.be.a('function');
  });


});
