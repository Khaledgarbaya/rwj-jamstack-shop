import React, {useState} from 'react'
import StoreContext, {defaultStoreContext} from '../context/store-context'

const Layout = ({children}) => {
  const [state, setState] = useState({
    store: {
      ...defaultStoreContext,
      addVariantToCart: (variantId, quantity) => {
        console.log('adding to cart')
      },
      removeLineItem: (client, checkoutID, lineItemID) => {
        console.log('removing from cart')
      },
      updateLineItem: (client, checkoutID, lineItemID, quantity) => {
        console.log('updating cart')
      },
    },
  })
  return (
    <StoreContext.Provider value={state.store}>
      <main>{children}</main>
    </StoreContext.Provider>
  )
}

export default Layout
