import './styles.css';
import apiCalls from './apiCalls';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import RecipeRepository from './classes/recipeRepository'
import recipeData from './data/recipes'

const activeRecipeRepo = new RecipeRepository(recipeData)

//QUERY SELECTORS//
const recipesList = document.querySelector(".recipes-list");


//EVENT LISTENERS//
//function on page load that goes through recipes array and displays within HTML each recipe
const displayAllRecipes = () => {
  //loop through recipes data, for each recipe recipesList.innerHTML +=
  recipesList.innerHTML = "";
  activeRecipeRepo.recipes.forEach(recipe => {
    // let recipeOne = document.createElement("div");
    // recipeOne.className = "recipe";
    // recipesList.appendChild(recipeOne);
    recipesList.innerHTML += `
    <section class="recipe">
      <div>
        <img src="${recipe.image}" class="recipe-image">
      </div>
      <div>
        <h3>${recipe.name}</h3>
      </div>
    </section>
    `
    //grab each recipe from our activeRecipeRepo
    //once we got it, want to create a new element and assign a class to then add to recipes list section
    //innerHTML
  })
}

window.addEventListener('load', displayAllRecipes)
