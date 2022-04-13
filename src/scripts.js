import './styles.css';
import { fetchData } from './apiCalls';
import RecipeRepository from './classes/recipeRepository';

//QUERY SELECTORS//
const menu = document.querySelector(".menu-button");
const recipesList = document.querySelector(".recipes-list");
const allRecipesPage = document.querySelector(".all-recipes-container");
const recipePage = document.querySelector(".recipe-page-container");
const recipeName = document.querySelector(".recipe-name-large");
const recipeImage = document.querySelector(".recipe-image-large");
const recipeIngredients = document.querySelector(".ingredients-list");
const recipeDirections = document.querySelector(".directions-list");
const addToCookCheckBox = document.querySelector(".add-to-cook-checkbox");
const recipeTotalCost = document.querySelector(".actual-cost");
const tagCheckBoxes = document.querySelector(".checkboxes");
const searchInput = document.querySelector("#query");

let activeRecipeRepo;
//FUNCTIONS//

const fetchAllData = () => {
  Promise.all([fetchData("recipes"), fetchData("ingredients"), fetchData("users")])
    .then(data => {
      assignData(data)
      displayAllRecipes()
    })
    .catch(err => console.log(err));
}

const assignData = (response) => {
    activeRecipeRepo = new RecipeRepository(response[0], response[1], response[2][Math.floor(Math.random() * response[2].length)]);
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
          <img src="${recipe.image}" class="recipe-image" alt="${recipe.name}">
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
          <img src="${recipe.image}" class="recipe-image"talt="${recipe.name}">
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
  activeRecipeRepo.filterBySearchTerm(searchInput.value);
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
  recipeDirections.innerHTML = "";
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
  activeRecipeRepo.filterBySearchTerm(searchInput.value);
  displayAllRecipes();
}

const addToCookList = (event) => {
  if(event.target.dataset.tagName === "add-to-cook") {
    activeRecipeRepo.currentUser.decideToCook(addToCookCheckBox.id);
  }
}

//EVENT LISTENERS//
window.addEventListener('load', fetchAllData);
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
