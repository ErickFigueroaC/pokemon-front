import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  getAllPokemons,
  deletePokemon,
  createPokemon,
  updatePokemon,
} from "../services/PokemonService";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";

export function BasicTable() {
  const [pokemons, setPokemons] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const [pokemonObject, setPokemonObject] = useState({
    codigoPokemon: 0,
    codigoEntrenador: 0,
    mote: "",
    especie: "",
    codigoPokedex: 0,
  });

  const handleAlertClose = () => {
    setOpenAlert(false);
    setOpenErrorAlert(false);
  };

  const handleFormClose = () => {
    setOpenForm(!openForm);
  };

  const fetchAllPokemon = () => {
    getAllPokemons().then((pokemonsResponse) => {
      setPokemons(() => pokemonsResponse);
    });
  };

  const handleForm = (e) => {
    setPokemonObject((prevObject) => {
      return { ...prevObject, [e.target.name]: e.target.value };
    });
  };

  const deleteRequest = (id) => {
    deletePokemon(id)
      .then((res) => {
        setOpenAlert(true);
        fetchAllPokemon();
      })
      .catch((error) => {
        setOpenErrorAlert(true);
        setOpenAlert(true);
      });
  };

  const postPokemon = () => {
    createPokemon(pokemonObject)
      .then((res) => {
        setOpenForm(false);
        setOpenAlert(true);
        fetchAllPokemon();
      })
      .catch((error) => {
        setOpenErrorAlert(true);
        setOpenAlert(true);
      });
  };

  const putPokemon = () => {
    updatePokemon(pokemonObject.codigoPokemon, pokemonObject)
      .then((res) => {
        setOpenForm(false);
        setOpenAlert(true);
        fetchAllPokemon();
      })
      .catch((error) => {
        setOpenErrorAlert(true);
        setOpenAlert(true);
      });
  };

  const handleUpdate = (pokemon) => {
    setPokemonObject(pokemon);
    setIsEditing(true);
    setOpenForm(true);
  };

  useEffect(() => {
    fetchAllPokemon();
  }, []);

  return (
    <>
      <Button
        variant="contained"
        onClick={() => {
          setIsEditing(false);
          setPokemonObject({
            codigoPokemon: 0,
            codigoEntrenador: 0,
            mote: "",
            especie: "",
            codigoPokedex: 0,
          });
          setOpenForm(true);
        }}
      >
        Crear
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Mote</TableCell>
              <TableCell align="right">Código entrenador</TableCell>
              <TableCell align="right">Código Pokemon</TableCell>
              <TableCell align="right">Especie</TableCell>
              <TableCell align="right">Código Pokedex</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pokemons.map((pokemon) => (
              <TableRow
                key={pokemon.codigoPokemon}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {pokemon.mote}
                </TableCell>
                <TableCell align="right">{pokemon.codigoEntrenador}</TableCell>
                <TableCell align="right">{pokemon.codigoPokemon}</TableCell>
                <TableCell align="right">{pokemon.especie}</TableCell>
                <TableCell align="right">{pokemon.codigoPokedex}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleUpdate(pokemon);
                    }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    style={buttonStyle}
                    onClick={() => {
                      deleteRequest(pokemon.codigoPokemon);
                    }}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openAlert} onClose={handleAlertClose}>
        <Alert variant="filled" severity="success">
          Acción realizada con éxito
        </Alert>
      </Dialog>
      <Dialog open={openErrorAlert} onClose={handleAlertClose}>
        <Alert variant="filled" severity="error">
          Ocurrió un error al realizar la acción
        </Alert>
      </Dialog>
      <Dialog open={openForm} onClose={handleFormClose}>
        <form style={formStyle}>
          <TextField
            required
            id="codigoPokemon"
            label="Código Pokemon"
            name="codigoPokemon"
            type="number"
            defaultValue={pokemons[pokemons.length - 1]?.codigoPokemon + 1}
            value={pokemonObject.codigoPokemon}
            onChange={handleForm}
          />
          <TextField
            required
            id="codigoEntrenador"
            name="codigoEntrenador"
            label="Código Entrenador"
            defaultValue=""
            type="number"
            value={pokemonObject.codigoEntrenador}
            onChange={handleForm}
          />
          <TextField
            required
            id="mote"
            label="Mote"
            defaultValue=""
            name="mote"
            value={pokemonObject.mote}
            onChange={handleForm}
          />
          <TextField
            required
            id="especie"
            label="Especie"
            defaultValue=""
            name="especie"
            value={pokemonObject.especie}
            onChange={handleForm}
          />
          <TextField
            required
            id="codigoPokedex"
            label="Código Pokedex"
            defaultValue=""
            type="number"
            name="codigoPokedex"
            value={pokemonObject.codigoPokedex}
            onChange={handleForm}
          />
          {isEditing ? (
            <Button variant="contained" onClick={putPokemon}>
              Editar
            </Button>
          ) : (
            <Button variant="contained" onClick={postPokemon}>
              Crear
            </Button>
          )}
        </form>
      </Dialog>
    </>
  );
}

const buttonStyle = {
  marginLeft: "2rem",
};

const formStyle = {
  padding: "3rem",
};
