const FORM_ENDPOINT = "https://formspree.io/f/xzdljdkr";

export async function getRandomPokemon() {
  try {
    const randomId = Math.floor(Math.random() * 150) + 1

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)

    if (!response.ok) {
      throw new Error("Error: unable to fetch Pokémon.");
    }

    const pokemonData = await response.json()

    const pokemonObj = {
      name: pokemonData.name,
      types: pokemonData.types.map((typeObj) => typeObj.type.name).join(", "),
      sprite: pokemonData.sprites.front_default,
    }

    return {
      data: pokemonObj,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error: error,
    }
  }
}

export async function postDiscoveredPokemon(formData) {
  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Error: unable to capture Pokémon.");
    }

    const responseData = await response.json();

    return {
      data: responseData,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error: error,
    }
  }
}