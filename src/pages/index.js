import React from 'react'
import {graphql, Link} from 'gatsby'
import Layout from '../components/layout'
const IndexPage = ({data}) => {
  return (
    <Layout>
      <ul>
        {data.allShopifyProduct.nodes.map((product) => (
          <li key={product.shopifyId}>
            <Link to={product.handle}>{product.title}</Link>
          </li>
        ))}
      </ul>
    </Layout>
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
