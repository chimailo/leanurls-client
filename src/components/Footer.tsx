import React from "react";
import { Typography } from "@material-ui/core"
import { createStyles, Theme, makeStyles} from '@material-ui/core/styles';
import Link from "./Link"
import * as ROUTES from "../lib/routes"

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

export default function Footer({page}: {page: string}) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography color={page === 'dashboard' ? 'secondary' : 'inherit'}>
        <Link underline="none" color="inherit" href={ROUTES.TERMS}>
          <small>Terms</small>{" "}
        </Link>
          &#124;{" "}
        <Link underline="none" color="inherit" href={ROUTES.PRIVACY}>
          <small>Privacy Policy</small>{" "}
        </Link>
          &#124;{" "}
          <small>
          Copyright &copy;{new Date().getFullYear() + " "}
        <Link color="inherit" href={ROUTES.LANDING}>
          LeanUrls
        </Link>
          </small>
      </Typography>
    </div>
  )
}
