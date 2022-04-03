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
      <div class="favorite-button">`
      if(!checkFavoritesList(recipe.id)){
        recipesList.innerHTML += `
          <p id="${recipe.id}">🤍</p>
          <p class="hidden" id="${recipe.id}">♥️</p>
        </div>
      </section>`
      } else {
        recipesList.innerHTML += `
          <p class="hidden" id="${recipe.id}">🤍</p>
          <p id="${recipe.id}">♥️</p>
        </div>
      </section>`
    }
  });
}

const checkFavoritesList = (recipeId) => {
 // let isFavorite;
 return activeRecipeRepo.currentUser.favoriteRecipes.includes(recipeId)
  // forEach(favRecipe => {
  //     isFavorite = recipeId === favRecipe
  // });
    // return isFavorite
}

const clickFavoriteButton = (event) => {
  activeRecipeRepo.toggleFavoriteTag(event.target.id);
  console.log(activeRecipeRepo.currentUser.favoriteRecipes);
  displayAllRecipes();
  //if recipeid matches
  //check if tags already include 'favorite'
  //if not - hide white heart, show red
  //if fav is a tag, hide red heart, show white
  //foreach users.favoriteRecipes
  //if recipeID === favoriteRecipes
  //
  //loop through activeRecipeRepo.recipes
  //loop through activeRecipeRepo.users.favoriteRecipes
  //foreach fav recipe === recipe, on that element create element and attach to fav button div
  //
}

const displayRecipePage = (event) => {
  // console.log(event.target.closest(".recipe").id);
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
    recipeIngredients.innerHTML += `<p>${ingredient}<p>`
  });

  recipe.getRecipeDirections().forEach(direction => {
    recipeDirections.innerHTML += `<p>${direction}<p>`
  });

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
  console.log(event.target.nodeName);
  if(event.target.nodeName === 'P'){
    clickFavoriteButton(event);
  } else if (event.target.id){
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
