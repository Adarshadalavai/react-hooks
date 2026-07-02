import "./styles.css";
import { useState, useEffect, useReducer } from "react";
import { productsList } from "../src/productList.js";
import Products from "../src/products.js";
import Cart from "../src/cart.js";
import CartTotal from "../src/cartTotal.js";
import {INCREASEQTY, DECREASEQTY, ADDTOCART, REMOVEITEM} from "../src/actionTypes.js"

import ProductContext from "./productContext";
import CartContext from "./cartContext";

function reducer(items, action){

    if(action.type == ADDTOCART){
      const itemIncart = items.find((ele) => ele.pId == action.pId);

      if(!itemIncart){
        const cartItem = {
          cId: Number(new Date()),
          pId:action.pId,
          quantity: 1,
        };
        return [...items, cartItem]
      }else{
        return items.map((item) =>
          item.pId === action.pId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
    }


    else if(action.type == INCREASEQTY){
      return items.map((item) =>
        item.cId === action.cId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    else if(action.type == DECREASEQTY){
      const updatedItems =  items.map((item) => item.cId == action.cId ? 
      {...item, quantity:item.quantity-1}
      : item);

      return updatedItems.filter((item) => item.quantity > 0);
    }

    else if(action.type == REMOVEITEM){
      return items.filter((item) => item.cId !== action.cId);
    }
}

export default function App() {
  const [products, setProducts] = useState(productsList);
  // const [cartItems, setCartItems] = useState(
  //   localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
  // );

  const [cartItems, dispatch] = useReducer(reducer, []);

  

  useEffect(() => {
    // console.log(cartItems);
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // const addToCart = (pId) => {
  //   const itemIncart = cartItems.find((ele) => ele.pId == pId);

  //   if (!itemIncart) {
  //     const cartItem = {
  //       cId: Number(new Date()),
  //       pId,
  //       quantity: 1,
  //     };

  //     // setCartItems([...cartItems, cartItem]);
  //     dispatch({type:"add", cartItem: cartItem})
  //   } else {
  //     // itemIncart.quantity += 1;
  //     // setCartItems([...cartItems]);
  //     incQuantity(itemIncart.cId);
  //   }
  // };

  const findProduct = (pId) => {
    return products.find((ele) => ele.id == pId);
  };

  // const incQuantity = (cId) => {
  //   const item = cartItems.find((ele) => ele.cId == cId);
  //   item.quantity += 1;
  //   setCartItems([...cartItems]);
  // };

  // const decQuantity = (cId) => {
  //   const item = cartItems.find((ele) => ele.cId == cId);
  //   if (item.quantity == 1) {
  //     removeCartItem(item.cId);
  //     return;
  //   }
  //   item.quantity -= 1;
  //   setCartItems([...cartItems]);
  // };

  // const removeCartItem = (cId) => {
  //   const updatedCartItems = cartItems.filter((item) => item.cId != cId);
  //   setCartItems(updatedCartItems);
  // };

  return (
    <div className="App">
      <ProductContext value={{ products,dispatch }}>
        <Products />
      </ProductContext>
      <CartContext
        value={{
          cartItems,
          findProduct,
          dispatch
        }}
      >
        <Cart />
        <CartTotal />
      </CartContext>
    </div>
  );
}
