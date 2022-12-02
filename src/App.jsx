//import './App.css';
import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { display, width } from '@mui/system';
import { BasicTable } from './components/BasicTable';

function App() {
  const buttonStyle = {
    width: '25%',
    height: '100%',
  };

  const barStyle = {};
  return (
    <React.Fragment>
      <div style={{ width: '50%' }}>
        <Button variant="contained" style={buttonStyle}>
          Show
        </Button>
        <Button variant="contained" style={buttonStyle}>
          Delete
        </Button>
        <Button variant="contained" style={buttonStyle}>
          Create
        </Button>
        <Button variant="contained" style={buttonStyle}>
          Edit
        </Button>
        <div
          style={{
            backgroundColor: '#455a64',
            display: 'grid',
            width: '100%',
            height: '400px',
          }}
        ></div>
      </div>

      <div style={{ width: '50%', marginLeft: '50%', height: '100%' }}>
        <TextField
          id="outlined-basic"
          label="Data"
          variant="outlined"
          style={{ marginTop: '-400px' }}
        />
        <TextField
          id="outlined-basic"
          label="Data"
          variant="outlined"
          style={{ marginTop: '-300px' }}
        />
        <TextField
          id="outlined-basic"
          label="Data"
          variant="outlined"
          style={{ marginTop: '-200px' }}
        />
        <TextField
          id="outlined-basic"
          label="Data"
          variant="outlined"
          style={{ marginTop: '-100px' }}
        />
      </div>

      <BasicTable></BasicTable>
    </React.Fragment>
  );
}
export default App;
