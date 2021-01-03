import React, {useState, useEffect} from 'react'
import StoreContext, {defaultStoreContext} from '../context/store-context'
import {Link} from 'gatsby'
import '../styles/tailwind.css'
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
      <header className="px-6 py-2 bg-indigo-600">
        <nav className="container mx-auto max-w-screen-xl text-gray-200 flex justify-between">
          <div>
            <Link to="/">
              <h1 className="text-3xl">JAMStore</h1>
            </Link>
          </div>
          <div>
            <Link to="/cart" className="block relative">
              {state.store.checkout.lineItems.length > 0 ? (
                <span className="absolute -left-2 -top-2 rounded-full bg-red-400 block px-2 py-1 text-xs">
                  {state.store.checkout.lineItems.length}
                </span>
              ) : null}
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                title="cart"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </Link>
          </div>
        </nav>
      </header>
      <main className="bg-gray-200 min-h-screen">{children}</main>
    </StoreContext.Provider>
  )
}

export default Layout
