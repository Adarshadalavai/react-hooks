import { useContext } from "react";
import ProductContext from "./productContext";
import ProductComp from "./productComp";

export default function Products() {
  const { products } = useContext(ProductContext);
  return (
    <>
      <div>
        <h2>Products List</h2>
        <table>
          <thead>
            <tr>
              <td>id</td>
              <td>name</td>
              <td>price</td>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return <ProductComp key={product.id} {...product} />;
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
