import { renderPokemon, renderError, renderSuccess } from "./dom-helpers.js";
import { getRandomPokemon, postDiscoveredPokemon } from "./fetch-helpers.js";

const discoverButton = document.querySelector("#discover-button");
const captureForm = document.querySelector("#capture-form");

async function getAndRenderPokemon() {
  const result = await getRandomPokemon();

  if (result.error) {
    renderSuccess("")
    renderError(result.error.message)
    return;
  }

  const pokemon = result.data

  renderPokemon(pokemon)

  captureForm.elements.name.value = pokemon.name
  captureForm.elements.types.value = pokemon.types;

  renderSuccess(`${pokemon.name} was discovered!`)
  renderError("");
}

discoverButton.addEventListener("click", getAndRenderPokemon);

captureForm.addEventListener("submit", async function (event) {
  event.preventDefault()

  const formValues = {
    name: captureForm.elements.name.value,
    types: captureForm.elements.types.value,
    isFavorite: captureForm.elements.isFavorite.checked,
  }

  const result = await postDiscoveredPokemon(formValues);

  if (result.error) {
    renderSuccess("")
    renderError("Error: unable to capture Pokémon. Please try again later")
    return;
  }

  renderSuccess(`${formValues.name} has been captured!`)
  renderError("")

  captureForm.reset();
});

getAndRenderPokemon();