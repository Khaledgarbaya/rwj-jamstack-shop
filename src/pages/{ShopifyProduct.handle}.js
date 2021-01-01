import React, {useContext} from 'react'
import {graphql} from 'gatsby'
import StoreContext from '../context/store-context'
import Layout from '../components/layout'
const Product = ({data}) => {
  const {addVariantToCart} = useContext(StoreContext)
  return (
    <div>
      <h2>{data.shopifyProduct.title}</h2>
      <div>
        <img
          width={300}
          src={data.shopifyProduct.images[0].originalSrc}
          alt={data.shopifyProduct.title}
        />
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: data.shopifyProduct.descriptionHtml,
        }}
      />
      <span>
        {data.shopifyProduct.priceRange.maxVariantPrice.currencyCode}{' '}
        {data.shopifyProduct.priceRange.maxVariantPrice.amount}
      </span>
      <button
        onClick={() => {
          addVariantToCart(data.shopifyProduct.shopifyId, 1)
        }}
      >
        Add to Cart
      </button>
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
      images {
        originalSrc
      }
    }
  }
`
export default ProductPage
