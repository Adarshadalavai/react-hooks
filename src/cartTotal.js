import CartContext from "./cartContext";
import { useContext } from "react";

export default function CartTotal() {
  const { cartItems, findProduct } = useContext(CartContext);
  const totalItems = cartItems.reduce((acc, cv) => {
    return acc + cv.quantity;
  }, 0);

  const totalPrice = cartItems.reduce((acc, cv) => {
    return acc + cv.quantity * findProduct(cv.pId).price;
  }, 0);
  return (
    <>
      <div>
        <h2>Cart Total</h2>
        <h4>Total items = {totalItems}</h4>
        <h4>Total price = {totalPrice}</h4>
      </div>
    </>
  );
}
