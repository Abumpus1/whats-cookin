import './styles.css';
import domUpdates from './domUpdates.js';
import { fetchData, postData } from './apiCalls';
import RecipeRepository from './classes/recipeRepository';

//QUERY SELECTORS//
const homeButton = document.querySelector(".home-button");
const recipesList = document.querySelector(".recipes-list");
const allRecipesPage = document.querySelector(".all-recipes-page-container");
const recipePage = document.querySelector(".recipe-page-container");
const recipeName = document.querySelector(".recipe-name-large");
const recipeImage = document.querySelector(".recipe-image-large");
const recipeIngredients = document.querySelector(".ingredients-list");
const recipeIngsMissing = document.querySelector(".ingredients-list-oos");
const pantryList = document.querySelector(".pantry-list");
const recipeDirections = document.querySelector(".directions-list");
const addToCookCheckBox = document.querySelector(".add-to-cook-checkbox");
const addToCookInput = document.querySelector(".save-recipe");
const recipeTotalCost = document.querySelector(".actual-cost");
const tagCheckBoxes = document.querySelector(".tags");
const searchInput = document.querySelector("#query");
const recipeCount = document.querySelector(".recipe-count");
const optionsContainer = document.querySelector(".options-container");
const ingSearchBox = document.querySelector(".ing-search-box input");
const addIngButton = document.querySelector(".add-ing-button");
const cookNowButton = document.querySelector(".button-cook-now");
const cookErrMsg = document.querySelector(".cook-error");
const numberInput = document.querySelector("#numberInput");
const addIngErr = document.querySelector(".add-ing-error");

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

const postIngredient = (userId, ingId, ingAmount) => {
  Promise.all([postData(userId, ingId, ingAmount)])
    .then(data => {
      checkResponse(data[0].message);
    })
    .catch(err => console.log(err));
}

const assignData = (response) => {
    activeRecipeRepo = new RecipeRepository(response[0], response[1], response[2][Math.floor(Math.random() * response[2].length)]);
}

const cookAllIngs = () => {
  cookErrMsg.innerText = "Cooking...";
  cookNowButton.disabled = true;
  let recipe = findActiveRecipe();
  let promises = recipe.ingredients.map(ing => {
    return postData(activeRecipeRepo.currentUser.id, ing.id, ing.quantity.amount * -1);
  });
  Promise.all(promises)
    .then(data => {
      data.forEach(d => {
        checkResponse(d.message);
        cookErrMsg.innerText = "";
        checkCookButton();
      })
    })
}

const findActiveRecipe = () => {
  return activeRecipeRepo.recipes.find(recipe => recipe.id === parseInt(addToCookCheckBox.id));
}

const checkResponse = (responseMsg) => {
  let splitResponse = responseMsg.split(" ");
  if (splitResponse[0] === "User") {
    let ingId = parseInt(splitResponse[9]);
    let ingAmount = parseInt(splitResponse[4]);

    activeRecipeRepo.currentUser.pantry.forEach(pantryIng => {
      if (pantryIng.ingredient === ingId) {
        pantryIng.amount = ingAmount
      }
    })

  } else {
    let ingId = parseInt(splitResponse[5]);
    let ingAmount = parseInt(splitResponse[0]);

    activeRecipeRepo.currentUser.pantry.push({
      ingredient: ingId,
      amount: ingAmount
    })
  }
  // domUpdates.displayPantry(pantryList, activeRecipeRepo);
  domUpdates.displaySelectedRecipe(activeRecipeRepo, findActiveRecipe(), addToCookCheckBox, recipeImage, recipeName, recipeIngredients, recipeDirections, recipeTotalCost, optionsContainer, recipeIngsMissing, pantryList);
  checkCookButton()
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
      domUpdates.displaySelectedRecipe(activeRecipeRepo, recipe, addToCookCheckBox, recipeImage, recipeName, recipeIngredients, recipeDirections, recipeTotalCost, optionsContainer, recipeIngsMissing, pantryList);
      domUpdates.toggleCookInput(activeRecipeRepo, addToCookCheckBox, addToCookInput);
    }
  });
  checkCookButton();
  clearInputs();
}

const clearInputs = () => {
  ingSearchBox.value = "";
  numberInput.value = "";
}

const checkCookButton = () => {
  if (activeRecipeRepo.currentUser.missingIngredients.length === 0) {
    cookNowButton.disabled = false;
    cookErrMsg.innerText = "";
  } else {
    cookNowButton.disabled = true;
    cookErrMsg.innerText = "Missing Ingredients";
  }
}

const clickTag = (tagName) => {
  activeRecipeRepo.checkTag(tagName, searchInput.value);
  domUpdates.displayAllRecipes(recipesList, recipeCount, activeRecipeRepo);
}

const searchRecipes = () => {
  activeRecipeRepo.filterBySearchTerm(searchInput.value);
  domUpdates.displayAllRecipes(recipesList, recipeCount, activeRecipeRepo);
}

const addToCookList = (event) => {
  if(event.target.dataset.tagName === "add-to-cook") {
    
    activeRecipeRepo.currentUser.decideToCook(parseInt(addToCookCheckBox.id));
  }
}

const filterIngSearch = (searchInput) => {
  domUpdates.fillDropdown(activeRecipeRepo, optionsContainer, searchInput.toLowerCase())
}

const findIng = () => {
  return activeRecipeRepo.ingredients.find(ing => ing.name.toLowerCase() === ingSearchBox.value.toLowerCase());
}

const addIngredient = () => {
  let ing = findIng();

  if (ing && numberInput.value > 0) {
    addIngErr.innerText = "Added!";
    setTimeout(() => {
      addIngErr.innerText = "";
    }, 2000);
    postIngredient(activeRecipeRepo.currentUser.id, ing.id, parseInt(numberInput.value));
  } else {
    addIngButton.disabled = true;
    addIngErr.innerText = "Error: Input fields empty or invalid";
    setTimeout(() => {
      addIngButton.disabled = false;
      addIngErr.innerText = "";
    },4000);
  }
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
ingSearchBox.addEventListener("input", (event) => {
  event.preventDefault();
  filterIngSearch(event.target.value);
});
addIngButton.addEventListener("click", addIngredient);
cookNowButton.addEventListener("click", cookAllIngs);


