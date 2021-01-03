import React, {useState, useEffect} from 'react'
import StoreContext, {defaultStoreContext} from '../context/store-context'
import {Link} from 'gatsby'
const Layout = ({children}) => {
  const [state, setState] = useState({
    store: {
      ...defaultStoreContext,
    },
  })

  const initializeCheckout = async () => {
    const isBrowser = typeof window !== 'undefined'
    const existingCheckoutID = isBrowser
      ? localStorage.getItem('shopify_checkout_id')
      : null

    const setCheckoutInState = (checkout) => {
      if (isBrowser) {
        localStorage.setItem('shopify_checkout_id', checkout.id)
      }
      console.log(checkout)
      setState((prevState) => ({
        store: {
          ...prevState.store,
          checkout,
        },
      }))
      console.log(state.store)
    }
    const createNewCheckout = () => state.store.client.checkout.create()
    const fetchCechkout = (id) => state.store.client.checkout.fetch(id)

    if (existingCheckoutID) {
      try {
        const checkout = await fetchCechkout(existingCheckoutID)
        console.log(checkout)
        if (!checkout.completedAt) {
          setCheckoutInState(checkout)
          return
        }
      } catch (e) {
        localStorage.setItem('shopify_checkout_id', null)
      }
    }
    const newCheckout = await createNewCheckout()
    setCheckoutInState(newCheckout)
  }
  useEffect(() => {
    console.log('init')
    initializeCheckout()
  }, [])
  return (
    <StoreContext.Provider
      value={{
        ...state.store,
        addVariantToCart: (variantId, quantity) => {
          console.log('adding to cart')
          if (variantId === '' || !quantity) {
            console.error('Both variantId and quantity are required!')
            return
          }
          setState((prevState) => ({
            store: {...prevState.store, adding: true},
          }))
          const {checkout, client} = state.store
          console.log(state.store)
          const checkoutId = checkout.id
          const lineItemsToUpdate = [
            {variantId, quantity: parseInt(quantity, 10)},
          ]
          return client.checkout
            .addLineItems(checkoutId, lineItemsToUpdate)
            .then((checkout) => {
              setState((prevState) => ({
                store: {...prevState.store, checkout, adding: false},
              }))
            })
        },
        removeLineItem: (client, checkoutID, lineItemID) => {
          return client.checkout
            .removeLineItems(checkoutID, [lineItemID])
            .then((res) => {
              setState((prevState) => ({
                store: {
                  ...prevState.store,
                  checkout: res,
                },
              }))
            })
        },
        updateLineItem: (client, checkoutID, lineItemID, quantity) => {
          console.log('updating cart', quantity)
          const lineItemsToUpdate = [
            {id: lineItemID, quantity: parseInt(quantity, 10)},
          ]
          return client.checkout
            .updateLineItems(checkoutID, lineItemsToUpdate)
            .then((res) => {
              setState((prevState) => ({
                store: {
                  ...prevState.store,
                  checkout: res,
                },
              }))
            })
        },
      }}
    >
      <nav>
        <Link to="/"> Store</Link>{' '}
        <Link to="/cart">Cart ({state.store.checkout.lineItems.length})</Link>
      </nav>
      <main>{children}</main>
    </StoreContext.Provider>
  )
}

export default Layout
