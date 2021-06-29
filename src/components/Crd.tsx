import { makeStyles, Grid, Card, CardActionArea, CardHeader, capitalize, Avatar, CardActions, Button, CardContent, Typography, Collapse } from "@material-ui/core";
import GetAppIcon from '@material-ui/icons/GetApp';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SendIcon from '@material-ui/icons/Send';

import * as React from "react";

const useStyles = makeStyles((theme) => ({
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
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  expand: {
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
  },
}));

const onClick = (action: string, hostname: string) => {
  chrome.runtime.sendMessage({ action: action, hostname: hostname, create: true });
};


export const Crd = ({ connector }: any) => {

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Grid item key={connector.name} xs={12} sm={6} md={4}>
        <Card className={classes.card}>
          <CardActionArea target="_blank" href={connector.requestUrl}>
            <CardHeader
              className={classes.cardHeader}
              title={capitalize(connector.name)}
              titleTypographyProps={{
                //variant: "h6",
                //component: "h2"
              }}
              subheader="Data request page"

              avatar={
                <Avatar
                  alt={capitalize(connector.name) + ' logo'}
                  src={"https://besticon.herokuapp.com/icon?size=32..200..500&url=" + connector.hostname}
                />
              }
            />
          </CardActionArea>

          <Button
            style={{
              justifyContent: "left",
              textTransform: "none"
            }}
            className={classes.expand}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            fullWidth={true}
            endIcon={<ExpandMoreIcon />}
          >
            <Typography align='left' >Show info</Typography>
          </Button>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography>
                {
                  connector.description ? connector.description
                    : "To request your data use the \'Request\' Button, form now on our extension takes over and issues the nessecary clicks on the companies data request page."
                }
              </Typography>
            </CardContent>
          </Collapse>

          <CardActions>
            {connector.actions.map((action: string) => (
              <Button
                size="small"
                variant="text"
                startIcon={
                  action === "request" ? <SendIcon fontSize='inherit' />
                    : action === "download" ? <GetAppIcon fontSize='inherit' />
                      : <></>
                }
                onClick={() => onClick(action, connector.hostname)}
              >
                {action}
              </Button>
            ))}
          </CardActions>

        </Card>
      </Grid>
    </>
  )
}
