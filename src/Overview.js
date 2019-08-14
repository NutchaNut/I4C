import React from 'react';
import * as firebase from 'firebase';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  button: {
    margin: theme.spacing(1),
  },
}));



function Overview(props) {
  const classes = useStyles();

  const [allFiles, setFiles] = React.useState([]);

  const snapLawsuit = () => {
    firebase
      .database()
      .ref('/lawsuit/'+props.selectedLS+'/files/')
      .once('value')
      .then(snapshot => {
        const vals = snapshot.val();
        const files = Object.keys(vals).map(fileID => ({
          id: fileID,
          ...vals[fileID]
        }));
        console.log(files);
        setFiles(files)
      });
  }
  React.useEffect(() => snapLawsuit(), [])

  return (
    <Paper className={classes.root}>
      <p> lawsuitId : {props.selectedLS}</p>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">User</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allFiles.map(files => (
            <TableRow key={files.id}>
              <TableCell component="th" scope="row">
                {files.filePath}
              </TableCell>
              <TableCell align="right">{files.userId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default Overview;
