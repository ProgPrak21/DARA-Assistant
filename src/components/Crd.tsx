import { makeStyles, Grid, Card, CardActionArea, CardHeader, capitalize, Avatar, CardActions, Button, CardContent, Typography, Collapse, IconButton } from "@material-ui/core";
import GetAppIcon from '@material-ui/icons/GetApp';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SendIcon from '@material-ui/icons/Send';
import InfoIcon from '@material-ui/icons/Info';
import clsx from 'clsx';

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
    marginLeft: 'auto'
  },
  expandIcon: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandIconOpen: {
    transform: 'rotate(180deg)',
  },
}));

const onClick = (action: string, hostnames: Array<string>) => {
  const hostnamesMatcher: Array<string> = [];
  hostnames.forEach((el) => {
    const matcher = `*://${el}/`;
    hostnamesMatcher.push(matcher);
  })
  let permissions = ['tabs'];
  if (action === 'download')
    permissions.push('downloads')
  chrome.permissions.request({
    permissions: permissions,
    origins: hostnamesMatcher
  }, function (granted) {
    // The callback argument will be true if the user granted the permissions.
    if (granted) {
      chrome.runtime.sendMessage({ action: action, hostname: hostnames[0], create: true });
    }
  });
}


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
              subheader="Data Request Page"
              avatar={
                <Avatar
                  alt={capitalize(connector.name) + ' logo'}
                  src={"https://besticon.herokuapp.com/icon?size=32..200..500&url=" + connector.hostnames[0]}
                />
              }
            />
          </CardActionArea>

          <CardActions disableSpacing>
            {connector.actions.length > 0 &&
              connector.actions.map((action: string) => (
                <Button
                  size="small"
                  variant="text"
                  style={{
                    textTransform:'none',
                  }}
                  startIcon={
                    action === "request" ? <SendIcon fontSize='inherit' />
                      : action === "download" ? <GetAppIcon fontSize='inherit' />
                        : <></>
                  }
                  onClick={() => onClick(action, connector.hostnames)}
                >
                  {capitalize(action)}
                </Button>
              ))
            }
            <Button
              className={classes.expand}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
              style={{
                textTransform:'none',
              }}
              endIcon={
                <ExpandMoreIcon
                  className={clsx(classes.expandIcon, {
                    [classes.expandIconOpen]: expanded,
                  })}
                />
              }
            >
              Info
            </Button>
          </CardActions>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography>
                {
                  connector.description
                    ? connector.description
                    : "To request your data use the \'Request\' Button. Now the Assistant takes over and issues the nessecary clicks on the companies data request page."
                }
              </Typography>
            </CardContent>
          </Collapse>


        </Card>
      </Grid>
    </>
  )
}
