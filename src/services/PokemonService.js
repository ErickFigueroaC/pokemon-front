const DOMAIN = 'http://localhost:8080';

export async function getAllPokemons() {
  try {
    const response = await fetch(`${DOMAIN}/api/pokemons`);
    return await response.json();
  } catch (error) {
    return [];
  }
}

export async function createPokemon(body) {
  body.codigoPokemon = Number(body.codigoPokemon);
  body.codigoEntrenador = Number(body.codigoEntrenador);
  body.codigoPokedex = Number(body.codigoPokedex);
  const response = await fetch(`${DOMAIN}/api/pokemons`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return await response.json();
}

export async function updatePokemon(id, body) {
  body.codigoPokemon = Number(body.codigoPokemon);
  body.codigoEntrenador = Number(body.codigoEntrenador);
  body.codigoPokedex = Number(body.codigoPokedex);
  const response = await fetch(`${DOMAIN}/api/pokemons/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return await response.json();
}

export async function deletePokemon(id) {
  const response = await fetch(`${DOMAIN}/api/pokemons/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
  return await response.json();
}