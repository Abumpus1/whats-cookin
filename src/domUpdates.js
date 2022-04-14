
// let domUpdates = {
//   displayAllRecipes() {
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
// },
//   // updateDomMethod2(){...},
// };
//
// export default  domUpdates;
