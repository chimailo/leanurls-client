import React from "react"
import MuiLink, { LinkProps } from "@material-ui/core/Link"
import { Link as GatsbyLink, GatsbyLinkProps } from "gatsby"

export const ModGatsbyLink = React.forwardRef(
  (
    props: Omit<GatsbyLinkProps<unknown>, "ref">,
    ref: React.Ref<HTMLAnchorElement>
  ) => {
    const { to, activeClassName, ...other } = props

    return (
      <GatsbyLink
        to={to}
        activeClassName={activeClassName}
        innerRef={ref}
        {...other}
      />
    )
  }
)

const Link = React.forwardRef<HTMLAnchorElement, LinkProps & { to: string }>(
  (props, ref) => <MuiLink component={ModGatsbyLink} ref={ref} {...props} />
)

export default Link
