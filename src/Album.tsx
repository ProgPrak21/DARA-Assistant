import * as React from "react";
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { capitalize } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import * as con from "./connectors/.";
import "./Album.css";

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
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  cardHeader: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const onClick = (action: string, hostname: string) => {
  chrome.runtime.sendMessage({ action: action, hostname: hostname, create: true });
};

export default function Album() {
  const classes = useStyles();
  const connectors = Object.values(con);

  return (
    <React.Fragment>
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
          <Grid container spacing={4}>
            {connectors.map((connector) => (
              <Grid item key={connector.name} xs={12} sm={6} md={4}>
                <Card className={classes.card}>

                  <CardHeader
                    className={classes.cardHeader}
                    title={capitalize(connector.name)}
                    titleTypographyProps={{
                      variant: "h5",
                      component: "h2"
                    }}
                    avatar={
                      <Avatar
                        alt={capitalize(connector.name) + ' logo'}
                        src={"https://besticon.herokuapp.com/icon?size=32..200..500&url=" + connector.hostname}
                      />
                    }
                  />

                  {/*
                  <CardContent className={classes.cardContent}>
                    <Typography>
                      The following actions are available for this company.
                    </Typography>
                  </CardContent>
                  */}

                  <CardActions>

                    {connector.actions.map((action) => (
                      <Button size="small" color="primary" variant="contained" onClick={() => onClick(action, connector.hostname)}>
                        {action}
                      </Button>
                    ))}

                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
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
    </React.Fragment>
  );
}