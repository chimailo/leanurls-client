import React, { useState } from "react"
import { useRouter } from 'next/router'
import AppBar, { AppBarProps } from "@material-ui/core/AppBar"
import Avatar from "@material-ui/core/Avatar"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Container from "@material-ui/core/Container"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import { createStyles, makeStyles, Theme, withStyles } from "@material-ui/core/styles"
import { grey } from '@material-ui/core/colors/'

import Link from "./Link"
import firebase from '../lib/firebase'
import { LogoIcon } from './svg'
import { isLoggedIn, logout } from "../lib/auth"
import { MeQuery } from "../generated/graphql"
import * as ROUTES from "../lib/routes"
import NewLinkModal from "./NewLink"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    brandName: {
      fontSize: '1.5rem',
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
    marginLeft: theme.spacing(1),
    fontWeight: theme.typography.fontWeightBold,
  },
}))(Button);

interface HeaderProps {
  page: string
  user?: MeQuery['me']
  bgColor: AppBarProps["color"]
}

export default function Header({ bgColor, page, user }: HeaderProps) {
  const [openModal, setModal] = useState(false)
  const classes = useStyles()
  const router = useRouter()

  const onLogout = () => {
    firebase.auth().signOut()
    router.push(ROUTES.LANDING)
  }

  return (
    <AppBar position="static" elevation={0} color={bgColor}>
      <Container maxWidth='lg' disableGutters>
        <Toolbar>
          <Link href={ROUTES.LANDING} underline="none">
            <Box display='flex' alignItems='center'>
              <LogoIcon viewBox='0 0 40 40' />
              <Typography
                variant='h4'
                className={classes.brandName}
                style={{color: grey['100']}}
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
            {isLoggedIn()
              ? page === 'dashboard'
                ?
                  <>
                    <StyledButton
                      disableElevation
                      color='default'
                      onClick={() => setModal(true)}
                      className={classes.button}
                    >
                      New Link
                    </StyledButton>
                    <StyledButton
                      disableElevation
                      onClick={() => (logout(onLogout))}
                      className={classes.button}
                    >
                      Log out
                    </StyledButton>
                  </>
                :
                <>
                  <Link
                    underline="none"
                    variant="subtitle1"
                    href={ROUTES.DASHBOARD}
                  >
                    <Avatar alt={user?.name} src={user?.avatar} />
                  </Link>
                  <StyledButton
                    disableElevation
                    onClick={() => (logout(onLogout))}
                    className={classes.button}
                  >
                    Log out
                  </StyledButton>
                </>
              : (
                <>
                  <StyledButton
                    disableElevation
                    color="primary"
                    variant="contained"
                    style={{ marginLeft: 16 }}
                    onClick={() => router.push(ROUTES.SIGNUP)}
                  >
                    Sign up
                  </StyledButton>
                  <StyledButton
                    disableElevation
                    onClick={() => router.push(ROUTES.LOGIN)}
                    className={classes.button}
                  >
                    Login
                  </StyledButton>
                </>
              )}
          </Box>
        </Toolbar>
      </Container>
      <NewLinkModal isOpen={openModal} handleClose={() => setModal(false)} />
    </AppBar>
  )
}
