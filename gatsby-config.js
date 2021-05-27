module.exports = {
  siteMetadata: {
    title: "leanurls",
    description: "Leaner urls for your convenience",
    author: "chima ilo",
    siteUrl: `https://leanurls.web.app`,
  },
  // flags: { PRESERVE_WEBPACK_CACHE: true },
  plugins: [
    `gatsby-plugin-preact`,
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/app/*`] }
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /svg/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true,
        jsxPragma: `jsx`,
        allExtensions: true,
      },
    },
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google2: [
            {
              family: "Raleway",
              axes: "wght@400;500;700;900",
            },
          ],
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `leanurls`,
        short_name: `leanurls`,
        lang: `en`,
        start_url: `/`,
        background_color: `#e2f3f5`,
        theme_color: `#22d1ee`,
        display: `standalone`,
        icon: `src/assets/favicon.png`,
      },
    },
  ],
}
