import React, { Fragment, useEffect, useState } from "react"
import { Box, CssBaseline } from "@material-ui/core"
import { ThemeProvider } from "@material-ui/core/styles"

import Footer from "./footer"
import Head from "./head"
import useFirebase from '../useFirebase';
import { FirebaseContext } from "../services/firebase"
import { theme } from "../lib/theme"

interface LayoutProps {
  title: string
  author?: string
  description?: string
  image?: string
  children: React.ReactNode
}

export default function Layout(props: LayoutProps) {
  const [user, setUser] = useState<typeof firebase.user>(null)
  const firebase = useFirebase();
  const { children } = props

  useEffect(() => {
    if (!firebase) return;

    return firebase.auth.onAuthStateChanged(user => setUser(user));
  }, [firebase]);

  return (
    <Fragment>
      <Head {...props} />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box display="flex" flexDirection="column" minHeight="100vh">
          <Box flexGrow={1} display='flex'>
            <FirebaseContext.Provider value={user}>
              {children}
            </FirebaseContext.Provider>
          </Box>
          <Footer />
        </Box>
      </ThemeProvider>
    </Fragment>
  )
}
