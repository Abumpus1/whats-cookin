import { expect } from 'chai';
import Recipe from '../src/classes/Recipe';


describe('Recipe', () => {
  let recipe;
  beforeEach(() => {
    recipe = new Recipe({
      "id": 595736,
      "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
      "ingredients": [
        {
          "id": 20081,
          "quantity": {
            "amount": 1.5,
            "unit": "c"
          }
        },
        {
          "id": 18372,
          "quantity": {
            "amount": 0.5,
            "unit": "tsp"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
          "number": 1
        },
        {
          "instruction": "Add egg and vanilla and mix until combined.",
          "number": 2
        }
      ],
      "name": "Loaded Chocolate Chip Pudding Cookie Cups",
      "tags": [
        "antipasti",
        "starter",
        "snack"
      ]
    });
  });

  it('Should be a function', () => {
    expect(Recipe).to.be.a('function');
  });

  it('Should have an id', () =>{
    expect(recipe.id).to.equal(595736)
  });

  it('Should have an image', () =>{
    expect(recipe.image).to.equal("https://spoonacular.com/recipeImages/595736-556x370.jpg")
  });

  it('Should have ingredients', () => {
    expect(recipe.ingredients).to.deep.equal([{
      "id": 20081,
      "quantity": {
        "amount": 1.5,
        "unit": "c"
      }
    },
    {
      "id": 18372,
      "quantity": {
        "amount": 0.5,
        "unit": "tsp"
      }
    }]);
  });
  it('Should have instructions', () => {
    expect(recipe.instructions).to.deep.equal([
      {
        "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
        "number": 1
      },
      {
        "instruction": "Add egg and vanilla and mix until combined.",
        "number": 2
      }
    ]);
  });

  it('Should have a name', () => {
    expect(recipe.name).to.equal("Loaded Chocolate Chip Pudding Cookie Cups");
  });

  it('Should have tags', () => {
    expect(recipe.tags).to.deep.equal([
      "antipasti",
      "starter",
      "snack"
    ]);
  });
});


//id, image, ingredients, instructions, name, tags
