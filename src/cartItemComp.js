import CartContext from "./cartContext";
import { useContext } from "react";
import {INCREASEQTY, DECREASEQTY, REMOVEITEM} from "./actionTypes.js"

export default function CartItemComp({ cartItem, item }) {
  const { dispatch } = useContext(CartContext);
  return (
    <tr>
      <td>{cartItem.cId}</td>
      <td>{item.name}</td>
      <td>{item.price}</td>
      <td>
        <button
          onClick={() => {
            dispatch({type:DECREASEQTY, cId: cartItem.cId})
          }}
        >
          -
        </button>
        {cartItem.quantity}
        <button onClick={() => {
          dispatch({type:INCREASEQTY, cId: cartItem.cId, })
        }}>+</button>
      </td>
      <td>
        <button
          onClick={() => {
            dispatch({type: REMOVEITEM, cId: cartItem.cId})
          }}
        >
          remove
        </button>
      </td>
    </tr>
  );
}
