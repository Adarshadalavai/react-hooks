import { useContext } from "react";
import ProductContext from "./productContext";

export default function ProductComp({ id, name, price }) {
  const { addToCart } = useContext(ProductContext);

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{price}</td>
      <td>
        <button
          onClick={() => {
            addToCart(id);
          }}
        >
          add to cart
        </button>
      </td>
    </tr>
  );
}
