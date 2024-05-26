import axios from "axios";
import React, { useEffect, useState } from "react";
import { getTokenFromLocalStorage } from "../../utils";

const ProductList = ({cart, onProductChange}) => {
  return (
    <div className="w-full">
      {cart.map((product) => (
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
            <img src={product.photo} />
          </div>
          <div>
            <p>{product.name}</p>
            <p>{product.price}</p>
          </div>
          <div className="flex items-center">
            <button
              onClick={() =>
                onProductChange(product.id, -1)
              }
              className="bg-gray-200 px-2 rounded-full"
            >
              -
            </button>
            <input
              type="text"
              value={product.quantity}
              readOnly
              className="w-12 text-center"
            />
            <button
              onClick={() => onProductChange(product.id, 1)}
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
