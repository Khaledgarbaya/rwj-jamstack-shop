import React, {useContext, useState} from 'react'
import StoreContext from '../context/store-context'
import Layout from '../components/layout'
const CartItem = ({item, updateItem, removeItem}) => {
  const [quantity, setQuantity] = useState(item.quantity)
  return (
    <li>
      <span>
        {item.title} -{' '}
        <input
          type="number"
          defaultValue={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </span>
      <button onClick={() => updateItem(item.id, quantity)}>
        Update Quantity
      </button>
      <button onClick={() => removeItem(item.id)}>Remove</button>
    </li>
  )
}
const Cart = () => {
  const {checkout, removeLineItem, updateLineItem, client} = useContext(
    StoreContext,
  )
  const removeItem = (id) => removeLineItem(client, checkout.id, id)
  const updateItem = (id, quantity) =>
    updateLineItem(client, checkout.id, id, quantity)
  return (
    <ul>
      {checkout.lineItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          removeItem={removeItem}
          updateItem={updateItem}
        />
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
