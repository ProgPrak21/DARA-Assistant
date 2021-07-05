import * as React from "react";
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { Crd } from "./components/Crd"
import * as con from "./connectors";
import { fade, InputBase } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import { useState } from "react";



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        DARA
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function getStorageLocalData(key: string) {
  // Immediately return a promise and start asynchronous work
  return new Promise((resolve, reject) => {
    // Asynchronously fetch all data from storage.sync.
    chrome.storage.local.get([key], (result) => {
      // Pass any observed errors down the promise chain.
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }
      // Pass the data retrieved from storage down the promise chain.
      resolve(result);
    });
  });
}

export default function CardGrid() {
  const classes = useStyles();
  const [filter, setFilter] = useState("");
  const [connectors, setConnectors] = useState<Array<any>>(Object.values(con));

  const handleSearchChange = (e: any) => {
    setFilter(e.target.value);
  };

  (async () => {
    const merge = (arr1: Array<any>, arr2: Array<any>, prop: string) =>
      arr1.filter(
        elArr1 => !arr2.find(
          elArr2 => elArr1[prop].toUpperCase() === elArr2[prop].toUpperCase()
        )
      ).concat(arr2).sort((a, b) => a.name.localeCompare(b.name));
    const connectors: Array<any> = (await getStorageLocalData ("connectors") as any).connectors
    const tmp =  merge(connectors, Object.values(con), "name");
    setConnectors(tmp);
  })();

  return (
    <>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap className={classes.title}>
            DARA Company Overview
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleSearchChange}
            />
          </div>
        </Toolbar>
      </AppBar>

      <main>
        {/* Hero unit */}
        {/*<div className={classes.heroContent}>
           <Container maxWidth="sm">
            
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              DARA Overview
            </Typography>
            */}
        {/*
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              All companies currently supported.
              {/* 
              Todo: JGMD / Github / Your data done right 
              <p>
                You may send an email based request via <a className="App-link" target="_blank" href="https://www.mydatadoneright.eu/cy/request/type">My Data Done Right</a>.
              </p>
              
            </Typography>
            */}
        {/*
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Main call to action
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Secondary action
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
          
        </div>*/}
        {/* End hero unit */}

        {/* Card grid */}
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid
            container
            spacing={4}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            {connectors &&
              connectors.map((connector: any) => (
                connector.name.toLowerCase().includes(filter.toLowerCase()) &&
                <Crd connector={connector} />
              ))
            }
          </Grid>
        </Container>
        {/* End Card grid */}

      </main>

      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          DARA - Data Access Request Analysis
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          The DARA project was innitiated during a programming ..
          Also check out our Analysis backend!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}

    </>
  );
}