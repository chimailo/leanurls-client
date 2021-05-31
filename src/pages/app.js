import React from "react"
import { Router } from "@reach/router"
import Dashboard from "../components/pages/Dashboard"
import Login from "../components/pages/Login"
import PrivateRoute from "../components/PrivateRoute"
import Signup from "../components/pages/Signup"
import * as ROUTES from "../lib/routes"

export default function App() {
  return (
    <Router>
      <PrivateRoute path={`${ROUTES.DASHBOARD}`} component={Dashboard} />
      <Login path={`${ROUTES.LOGIN}`} />
      <Signup path={`${ROUTES.SIGNUP}`} />
    </Router>
  )
}
