
let domUpdates = {
  displayAllRecipes(recipesList, recipeCount, activeRecipeRepo) {
    recipesList.innerHTML = "";
    recipeCount.innerText = activeRecipeRepo.filteredRecipes.length;
    activeRecipeRepo.filteredRecipes.forEach(recipe => {
      if (activeRecipeRepo.currentUser.favoriteRecipes.includes(recipe.id)) {
        recipesList.innerHTML += `
        <section class="recipe" id="${recipe.id}">
          <button class="recipe-image-container recipe-image-button">
            <img src="${recipe.image}" class="recipe-image" alt="${recipe.name}">
          </button>
          <div class="rotated-opposite recipe-name-favorite">
            <button class="favorite-button">
              <p class="heart-icon"id="${recipe.id}">❤️</p>
            </button>
            <div class="recipe-name-label-container">
              <h3 class="recipe-name-label">${recipe.name}</h3>
            </div>
          </div>
        </section>`
      } else {
        recipesList.innerHTML += `
        <section class="recipe" id="${recipe.id}">
          <button class="recipe-image-button">
            <img src="${recipe.image}" class="recipe-image" alt="${recipe.name}">
          </button>
          <div class="rotated recipe-name-favorite">
            <button class="favorite-button">
              <p class="heart-icon" id="${recipe.id}">🤍</p>
            </button>
            <div class="recipe-name-label-container">
              <h3 class="recipe-name-label">${recipe.name}</h3>
            </div>
          </div>
        </section>`
      }
    });
  },

  hide(element) {
    element.classList.add("hidden");
  },

  show(element) {
    element.classList.remove("hidden");
  },

  showVis(element) {
    element.classList.remove("hidden-vis");
  },

  hideVis(element) {
    element.classList.add("hidden-vis");
  },

  hideSearch(searchInput) {
    searchInput.value = "";
  },

  displaySelectedRecipe(activeRecipeRepo, recipe, addToCookCheckBox, recipeImage, recipeName, recipeIngredients, recipeDirections, recipeTotalCost) {
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
  },

  toggleCookInput(activeRecipeRepo, addToCookCheckBox, addToCookInput){
    if (activeRecipeRepo.currentUser.recipesToCook.includes(parseInt(addToCookCheckBox.id))) {
      addToCookInput.checked = true;
    } else {
      addToCookInput.checked = false;
    }
  }

};

export default  domUpdates;
