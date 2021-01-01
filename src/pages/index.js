import React from 'react'
import {graphql, Link} from 'gatsby'
const IndexPage = ({data}) => {
  return (
    <ul>
      {data.allShopifyProduct.nodes.map((product) => (
        <li key={product.shopifyId}>
          <Link to={product.handle}>{product.title}</Link>
        </li>
      ))}
    </ul>
  )
}

export const query = graphql`
  query productsQuery {
    allShopifyProduct {
      nodes {
        title
        shopifyId
        handle
      }
    }
  }
`
export default IndexPage
