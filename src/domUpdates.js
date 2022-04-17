
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

  displaySelectedRecipe(activeRecipeRepo, recipe, addToCookCheckBox, recipeImage, recipeName, recipeIngredients, recipeDirections, recipeTotalCost, optionsContainer, recipeIngsMissing, pantryList) {
    addToCookCheckBox.id = `${recipe.id}`
    recipeImage.innerHTML = `<img src="${recipe.image}" alt="${recipe.name}">`;
    recipeName.innerText = `${recipe.name}`
    recipeIngredients.innerHTML = "";
    recipeIngsMissing.innerHTML = "";
    recipeDirections.innerHTML = "";
    activeRecipeRepo.currentUser.findMissingIngredients(recipe)
    recipe.getIngredientNames(activeRecipeRepo.ingredients).forEach(ingredient => {
      if (activeRecipeRepo.currentUser.missingIngredients.some(missingIng => missingIng.id === ingredient.id)) {
        recipeIngsMissing.innerHTML += `
        <p>(${ingredient.amount}) ${ingredient.name}<p>
        <p class="missing-amount">Missing ${activeRecipeRepo.currentUser.missingIngredients.find(missingIng => missingIng.id === ingredient.id).amountMissing}<p>
        `;
      } else {
        recipeIngredients.innerHTML += `<p>(${ingredient.amount}) ${ingredient.name}<p>`;
      }
    });

    this.displayPantry(pantryList, activeRecipeRepo)
    
    recipe.getRecipeDirections().forEach(direction => {
      recipeDirections.innerHTML += `<p>${direction}<p>`;
    });
    recipeTotalCost.innerText = ` $${recipe.getRecipeCost(activeRecipeRepo.ingredients)}`;
    this.fillDropdown(activeRecipeRepo, optionsContainer)
  },

  displayPantry(pantryList, activeRecipeRepo) {
    pantryList.innerHTML = "";
    activeRecipeRepo.currentUser.showPantry(activeRecipeRepo.ingredients).forEach(pantryIng => {
      pantryList.innerHTML += `<p>(${pantryIng.amount}) ${pantryIng.name}<p>`
    });
  },

  fillDropdown(activeRecipeRepo, optionsContainer, searchInput) {
    if (!searchInput) {
      searchInput = "";
    }
    optionsContainer.innerHTML = ""
    let sortedIngredients = activeRecipeRepo.ingredients.sort((a, b) => {
      let aUp = a.name.toUpperCase();
      let bUp = b.name.toUpperCase();
      if (aUp > bUp) {
        return 1;
      }
      if (aUp < bUp) {
        return -1;
      }
      return 0;
    });
    sortedIngredients.forEach(ingredient => {
      if (ingredient.name.toLowerCase().includes(searchInput)) {
        optionsContainer.innerHTML += `
          <option value="${ingredient.name}" data-label="${ingredient.name}" class="radio" id="${ingredient.id}" data-id="${ingredient.id}" name="category">${ingredient.name}</option>
        `
      }
    });
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
