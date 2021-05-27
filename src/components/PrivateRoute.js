import React, { useContext } from "react"
import { navigate } from "gatsby"
import { FirebaseContext } from "../services/firebase"
import * as ROUTES from "../lib/routes"


export default function PrivateRoute({ component: Component, location, ...rest }) {
  const user = useContext(FirebaseContext)

  if (!user && location.pathname !== ROUTES.LOGIN) {
    // If we’re not logged in, redirect to the home page.
    navigate(`/app/login`, { replace: true })
    return null
  }

  return <Component {...rest} />
}
