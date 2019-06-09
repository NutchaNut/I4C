import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Overview from './Overview';
import Upload from './Upload';
import Download from './Download';
import './App.css';
import HomeContent from './HomeContent'


import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    backgroundColor: '#0098A5',
    //marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  drawerContainer: {
    backgroundColor: '#66615B',
    height: '800px',
  },
  textMenu: {
    color: 'white',
  },
}));

function Home(props) {

  const [values, setValues] = React.useState({
    userData: []  });

  const [selectedLS, setSelectedLS] = React.useState('');

  React.useEffect(() => setValues({userData : props.userData}) , [])

  const classes = useStyles();
  const { container } = props;
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const drawer = (
    <div className={classes.drawerContainer}>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {['Home'].map((text, index) => (
          <Link to="/Home">
            <ListItem button className={classes.textMenu} key={text}>
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {['Overview', 'Upload', 'Download'].map((text, index) => (
          <Link to={`/${text}`}>
            <ListItem button key={text}>
              <ListItemText className={classes.textMenu} primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );


  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar> 
            <div className="toolbarContainer" >
            <Typography >
            {
              values.userData.status == 'admin' ? 
              values.userData.status
                : values.userData.name + " " + values.userData.lastName
            }
            </Typography> 
            </div>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Route
            exact
            path="/Home"
            component={props => (
              <HomeContent
                {...props}
                onLawSuitCardSelected={data => setSelectedLS(data)}
                userData={values.userData}
              />
            )}
          />          
          {/* <Route path="/Overview/" component={Overview} /> */}
          <Route
            exact
            path="/Upload/"
            component={props => (
              <Upload
                {...props}
                selectedLS={selectedLS}
                userData={values.userData}
              />
            )}
          />
          <Route
            exact
            path="/Download/"
            component={props => (
              <Download
                {...props}
                selectedLS={selectedLS}
              />
            )}
          />
        </main>
      </div>
    </Router>
  );
}


export default Home;
