import React from "react";
import { graphql, useStaticQuery } from "gatsby"
import { Typography } from "@material-ui/core"
import { createStyles, Theme, makeStyles} from '@material-ui/core/styles';
import {grey } from '@material-ui/core/colors'
import * as ROUTES from "../lib/routes"
import Link from "./Link"
import {bg} from '../lib/constants'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundImage: bg,
      borderTop: `1px solid ${grey[400]}`,
      display: "flex",
      padding: theme.spacing(2),
      justifyContent: "center",
    },
  })
)

const QUERY = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

export default function Footer() {
  const { site } = useStaticQuery(QUERY)
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography style={{ color: grey[200] }}>
        <Link underline="none" color="inherit" to={ROUTES.TERMS}>
          <small>Terms</small>{" "}
        </Link>
          &#124;{" "}
        <Link underline="none" color="inherit" to={ROUTES.PRIVACY}>
          <small>Privacy Policy</small>{" "}
        </Link>
          &#124;{" "}
          <small>
          Copyright &copy;{new Date().getFullYear() + " "}
        <Link color="inherit" to={ROUTES.LANDING}>
          {site.siteMetadata.title}
        </Link>
          </small>
      </Typography>
    </div>
  )
}
