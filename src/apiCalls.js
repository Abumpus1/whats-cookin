function fetchedUserData() {
  return fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users")
 .then(response => response.json())
}

function fetchedIngredientsData() {
  return fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients")
  .then(response => response.json())
}

function fetchedRecipesData() {
  return fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes")
  .then(response => response.json())
}

export {
  fetchedUserData,
  fetchedIngredientsData,
  fetchedRecipesData
}