import * as React from "react";
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Crd } from "./components/Crd"
import * as Con from "./connectors";
import { fade, InputBase, Link } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import { useState } from "react";
import * as Utils from './pageUtils';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © DARA ' + new Date().getFullYear() + '.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
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

export default function CardGrid() {
  const classes = useStyles();
  const [filter, setFilter] = useState("");
  const [connectors, setConnectors] = useState<Array<any>>(Object.values(Con));

  const handleSearchChange = (e: any) => {
    setFilter(e.target.value);
  };

  React.useEffect(() => {
    (async () => {
      const connectorsDara = Object.values(Con);
      const jgmdConnectors: any = await Utils.getStorageLocalData("jgmdConnectors");
      const connectors = Utils.merge(jgmdConnectors, connectorsDara, "name");
      console.log("Merged connectors.");
      setConnectors(connectors);
    })();
  }, []);

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
          The DARA project was initiated 2021 during a programming course in the Computer Science Bachelor at TU-Berlin.
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Most of the descriptions displayed under "Info" are retrieved from <Link color="primary" target="_blank" href="https://justgetmydata.com/#">JustGetMyData.com</Link>.
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Also check our <Link color="primary" target="_blank" href="https://dara-tuberlin.netlify.app/#solution">Analysis backend</Link>, it can help you to gain further insights into the requested Data.
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </>
  );
}