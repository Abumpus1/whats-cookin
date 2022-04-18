function fetchData(dataLocation) {
  return fetch(`http://localhost:3001/api/v1/${dataLocation}`)
 .then(response => {
   if (!response.ok) {
   throw Error(response.statusText)
  }
  return response.json()
  })
 .catch(err => displayErrorMessage(err));
}

function postData(userId, ingId, ingAmount) {
  return fetch("http://localhost:3001/api/v1/users", {
    method: 'POST',
    body: JSON.stringify({
      userID: userId,
      ingredientID: ingId,
      ingredientModification: ingAmount
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
    throw Error(response.statusText)
   }
   return response.json()
   })
  .catch(err => console.log(err));
}


const displayErrorMessage = (err) => {
  const errorBox = document.querySelector(".error-box");
  errorBox.innerHTML = `<h3>Oops, something went wrong. Please check your internet connection or refresh the page.</h3>`  
}

export {
  fetchData,
  postData
}
