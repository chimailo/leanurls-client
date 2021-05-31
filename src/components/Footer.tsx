import React from "react";
import { graphql, useStaticQuery } from "gatsby"
import { Typography } from "@material-ui/core"
import { createStyles, Theme, makeStyles} from '@material-ui/core/styles';
import {grey } from '@material-ui/core/colors'
import * as ROUTES from "../lib/routes"
import Link from "./Link"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor:'rgba(0, 0, 0, 0.1)',
      display: "flex",
      justifyContent: "center",
      color: theme.palette.grey[300],
      padding: theme.spacing(1, 2),
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

export default function Footer({page}: {page: string}) {
  const { site } = useStaticQuery(QUERY)
  const classes = useStyles()
  console.log(page)

  return (
    <div className={classes.root}>
      <Typography color={page === 'dashboard' ? 'secondary' : 'inherit'}>
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
