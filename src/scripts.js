import './styles.css';
import apiCalls from './apiCalls';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
import RecipeRepository from './classes/recipeRepository';
import usersData from './data/users'
import recipeData from './data/recipes';
import ingredientsData from './data/ingredients';

const activeRecipeRepo = new RecipeRepository(recipeData, ingredientsData, usersData[Math.floor(Math.random() * usersData.length)]);
console.log(activeRecipeRepo);

//QUERY SELECTORS//
const recipesList = document.querySelector(".recipes-list");
const tagFilter = document.querySelector(".tag-filter");
const allRecipesBox = document.querySelector(".all-recipes-box");
const recipePage = document.querySelector(".recipe-page");
const recipeImage = document.querySelector(".large-recipe-image");
const recipeIngredients = document.querySelector(".ingredients");
const recipeDirections = document.querySelector(".directions-list");
const recipeTotalCost = document.querySelector(".actual-cost");
const tagCheckBoxes = document.querySelector(".tags");
const searchInput = document.querySelector("#query");

//FUNCTIONS//
const hide = (element => {
  element.classList.add("hidden");
});

const show = (element => {
  element.classList.remove("hidden")
});

const displayAllRecipes = () => {
  recipesList.innerHTML = "";
  activeRecipeRepo.filteredRecipes.forEach(recipe => {
    recipesList.innerHTML += `
    <section class="recipe" id="${recipe.id}">
      <div>
        <img src="${recipe.image}" class="recipe-image">
      </div>
      <div>
        <h3>${recipe.name}</h3>
      </div>
      <div class="favorite-button">
        <p>🤍</p>
        <p class="hidden">♥️</p>
      </div>
    </section>
    `
  });
}

const displayRecipePage = (event) => {
  activeRecipeRepo.recipes.forEach(recipe => {
    if(event.target.closest(".recipe").id === `${recipe.id}`){
      hide(tagFilter);
      hide(allRecipesBox);
      show(recipePage);
      displaySelectedRecipe(recipe);
    }
  });
}

const displaySelectedRecipe = (recipe) => {
  recipeImage.innerHTML = `<img src="${recipe.image}">`;
  recipeIngredients.innerHTML = "";
  recipe.getIngredientNames(activeRecipeRepo.ingredients).forEach(ingredient => {
    recipeIngredients.innerHTML += `<p>${ingredient}<p>`
  })
  recipe.getRecipeDirections().forEach(direction => {
    recipeDirections.innerHTML += `<p>${direction}<p>`
  })
  recipeTotalCost.innerText = ` $${recipe.getRecipeCost(activeRecipeRepo.ingredients)}`
}

const clickTag = (tagName) => {
  activeRecipeRepo.checkTag(tagName, searchInput.value);
  displayAllRecipes();
}
const searchRecipes = () => {
  activeRecipeRepo.filterByName(searchInput.value);
  displayAllRecipes();
}



//EVENT LISTENERS//
window.addEventListener('load', displayAllRecipes)
recipesList.addEventListener('click', (event) => {
  displayRecipePage(event);
});
tagCheckBoxes.addEventListener('click', (event) => {
  if (event.target.dataset.tagName) {
    clickTag(event.target.dataset.tagName);
  }
});
searchInput.addEventListener('input', (event) => {
  event.preventDefault();
  searchRecipes();
});
