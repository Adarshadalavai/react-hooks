import CartContext from "./cartContext";
import { useContext } from "react";

export default function CartItemComp({ cartItem, item }) {
  const { incQuantity, decQuantity, removeCartItem } = useContext(CartContext);
  return (
    <tr>
      <td>{cartItem.cId}</td>
      <td>{item.name}</td>
      <td>{item.price}</td>
      <td>
        <button
          onClick={() => {
            decQuantity(cartItem.cId);
          }}
        >
          -
        </button>
        {cartItem.quantity}
        <button onClick={() => incQuantity(cartItem.cId)}>+</button>
      </td>
      <td>
        <button
          onClick={() => {
            removeCartItem(cartItem.cId);
          }}
        >
          remove
        </button>
      </td>
    </tr>
  );
}
