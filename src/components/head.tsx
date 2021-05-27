import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Helmet } from "react-helmet"

interface HeadProps {
  title: string
  image?: string
  author?: string
  description?: string
  pathname?: string
}

// Go to https://github.com/jlengstorf/gatsby-theme-jason-blog/blob/master/src/components/SEO/SEO.js

const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        author
        siteUrl
      }
    }
  }
`

export default function Head(props: HeadProps) {
  const { site } = useStaticQuery(query)
  const title = props.title ? props.title : site.siteMetadata.title
  const image = props.image ? props.image : null
  const description = props.description
    ? props.description
    : site.siteMetadata.description

  return (
    <React.Fragment>
      <Helmet>
        {/* <html lang="en" />
        <meta charSet="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
        <title>{title} | {description ?  description : 'LeanUrls'}}</title>
        <meta name="csrf_token" content="" />
        <meta property="type" content="website" />
        <meta name="author" content={site.siteMetadata.author} />
        <meta name="theme-color" content="#ED0C63" />
        <meta property="title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        {image && <meta property="og:image" content={image} />}
        <meta content="image/*" property="og:image:type" />
        <meta property="og:site_name" content="LeanUrls" />
        <meta property="og:description" content={description} />
        {props.author && <meta name="twitter:creator" content={props.author} />}
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:card" content='summary_large_image' />
        {image && <meta property="twitter:image" content={image} />}
      </Helmet>
    </React.Fragment>
  )
}
