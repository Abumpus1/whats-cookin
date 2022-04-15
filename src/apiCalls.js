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


const displayErrorMessage = (err) => {
  const errorBox = document.querySelector(".error-box");
  errorBox.innerHTML = `<h3>Oops, something went wrong. Please check your internet connection or refresh the page.</h3>`  
}

export {
  fetchData
}
