import './styles.css';
// import apiCalls from './apiCalls';
import { fetchedUserData, fetchedIngredientsData, fetchedRecipesData } from './apiCalls';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
import RecipeRepository from './classes/recipeRepository';
import usersData from './data/users'
import recipeData from './data/recipes';
import ingredientsData from './data/ingredients';

let activeRecipeRepo //= new RecipeRepository(recipeData, ingredientsData, usersData[Math.floor(Math.random() * usersData.length)]);

//QUERY SELECTORS//
const navTitle = document.querySelector("h1");
const recipesList = document.querySelector(".recipes-list");
const allRecipesPage = document.querySelector(".all-recipes-page-container");
const recipePage = document.querySelector(".recipe-page-container");
const recipeImage = document.querySelector(".recipe-image-large");
const recipeIngredients = document.querySelector(".ingredients-list");
const recipeDirections = document.querySelector(".directions-list");
const addToCookCheckBox = document.querySelector(".save-recipe");
const recipeTotalCost = document.querySelector(".actual-cost");
const tagCheckBoxes = document.querySelector(".tags");
const searchInput = document.querySelector("#query");

//FUNCTIONS//

const fetchAllData = () => {
  let response = []
  Promise.all([fetchedRecipesData(), fetchedIngredientsData(), fetchedUserData()])
    .then(data => response.push(data))
  console.log("this is the response!: ", response);
  assignData(response)
}

const assignData = (response) => {
  setTimeout(() => {
    console.log("1", 1, response[0][2]);

    activeRecipeRepo = new RecipeRepository(response[0][0].recipeData, response[0][1].ingredientsData, response[0][2].usersData[Math.floor(Math.random() * response[0][2].usersData.length)]); 
  },100)
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
        <div>
        <img src="${recipe.image}" class="recipe-image">
        </div>
        <div class="recipe-name-favorite">
        <div class="favorite-button">
        <p id="${recipe.id}">❤️</p>
        </div>
        <div class="recipe-name-label-container">
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
        <div class="recipe-name-label-container">
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
      if (activeRecipeRepo.currentUser.recipesToCook.includes(addToCookCheckBox.id)) {
        addToCookCheckBox.checked = true;
      }
    }
  });
}

const displaySelectedRecipe = (recipe) => {
  addToCookCheckBox.id = `${recipe.id}`

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

const addToCookList = () => {
  activeRecipeRepo.currentUser.decideToCook(addToCookCheckBox.id);
}

//EVENT LISTENERS//
window.addEventListener('load', () =>{
  fetchAllData()
  setTimeout(() => {
  displayAllRecipes()
  },150)
});

navTitle.addEventListener('click', goHome);

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

addToCookCheckBox.addEventListener('click', addToCookList);

searchInput.addEventListener('input', (event) => {
  event.preventDefault();
  searchRecipes();
});
