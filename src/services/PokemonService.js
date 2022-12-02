export async function getAllPokemons() {
  try {
    const response = await fetch('http://localhost:8080/api/pokemons');
    return await response.json();
  } catch (error) {
    return [];
  }
}

export async function createPokemon() {
  const response = await fetch('/api/user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });
  return await response.json();
}
