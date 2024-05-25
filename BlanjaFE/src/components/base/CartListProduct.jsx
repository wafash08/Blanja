import axios from "axios";
import React, { useEffect, useState } from "react";

const ProductList = () => {
  const BASE_URL = import.meta.env.VITE_BE_URL;
  const carts = `${BASE_URL}carts`;
  const [cartProducts, setCartProducts] = useState([
    {
      brand_id: 4,
      brand_name: "Zalora Cloth",
      created_at: "2024-05-24T20:02:23.407623+07:00",
      id: 1,
      products: [
        {
          color: null,
          created_at: "2024-05-23T21:09:25.852427+07:00",
          id: 1,
          name: "Baju muslim pria",
          photo: null,
          price: 200000,
          quantity: 8,
          rating: 5,
          size: null,
          updated_at: "2024-05-23T21:09:25.852427+07:00",
        },
      ],
      updated_at: "2024-05-24T20:02:23.407623+07:00",
      user_id: 9,
    },
  ]);
  useEffect(() => {
    axios
      .get(carts)
      .then((res) => {
        console.log("data", res.data.data);
        setCartProducts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log("test", cartProducts);
  return (
    <div className="w-full">
      {cartProducts.map((product) => (
        <div
          key={product.id}
          className="flex items-center justify-between mb-4 rounded-md p-5 shadow-[0_0_14px_0_#ADADAD40]"
        >
          <input
            type="checkbox"
            checked={product.isSelected}
            onChange={(e) =>
              onProductChange(product.id, product.quantity, e.target.checked)
            }
            className="checkbox mr-2 w-5 h-5 rounded-md appearance-none checked:bg-[#DB3022]  bg-white border border-gray-300"
          />
          <div>
            <img src={product.products[0].photo} />
          </div>
          <div>
            <p>{product.products[0].name}</p>
            <p>{product.products[0].price}</p>
          </div>
          <div className="flex items-center">
            <button
              onClick={() =>
                onProductChange(product.products[0].id, Math.max(1, product.products[0].quantity - 1))
              }
              className="bg-gray-200 px-2 rounded-full"
            >
              -
            </button>
            <input
              type="text"
              value={product.products[0].quantity}
              readOnly
              className="w-12 text-center"
            />
            <button
              onClick={() => onProductChange(product.products[0].id, product.products[0].quantity + 1)}
              className="bg-gray-200 px-2 rounded-full"
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
