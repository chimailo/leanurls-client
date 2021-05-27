import React from "react"
import { Router } from "@reach/router"
import Dashboard from "../components/pages/Dashboard"
import Login from "../components/pages/Login"
import Signup from "../components/pages/Signup"
import PrivateRoute from "../components/PrivateRoute"
import * as ROUTES from "../lib/routes"

export default function App() {
  return (
    <Router>
      <PrivateRoute path={`/app/${ROUTES.DASHBOARD}`} component={Dashboard} />
      <Login path="/app/login" />
      <Signup path="/app/signup" />
    </Router>
  )
}
