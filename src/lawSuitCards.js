import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const cardStyles = makeStyles(theme => ({
  card: {
    width: 275,
    borderRadius: 20,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  button: {
    margin: theme.spacing(1),
  },
}));


function lawSuitCards(props) {
  const classes = cardStyles();

  console.log(props.lawsuitId)

  const sendBack = () => {
    props.onLawSuitCardSelected(props.lawsuitId);
    props.history.push('/Overview/');
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {props.lawsuitId}
        </Typography>
        <CardMedia
          component="img"
          className={{ media: classes.media }}
          image="./folder.png"
        />
        <Button variant="contained" color="primary" className={classes.button} onClick={sendBack} >
            select
        </Button>
      </CardContent>
    </Card>
  );
}

export default lawSuitCards