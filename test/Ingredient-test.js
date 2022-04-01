import { expect } from 'chai';
import Ingredient from '../src/classes/Ingredient';
import sampleIngredients from '../src/data/sample-ingredients';

describe('Ingredient', () => {
  let ingredient;

  beforeEach(() => {
    ingredient = new Ingredient(sampleIngredients[0]);
  });

  it('Should be a function', () => {
    expect(Ingredient).to.be.a('function');
  });
  
  it('Should have an id', () => {
    expect(ingredient.id).to.equal(20081);
  });

  it('Should have a name', () => {
    expect(ingredient.name).to.equal('wheat flour');
  });

  it('Should have an estimated cost in cents', () => {
    expect(ingredient.estimatedCostInCents).to.equal(142);
  });
});
