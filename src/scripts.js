import './styles.css';
import domUpdates from './domUpdates.js';
import { fetchData } from './apiCalls';
import RecipeRepository from './classes/recipeRepository';

//QUERY SELECTORS//
const homeButton = document.querySelector(".home-button");
const recipesList = document.querySelector(".recipes-list");
const allRecipesPage = document.querySelector(".all-recipes-page-container");
const recipePage = document.querySelector(".recipe-page-container");
const recipeName = document.querySelector(".recipe-name-large");
const recipeImage = document.querySelector(".recipe-image-large");
const recipeIngredients = document.querySelector(".ingredients-list");
const recipeDirections = document.querySelector(".directions-list");
const addToCookCheckBox = document.querySelector(".add-to-cook-checkbox");
const addToCookInput = document.querySelector(".save-recipe");
const recipeTotalCost = document.querySelector(".actual-cost");
const tagCheckBoxes = document.querySelector(".tags");
const searchInput = document.querySelector("#query");
const recipeCount = document.querySelector(".recipe-count");
const optionsContainer = document.querySelector(".options-container");
const ingSearchBox = document.querySelector(".ing-search-box input");

let activeRecipeRepo;

//FUNCTIONS//
const fetchAllData = () => {
  Promise.all([fetchData("recipes"), fetchData("ingredients"), fetchData("users")])
    .then(data => {
      assignData(data)
      domUpdates.displayAllRecipes(recipesList, recipeCount, activeRecipeRepo)
    })
    .catch(err => console.log(err));
}

const assignData = (response) => {
    activeRecipeRepo = new RecipeRepository(response[0], response[1], response[2][Math.floor(Math.random() * response[2].length)]);
}

const goHome = () => {
  domUpdates.hide(recipePage);
  domUpdates.show(allRecipesPage);
  domUpdates.showVis(searchInput);
  domUpdates.hideSearch(searchInput);
  searchRecipes();
}

const clickFavoriteButton = (event) => {
  activeRecipeRepo.toggleFavorite(event.target.id, searchInput.value);
  activeRecipeRepo.filterBySearchTerm(searchInput.value);
  domUpdates.displayAllRecipes(recipesList, recipeCount, activeRecipeRepo);
}

const displayRecipePage = (event) => {
  activeRecipeRepo.recipes.forEach(recipe => {
    if(event.target.closest(".recipe").id === `${recipe.id}`){
      domUpdates.hide(allRecipesPage);
      domUpdates.hideVis(searchInput);
      domUpdates.show(recipePage);
      domUpdates.displaySelectedRecipe(activeRecipeRepo, recipe, addToCookCheckBox, recipeImage, recipeName, recipeIngredients, recipeDirections, recipeTotalCost, optionsContainer);
      domUpdates.toggleCookInput(activeRecipeRepo, addToCookCheckBox, addToCookInput);
    }
  });
}

const clickTag = (tagName) => {
  activeRecipeRepo.checkTag(tagName, searchInput.value);
  domUpdates.displayAllRecipes(recipesList, recipeCount, activeRecipeRepo)
}

const searchRecipes = () => {
  activeRecipeRepo.filterBySearchTerm(searchInput.value);
  domUpdates.displayAllRecipes(recipesList, recipeCount, activeRecipeRepo)
}

const addToCookList = (event) => {
  if(event.target.dataset.tagName === "add-to-cook") {
    
    activeRecipeRepo.currentUser.decideToCook(parseInt(addToCookCheckBox.id));
  }
}

const openDropdown = () => {
  optionsContainer.classList.toggle("active");
  ingSearchBox.value = "";
  filterIngSearch(ingSearchBox.value);
  if (optionsContainer.classList.contains("active")) {
    ingSearchBox.focus();
  }
}

const checkDropdownId = (event) => {
  if(event.target.dataset.label) {
    // selected.innerText = event.target.dataset.label
    // selected.dataset.id = event.target.dataset.id
    optionsContainer.classList.remove("active")
  }
}

const filterIngSearch = (searchInput) => {
  domUpdates.fillDropdown(activeRecipeRepo, optionsContainer, searchInput.toLowerCase())
}

//EVENT LISTENERS//
window.addEventListener('load', fetchAllData);
homeButton.addEventListener('click', goHome);
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
addToCookCheckBox.addEventListener('click', (event) => {
  addToCookList(event)
});
searchInput.addEventListener('input', (event) => {
  event.preventDefault();
  searchRecipes();
});
optionsContainer.addEventListener("click", (event) => {
  checkDropdownId(event);
});
ingSearchBox.addEventListener("keyup", (event) => {
  filterIngSearch(event.target.value);
});
