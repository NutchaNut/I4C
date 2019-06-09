import React from 'react';
import * as firebase from 'firebase';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import Home from './Home';
import App from './App';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';

function FirstPage(props) {
  const [values, setValues] = React.useState({
    userName: '',
    password: '',
  });

  const handleChange = stateName => event => {
    setValues({ ...values, [stateName]: event.target.value });
  };

  const login = () => {
    firebase
      .database()
      .ref('/users/' + values.userName + '/profile/')
      .once('value')
      .then(snapshot => {
        const userData = snapshot.val();
        console.log(userData);
        if(values.userName == "admin" && values.password == userData.password ){
          console.log("success")
          props.callback(userData);
          props.history.push('/Home');
        }else if (userData.birthday == values.password) {
          props.callback(userData);
          props.history.push('/Home');
        }
      });
  };

  const gotoRegister = () => {
    props.history.push('/Register');
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" className={'firstPageContainer'}>
        <TextField
          id="userName"
          label="Username"
          margin="normal"
          value={values.userName}
          onChange={handleChange('userName')}
          fullWidth
        />
        <TextField
          id="password"
          label="password"
          margin="normal"
          type="password"
          value={values.password}
          onChange={handleChange('password')}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          className={'btnContainer'}
          fullWidth
          onClick={login}
        >
          Login
        </Button>
        <Button
          variant="outlined"
          color="primary"
          className={'btnContainer'}
          fullWidth
          onClick={gotoRegister}
        >
          Register
        </Button>
      </Container>
    </React.Fragment>
  );
}

export default withRouter(FirstPage);
