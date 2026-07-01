import "./styles.css";
import { useState, useEffect } from "react";
import { productsList } from "../src/productList.js";
import Products from "../src/products.js";
import Cart from "../src/cart.js";
import CartTotal from "../src/cartTotal.js";

import ProductContext from "./productContext";
import CartContext from "./cartContext";

export default function App() {
  const [products, setProducts] = useState(productsList);
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
  );

  useEffect(() => {
    // console.log(cartItems);
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (pId) => {
    const itemIncart = cartItems.find((ele) => ele.pId == pId);

    if (!itemIncart) {
      const cartItem = {
        cId: Number(new Date()),
        pId,
        quantity: 1,
      };

      setCartItems([...cartItems, cartItem]);
    } else {
      // itemIncart.quantity += 1;
      // setCartItems([...cartItems]);
      incQuantity(itemIncart.cId);
    }
  };

  const findProduct = (pId) => {
    return products.find((ele) => ele.id == pId);
  };

  const incQuantity = (cId) => {
    const item = cartItems.find((ele) => ele.cId == cId);
    item.quantity += 1;
    setCartItems([...cartItems]);
  };

  const decQuantity = (cId) => {
    const item = cartItems.find((ele) => ele.cId == cId);
    if (item.quantity == 1) {
      removeCartItem(item.cId);
      return;
    }
    item.quantity -= 1;
    setCartItems([...cartItems]);
  };

  const removeCartItem = (cId) => {
    const updatedCartItems = cartItems.filter((item) => item.cId != cId);
    setCartItems(updatedCartItems);
  };

  return (
    <div className="App">
      <ProductContext value={{ addToCart, products }}>
        <Products />
      </ProductContext>
      <CartContext
        value={{
          cartItems,
          findProduct,
          incQuantity,
          decQuantity,
          removeCartItem,
        }}
      >
        <Cart />
        <CartTotal />
      </CartContext>
    </div>
  );
}
