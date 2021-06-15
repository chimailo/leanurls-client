import React from "react"
import { Box, AppBarProps } from "@material-ui/core"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Footer from "./Footer"
import Header from "./Header"
import { bg } from "../lib/constants"
import { MeQuery } from "../generated/graphql"

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
  user?: MeQuery['me']
  headerProps?: {
    bgColor: AppBarProps["color"],
    page: string
  }
}

const Wrapper: React.FC<LayoutProps> = (props) => {
  const classes = useStyles(props)
  const { children, headerProps, user } = props
  const page = headerProps ? headerProps.page : ''
  const bgColor = headerProps ? headerProps.bgColor : 'transparent'
  
  return (
    <div className={classes.box}>
      <Box flexGrow={1}>
        <Header bgColor={bgColor} page={page} user={user} />
        {children}
      </Box>
      <Footer page={page} />
    </div>
  )
}

export default  Wrapper