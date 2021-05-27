import React from "react"
import SvgIcon, { SvgIconProps } from "@material-ui/core/SvgIcon"

export default function Logo(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <rect width="40" height="40" rx="8" fill="#F8F8F8"/>
      <path d="M18.3587 1.7876L13.5128 29.6939L8.49888 28.3298L18.3587 1.7876Z" fill="#E40E43"/>
      <path d="M37.129 34.0939L9.20099 30.0131L10.4139 24.9605L37.129 34.0939Z" fill="#E40E43"/>
      <ellipse cx="8.677" cy="28.8033" rx="3.00893" ry="3.02" fill="#E40E43"/>
    </SvgIcon>
  )
}
