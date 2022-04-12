function fetchData(dataLocation) {
  return fetch(`http://localhost:3001/api/v1/${dataLocation}`)
 .then(response => response.json())
 .catch(err => console.log(err));
}

export {
  fetchData
}