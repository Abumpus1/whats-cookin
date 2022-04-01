import './styles.css';
import apiCalls from './apiCalls';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import RecipeRepository from './classes/recipeRepository'
import recipeData from './data/recipes'

const activeRecipeRepo = new RecipeRepository(recipeData)

//QUERY SELECTORS//
const recipesList = document.querySelector(".recipes-list");
const tagFilter = document.querySelector(".tag-filter");
const allRecipesBox = document.querySelector(".all-recipes-box");
const recipePage = document.querySelector(".recipe-page");
const recipeImage = document.querySelector(".large-recipe-image");
const recipeIngredients = document.querySelector(".ingredients");
const recipeDirections = document.querySelector(".directions-list");
const recipeTotalCost = document.querySelector(".actual-cost");

//FUNCTIONS//
const hide = (element => {
  element.classList.add("hidden");
});

const show = (element => {
  element.classList.remove("hidden")
});

const displayAllRecipes = () => {
  recipesList.innerHTML = "";
  activeRecipeRepo.recipes.forEach(recipe => {
    recipesList.innerHTML += `
    <section class="recipe" id="${recipe.id}">
      <div>
        <img src="${recipe.image}" class="recipe-image">
      </div>
      <div>
        <h3>${recipe.name}</h3>
      </div>
    </section>
    `
  })
}

const displayRecipePage = (event) => {
  activeRecipeRepo.recipes.forEach(recipe => {
    if(event.target.closest(".recipe").id === `${recipe.id}`){
      hide(tagFilter);
      hide(allRecipesBox);
      show(recipePage);
      displaySelectedRecipe(recipe);
      console.log(recipe);
    }
  });
}

const displaySelectedRecipe = (recipe) => {
  //innerHTML all up in here
  recipeImage.innerHTML = `<img src="${recipe.image}">`;
  recipeIngredients.innerHTML = "";
  recipe.getIngredientNames().forEach(ingredient => {
    recipeIngredients.innerHTML += `<p>${ingredient}<p>`
  })
  // recipeDirections.innerHTML
  // recipeTotalCost.innerText
}


//EVENT LISTENERS//
window.addEventListener('load', displayAllRecipes)
recipesList.addEventListener('click', (event) => {
  displayRecipePage(event);
})
