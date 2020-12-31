require('dotenv').config()

module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-shopify`,
      options: {
        accessToken: process.env.SHOPIFY_TOKEN,
        shopName: `realworldjamstack`,
      },
    },
  ],
}
