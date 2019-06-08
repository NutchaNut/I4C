import React from 'react';
import { withRouter } from 'react-router-dom'

import './App.css';
import TextField from '@material-ui/core/TextField';
import * as firebase from 'firebase';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

function Register() {

  const [values, setValues] = React.useState({
    name: '',
    lastName : '',
    idCard : '',
    birthday : '',
    gender : ''
  });

  const handleChange = stateName => event => {
    setValues({ ...values, [stateName]: event.target.value });
  };

  const uploadToFirebase = () => {
    console.log("btn");
    firebase.database().ref('/users/' + values.idCard + '/profile/').set(values);


  };

  return (
    <div className="App">
      <div className = "container">
      <TextField
        id="name"
        label="Name"
        value={values.name}
        onChange={handleChange('name')}
        margin="normal"
      />
      <TextField
        id="lastName"
        label="Last Name"
        value={values.lastName}
        onChange={handleChange('lastName')}
        margin="normal"
      />
      <TextField
        id="idCard"
        label="ID Card Number"
        value={values.idCard}
        onChange={handleChange('idCard')}
        margin="normal"
      />
      <div className="dateContainer">
        <form className={"datePicker"} noValidate>
        <TextField
          id="date"
          label="Birthday"
          type="date"
          onChange={handleChange('birthday')}
          value = {values.birthday}
          InputLabelProps={{
            shrink: true,
          }}
        />
        </form>
        <div>
          <InputLabel htmlFor="gender">Gender</InputLabel>
          <Select
            value={values.gender}
            onChange={handleChange('gender')}
            inputProps={{
              name: 'gender',
              id: 'gender',
            }}
          >
            <MenuItem value={'Male'}>Male</MenuItem>
            <MenuItem value={'Female'}>Female</MenuItem>
          </Select>
        </div>
      </div>
    <div className="btnContainer">
      <Button 
        fullWidth
        variant="contained" 
        color="primary"
        onClick={uploadToFirebase}
      >
          Register
      </Button>
    </div> 
      </div>
    </div>
  );
}

export default withRouter(Register);
