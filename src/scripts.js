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

const hide = (element => {
  element.classList.add("hidden");
});

const show = (element => {
  element.classList.remove("hidden");
});

const showVis = (element => {
  element.classList.remove("hidden-vis");
});

const hideVis = (element => {
  element.classList.add("hidden-vis");
});


const goHome = () => {
  hide(recipePage);
  show(allRecipesPage);
  showVis(searchInput);
  searchInput.value = "";
}

// const displayAllRecipes = () => {
//   recipesList.innerHTML = "";
//   recipeCount.innerText = activeRecipeRepo.filteredRecipes.length;
//   activeRecipeRepo.filteredRecipes.forEach(recipe => {
//     if (activeRecipeRepo.currentUser.favoriteRecipes.includes(recipe.id)) {
//       recipesList.innerHTML += `
//       <section class="recipe" id="${recipe.id}">
//         <button class="recipe-image-container recipe-image-button">
//           <img src="${recipe.image}" class="recipe-image" alt="${recipe.name}">
//         </button>
//         <div class="rotated-opposite recipe-name-favorite">
//           <div class="favorite-button">
//             <p id="${recipe.id}">❤️</p>
//           </div>
//           <div class="recipe-name-label-container">
//             <h3 class="recipe-name-label">${recipe.name}</h3>
//           </div>
//         </div>
//       </section>`
//     } else {
//       recipesList.innerHTML += `
//       <section class="recipe" id="${recipe.id}">
//         <button class="recipe-image-button">
//           <img src="${recipe.image}" class="recipe-image" alt="${recipe.name}">
//         </button>
//         <div class="rotated recipe-name-favorite">
//           <div class="favorite-button">
//             <p id="${recipe.id}">🤍</p>
//           </div>
//           <div class="recipe-name-label-container">
//             <h3 class="recipe-name-label">${recipe.name}</h3>
//           </div>
//         </div>
//       </section>`
//     }
//   });
// }

const clickFavoriteButton = (event) => {
  activeRecipeRepo.toggleFavorite(event.target.id, searchInput.value);
  activeRecipeRepo.filterBySearchTerm(searchInput.value);
  domUpdates.displayAllRecipes(recipesList, recipeCount, activeRecipeRepo);
}

const displayRecipePage = (event) => {
  activeRecipeRepo.recipes.forEach(recipe => {
    if(event.target.closest(".recipe").id === `${recipe.id}`){
      hide(allRecipesPage);
      hideVis(searchInput);
      show(recipePage);
      displaySelectedRecipe(recipe);
      if (activeRecipeRepo.currentUser.recipesToCook.includes(addToCookCheckBox.id)) {
        addToCookInput.checked = true;
      } else {
        addToCookInput.checked = false;
      }
    }
  });
}

const displaySelectedRecipe = (recipe) => {
  addToCookCheckBox.id = `${recipe.id}`
  recipeImage.innerHTML = `<img src="${recipe.image}" alt="${recipe.name}">`;
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
  domUpdates.displayAllRecipes(recipesList, recipeCount, activeRecipeRepo)
}

const searchRecipes = () => {
  activeRecipeRepo.filterBySearchTerm(searchInput.value);
  domUpdates.displayAllRecipes(recipesList, recipeCount, activeRecipeRepo)
}

const addToCookList = (event) => {
  if(event.target.dataset.tagName === "add-to-cook") {
    activeRecipeRepo.currentUser.decideToCook(addToCookCheckBox.id);
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
