import React, { useContext } from "react"
import { navigate } from "gatsby"
import AppBar from "@material-ui/core/AppBar"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Container from "@material-ui/core/Container"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import { createStyles, makeStyles, Theme, withStyles } from "@material-ui/core/styles"
import { grey } from '@material-ui/core/colors/'

import Link from "./Link"
import * as ROUTES from "../lib/routes"
import { FirebaseContext } from "../services/firebase"
import { LogoIcon } from './svg'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      borderRadius: 8,
      fontWeight: 500,
      padding: theme.spacing(1),
      margin: theme.spacing(0, 2),
      "&:hover": {
        backgroundColor: theme.palette.grey[100],
      },
    },
    brandName: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginLeft: theme.spacing(2),
    },
    button: {
      color: theme.palette.grey[200],
    }
  })
)

const StyledButton = withStyles((theme: Theme) => ({
  root: {
    borderRadius: 8,
    textTransform: 'capitalize',
    marginLeft: theme.spacing(2),
    fontWeight: theme.typography.fontWeightBold,
  },
}))(Button);

export default function Header({landing}: {landing?: boolean}) {
    const classes = useStyles()
    const user = useContext(FirebaseContext)

  return (
    <>
    <AppBar position="static" elevation={0} color={landing ? 'transparent' : 'secondary'}>
      <Container maxWidth='lg' disableGutters>
        <Toolbar>
          <Link
            to={ROUTES.LANDING}
            underline="none"
          >
            <Box display='flex' alignItems='center'>
              <LogoIcon viewBox='0 0 40 40' />
              <Typography
                variant='h4'
                className={classes.brandName}
                style={{color: landing ? grey['200'] : 'primary'}}
              >
                <strong>LeanUrls</strong>
              </Typography>
            </Box>
          </Link>
          <Box
            component="nav"
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            flexGrow={1}
          >
            {user
              ? <Link
                  underline="none"
                  variant="subtitle1"
                  color="inherit"
                  to={ROUTES.DASHBOARD}
                  className={classes.link}
                >
                  Dashboard
                </Link>
              : (<>
                    <StyledButton
                      disableElevation
                      color="primary"
                      variant="contained"
                      style={{ marginLeft: 16 }}
                      onClick={() => navigate(ROUTES.SIGNUP)}
                    >
                      Sign up
                    </StyledButton>
                    <StyledButton
                      disableElevation
                      onClick={() => navigate(ROUTES.LOGIN)}
                      className={classes.button}
                    >
                      Login
                    </StyledButton>
                  </>
              )}
          </Box>
        </Toolbar>
          </Container>
      </AppBar>
    </>
  )
}
