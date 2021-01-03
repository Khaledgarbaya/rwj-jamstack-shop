import React, {useContext} from 'react'
import {graphql} from 'gatsby'
import StoreContext from '../context/store-context'
import Layout from '../components/layout'
const Product = ({data}) => {
  const {addVariantToCart} = useContext(StoreContext)
  return (
    <div className="container mx-auto p-6 h-full">
      <div className="md:flex md:items-center ">
        <div className="w-full h-64 md:w-1/2 lg:h-96">
          <img
            className="h-full w-full rounded-md object-cover max-w-lg mx-auto"
            width={300}
            src={data.shopifyProduct.images[0].originalSrc}
            alt={data.shopifyProduct.title}
          />
        </div>
        <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2 divide-y space-y-2 divide-gray-400">
          <div>
            <h2 className="text-gray-700 uppercase text-lg">
              {data.shopifyProduct.title}
            </h2>
            <span className="text-gray-500 mt-3 border-b-gray-800">
              {data.shopifyProduct.priceRange.maxVariantPrice.currencyCode}{' '}
              {data.shopifyProduct.priceRange.maxVariantPrice.amount}
            </span>
          </div>
          <div>
            <div
              className="my-3"
              dangerouslySetInnerHTML={{
                __html: data.shopifyProduct.descriptionHtml,
              }}
            />

            <button
              onClick={() => {
                addVariantToCart(data.shopifyProduct.variants[0].shopifyId, 1)
              }}
              className="px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
const ProductPage = ({data}) => {
  return (
    <Layout>
      <Product data={data} />
    </Layout>
  )
}
export const query = graphql`
  query($handle: String) {
    shopifyProduct(handle: {eq: $handle}) {
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
      variants {
        shopifyId
      }
      images {
        originalSrc
      }
    }
  }
`
export default ProductPage
