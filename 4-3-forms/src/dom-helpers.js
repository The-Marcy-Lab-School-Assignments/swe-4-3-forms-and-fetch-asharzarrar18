export function renderPokemon(pokemonObj) {
  const discoveredList = document.querySelector("#discovered-list")

  const listItem = document.createElement("li")

  const image = document.createElement("img")
  image.src = pokemonObj.sprite;
  image.alt = pokemonObj.name;

  const name = document.createElement("p")
  name.textContent = pokemonObj.name;

  const types = document.createElement("p")
  types.textContent = pokemonObj.types;

  listItem.append(image, name, types);

  discoveredList.append(listItem);
}

export function renderError(msg) {
  const errorElement = document.querySelector("#error")

  errorElement.textContent = msg;
}

export function renderSuccess(msg) {
  const successElement = document.querySelector("#success")

  successElement.textContent = msg;
}