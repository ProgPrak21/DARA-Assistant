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

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
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
}));

export default function CardGrid() {
  const classes = useStyles();
  const connectors = Object.values(con);

  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            DARA Company Overview
          </Typography>
        </Toolbar>
      </AppBar>

      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            {/* 
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              DARA Overview
            </Typography>
            */}

            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Here you can find all companies you can currently request your data from with DARA.
              {/* Todo: JGMD / Github / Your data done right */}
            </Typography>

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
            */}
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}

          {/* Card grid */}
          <Grid
            container
            spacing={4}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            {connectors.map((connector) => (
              <Crd connector={connector} />
            ))}
          </Grid>
          {/* End Card grid */}

        </Container>
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