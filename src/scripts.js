import './styles.css';
import apiCalls from './apiCalls';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
import RecipeRepository from './classes/recipeRepository';
import usersData from './data/users'
import recipeData from './data/recipes';
import ingredientsData from './data/ingredients';

const activeRecipeRepo = new RecipeRepository(recipeData, ingredientsData, usersData[Math.floor(Math.random() * usersData.length)]);

//QUERY SELECTORS//
const recipesList = document.querySelector(".recipes-list");
const allRecipesPage = document.querySelector(".all-recipes-page-container");
const recipePage = document.querySelector(".recipe-page-container");
const recipeImage = document.querySelector(".recipe-image-large");
const recipeIngredients = document.querySelector(".ingredients-list");
const recipeDirections = document.querySelector(".directions-list");
const recipeTotalCost = document.querySelector(".actual-cost");
const tagCheckBoxes = document.querySelector(".tags");
const searchInput = document.querySelector("#query");

//FUNCTIONS//
const hide = (element => {
  element.classList.add("hidden");
});

const show = (element => {
  element.classList.remove("hidden");
});

const displayAllRecipes = () => {
  recipesList.innerHTML = "";
  activeRecipeRepo.filteredRecipes.forEach(recipe => {
    if (activeRecipeRepo.currentUser.favoriteRecipes.includes(recipe.id)) {
      recipesList.innerHTML += `
      <section class="recipe" id="${recipe.id}">
        <div>
          <img src="${recipe.image}" class="recipe-image">
        </div>
        <div class="recipe-name-favorite">
        <div class="favorite-button">
            <p id="${recipe.id}">❤️</p>
          </div>
        <div>
          <h3>${recipe.name}</h3>
        </div>
        </div>
        </section>`
    } else {
    recipesList.innerHTML += `
    <section class="recipe" id="${recipe.id}">
      <div>
        <img src="${recipe.image}" class="recipe-image">
      </div>
      <div class="recipe-name-favorite">
      <div class="favorite-button">
          <p id="${recipe.id}">🤍</p>
        </div>
      <div>
        <h3>${recipe.name}</h3>
      </div>
        </div>
      </section>`
    }
  });
}

const clickFavoriteButton = (event) => {
  activeRecipeRepo.toggleFavorite(event.target.id, searchInput.value);
  activeRecipeRepo.filterByName(searchInput.value);
  displayAllRecipes();
}

const displayRecipePage = (event) => {
  activeRecipeRepo.recipes.forEach(recipe => {
    if(event.target.closest(".recipe").id === `${recipe.id}`){
      hide(allRecipesPage);
      show(recipePage);
      displaySelectedRecipe(recipe);
    }
  });
}

const displaySelectedRecipe = (recipe) => {
  recipeImage.innerHTML = `<img src="${recipe.image}">`;
  recipeIngredients.innerHTML = "";

  recipe.getIngredientNames(activeRecipeRepo.ingredients).forEach(ingredient => {
    recipeIngredients.innerHTML += `<p>${ingredient}<p>`;
  });

  recipe.getRecipeDirections().forEach(direction => {
    recipeDirections.innerHTML += `<p>${direction}<p>`;
  });

  recipeTotalCost.innerText = ` $${recipe.getRecipeCost(activeRecipeRepo.ingredients)}`;
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
window.addEventListener('load', displayAllRecipes);

recipesList.addEventListener('click', (event) => {
  if(event.target.nodeName === 'P'){
    clickFavoriteButton(event);
  } else {
    displayRecipePage(event);
  }
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
