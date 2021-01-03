import React from 'react'
import {graphql, Link} from 'gatsby'
import Layout from '../components/layout'
const IndexPage = ({data}) => {
  return (
    <Layout>
      <div className="container mx-auto max-w-screen-xl p-6">
        <h2 className="text-2xl font-bold my-4">Products</h2>
        <ul className="w-full mt-6 flex flex-wrap gap-6">
          {data.allShopifyProduct.nodes.map((product) => (
            <li
              className="w-full md:w-1/2 lg:w-1/3 flex flex-col mb-8"
              key={product.shopifyId}
            >
              <Link
                className="relative bg-white rounded-lg shadow-lg hover:shadow-xl flex-1 flex flex-col overflow-hidden"
                to={product.handle}
              >
                <div>
                  <div
                    className="bg-cover aspect-w-16 aspect-h-9"
                    style={{
                      backgroundImage: `url(${product.images[0].originalSrc})`,
                    }}
                  ></div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <h3 className="font-bold text-3xl my-4">{product.title}</h3>
                </div>
                <div
                  className="p-6"
                  dangerouslySetInnerHTML={{__html: product.descriptionHtml}}
                />
                <span className="p-6 bg-indigo-600 text-gray-200 absolute left-0 top-0 block text-sm">
                  {product.priceRange.maxVariantPrice.currencyCode}{' '}
                  {product.priceRange.maxVariantPrice.amount}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
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
        descriptionHtml
        priceRange {
          maxVariantPrice {
            amount
            currencyCode
          }
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images {
          originalSrc
        }
      }
    }
  }
`
export default IndexPage
