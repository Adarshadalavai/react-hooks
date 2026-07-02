import { useContext } from "react";
import ProductContext from "./productContext";
import {ADDTOCART} from "./actionTypes.js"

export default function ProductComp({ id, name, price }) {
  const { dispatch } = useContext(ProductContext);

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{price}</td>
      <td>
        <button
          onClick={() => {
            // addToCart(id);
            dispatch({type:ADDTOCART, pId: id})
          }}
        >
          add to cart
        </button>
      </td>
    </tr>
  );
}
