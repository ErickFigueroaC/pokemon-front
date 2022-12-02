import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getAllPokemons } from '../services/PokemonService';

export function BasicTable() {
  const [pokemons, setPokemons] = useState([]);

  const fetchAllPokemon = () => {
    getAllPokemons().then((pokemons) => {
      console.log(pokemons);
    });
  };

  useEffect(() => {
    getAllPokemons().then((pokemonsResponse) => {
      setPokemons(() => pokemonsResponse);
    });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Mote</TableCell>
            <TableCell align="right">Código entrenador</TableCell>
            <TableCell align="right">Código Pokemon</TableCell>
            <TableCell align="right">Especie</TableCell>
            <TableCell align="right">Código Pokedex</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pokemons.map((pokemon) => (
            <TableRow
              key={pokemon.codigoPokemon}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {pokemon.mote}
              </TableCell>
              <TableCell align="right">{pokemon.codigoEntrenador}</TableCell>
              <TableCell align="right">{pokemon.codigoPokemon}</TableCell>
              <TableCell align="right">{pokemon.especie}</TableCell>
              <TableCell align="right">{pokemon.codigoPokedex}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
