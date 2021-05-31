import React, { Fragment, useEffect, useState } from "react"
import { Box, CssBaseline, AppBarProps } from "@material-ui/core"
import { createStyles, makeStyles, Theme, ThemeProvider } from "@material-ui/core/styles"

import Footer from "./Footer"
import Head from "./Head"
import useFirebase from '../useFirebase';
import { FirebaseContext } from "../services/firebase"
import { theme } from "../lib/theme"
import Header from "./Header"
import { bg } from "../lib/constants"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundImage: (props: LayoutProps) => props.headerProps ? 'unset' : bg,
      backgroundColor: (props: LayoutProps) =>
        (props.headerProps && props.headerProps.page === 'dashboard')
          ? theme.palette.background.default
          : 'unset',
    },
  })
)

interface LayoutProps {
  title: string
  author?: string
  description?: string
  image?: string
  children: React.ReactNode
  headerProps?: {
    bgColor: AppBarProps["color"],
    page: string
  }
}

export default function Layout(props: LayoutProps) {
  const classes = useStyles(props)
  // const [user, setUser] = useState<typeof firebase.user>(null)
  // const firebase = useFirebase();
  const { children, headerProps} = props
  const page = headerProps ? headerProps.page : ''
  const bgColor = headerProps ? headerProps.bgColor : 'transparent'

  // useEffect(() => {
  //   if (!firebase) return;

  //   return firebase.auth.onAuthStateChanged(user => setUser(user));
  // }, [firebase]);

  return (
    <Fragment>
      <Head {...props} />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={classes.box}>
          <Box flexGrow={1}>
            {/* <FirebaseContext.Provider value={user}> */}
              <Header bgColor={bgColor} page={page} />
              {children}
            {/* </FirebaseContext.Provider> */}
          </Box>
          <Footer page={`dashboard`} />
        </div>
      </ThemeProvider>
    </Fragment>
  )
}
