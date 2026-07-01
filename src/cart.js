import { useContext } from "react";
import CartContext from "./cartContext";
import CartItemComp from "../src/cartItemComp";

export default function Cart() {
  const { cartItems, findProduct } = useContext(CartContext);
  return (
    <>
      <div>
        <h2>Cart</h2>
        <table>
          <thead>
            <tr>
              <td>Id</td>
              <td>Name</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Remove</td>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((cartItem) => {
              const item = findProduct(cartItem.pId);
              return (
                <CartItemComp
                  key={cartItem.pId}
                  cartItem={cartItem}
                  item={item}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
