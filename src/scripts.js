import './styles.css';
import apiCalls from './apiCalls';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import RecipeRepository from './classes/recipeRepository'
import recipeData from './data/recipes'

const activeRecipeRepo = new RecipeRepository(recipeData)

console.log(activeRecipeRepo);
