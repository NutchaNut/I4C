import React from 'react';
import * as firebase from 'firebase';
import LawSuitCards from './lawSuitCards'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(2),
    },
    adminContainer:{
        display: 'flex',
        flexDirection : 'row'
    }
  }));

function HomeContent(props) {

    const classes = useStyles();

    const [values, setLawSuite] = React.useState({
        allLawsuit: [],
      });

    const [lawId, addLawSuit] = React.useState({
        addLaw: '',
      });

    const handleChange = stateName => event => {
        addLawSuit({ ...values, [stateName]: event.target.value });
      };

    const addLawSuitId = () => {
        if(lawId.addLaw != null){
            console.log(lawId.addLaw)
            firebase
            .database()
            .ref('/lawsuit/' + lawId.addLaw + '/files/')
            .set(true)
            snapLawsuit()
        }
    }

    const snapLawsuit = () => {
        firebase
          .database()
          .ref('/lawsuit/')
          .once('value')
          .then(snapshot => {
            const vals = snapshot.val();
            const lawsuit = Object.keys(vals);
            console.log(lawsuit);
            setLawSuite({ allLawsuit: lawsuit })
          });
      }

      React.useEffect(() => snapLawsuit(), [])
  return (
    <div>
        {props.userData.status !== 'admin'
            ? <LawSuitCards history={props.history} onLawSuitCardSelected={props.onLawSuitCardSelected} lawsuitId={props.userData.lawsuit} /> 
            :  <div>
                <div>
                    <TextField
                        id="lawsuitId"
                        label="add lawsuit Id"
                        value={lawId.addLaw}
                        onChange={handleChange('addLaw')}
                        margin="normal"
                        />
                    <Button variant="contained" color="primary" className={classes.button} onClick={addLawSuitId} >
                        Add
                    </Button>
                </div>
                <div className={classes.adminContainer} >
                {values.allLawsuit.map((id) => (
                    <LawSuitCards key={id} history={props.history} onLawSuitCardSelected={props.onLawSuitCardSelected} lawsuitId={id} /> 
              ))}
              </div>
              </div>
        }
    </div>
  );
}

export default HomeContent
