import React, {useContext} from 'react'
import StoreContext from '../context/store-context'
import Layout from '../components/layout'
const Cart = () => {
  const {checkout} = useContext(StoreContext)
  return (
    <ul>
      {checkout.lineItems.map((item) => (
        <li key={item.id}>
          {item.title} - ({item.quantity})
        </li>
      ))}
    </ul>
  )
}

const CartPage = () => {
  return (
    <Layout>
      <Cart />
    </Layout>
  )
}

export default CartPage
