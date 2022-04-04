import './styles.css';
import { fetchedUserData, fetchedIngredientsData, fetchedRecipesData } from './apiCalls';
import './images/turing-logo.png';
import RecipeRepository from './classes/recipeRepository';

let activeRecipeRepo;

//QUERY SELECTORS//
const navTitle = document.querySelector("h1");
const menu = document.querySelector(".menu-drop");
const recipesList = document.querySelector(".recipes-list");
const allRecipesPage = document.querySelector(".all-recipes-page-container");
const recipePage = document.querySelector(".recipe-page-container");
const recipeName = document.querySelector(".recipe-name-large");
const recipeImage = document.querySelector(".recipe-image-large");
const recipeIngredients = document.querySelector(".ingredients-list");
const recipeDirections = document.querySelector(".directions-list");
const addToCookCheckBox = document.querySelector(".add-to-cook-checkbox");
const recipeTotalCost = document.querySelector(".actual-cost");
const tagCheckBoxes = document.querySelector(".tags");
const searchInput = document.querySelector("#query");

//FUNCTIONS//

const fetchAllData = () => {
  let response = [];
  Promise.all([fetchedRecipesData(), fetchedIngredientsData(), fetchedUserData()])
    .then(data => {
      response.push(data)
      assignData(response)
      displayAllRecipes()
    });
}

const assignData = (response) => {
    activeRecipeRepo = new RecipeRepository(response[0][0].recipeData, response[0][1].ingredientsData, response[0][2].usersData[Math.floor(Math.random() * response[0][2].usersData.length)]); 
}

const hide = (element => {
  element.classList.add("hidden");
});

const show = (element => {
  element.classList.remove("hidden");
});

const goHome = () => {
  hide(recipePage);
  show(allRecipesPage);
  addToCookCheckBox.checked = false;
}

const displayAllRecipes = () => {
  recipesList.innerHTML = "";
  activeRecipeRepo.filteredRecipes.forEach(recipe => {
    if (activeRecipeRepo.currentUser.favoriteRecipes.includes(recipe.id)) {
      recipesList.innerHTML += `
      <section class="recipe" id="${recipe.id}">
        <div class="recipe-image-container">
          <img src="${recipe.image}" class="recipe-image">
        </div>
        <div class="rotated-opposite recipe-name-favorite">
          <div class="favorite-button"> 
            <p id="${recipe.id}">❤️</p>
          </div>
          <div class="recipe-name-label-container">
            <h3 class="recipe-name-label">${recipe.name}</h3>
          </div>
        </div>
      </section>`
    } else {
      recipesList.innerHTML += `
      <section class="recipe" id="${recipe.id}">
        <div>
          <img src="${recipe.image}" class="recipe-image">
        </div>
        <div class="rotated recipe-name-favorite">
          <div class="favorite-button">
            <p id="${recipe.id}">🤍</p>
          </div>
          <div class="recipe-name-label-container">
            <h3 class="recipe-name-label">${recipe.name}</h3>
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
      if (activeRecipeRepo.currentUser.recipesToCook.includes(addToCookCheckBox.id)) {
        addToCookCheckBox.checked = true;
      }
    }
  });
}

const displaySelectedRecipe = (recipe) => {
  addToCookCheckBox.id = `${recipe.id}`
  recipeImage.innerHTML = `<img src="${recipe.image}">`;
  recipeName.innerText = `${recipe.name}`
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

const addToCookList = (event) => {
  if(event.target.dataset.tagName === "add-to-cook") {
    activeRecipeRepo.currentUser.decideToCook(addToCookCheckBox.id);
  }
}

//EVENT LISTENERS//
window.addEventListener('load', fetchAllData);
navTitle.addEventListener('click', goHome);
menu.addEventListener('click', goHome);
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
