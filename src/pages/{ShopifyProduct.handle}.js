import React from 'react'
import {graphql} from 'gatsby'

const ProductPage = ({data}) => {
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
        dangerouslySetInnerHTML={{__html: data.shopifyProduct.descriptionHtml}}
      />
      <span>
        {data.shopifyProduct.priceRange.maxVariantPrice.currencyCode}{' '}
        {data.shopifyProduct.priceRange.maxVariantPrice.amount}
      </span>
    </div>
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
