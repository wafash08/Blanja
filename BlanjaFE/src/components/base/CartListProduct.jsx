import axios from "axios";
import React, { useEffect, useState } from "react";
import { getTokenFromLocalStorage } from "../../utils";
import { Link } from "react-router-dom";

const ProductList = ({ cart, onProductChange, onIndividualSelect }) => {
  const formatRupiah = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };
  return (
    <div className="w-full">
      {cart.map((product, index) => (
        <div
          key={index}
          className="flex items-center justify-between mb-4 rounded-md p-5 shadow-[0_0_14px_0_#ADADAD40]"
        >
          <input
            type="checkbox"
            checked={product.isSelected}
            onChange={(e) => onIndividualSelect(product.id, e.target.checked)}
            className="checkbox mr-2 w-5 h-5 max-lg:w-4 max-lg:h-4 rounded-md appearance-none checked:bg-[#DB3022]  bg-white border border-gray-300"
          />
          <div>
            <img
              className="w-24 h-24 max-lg:w-16 max-lg:h-16"
              src={product.photo}
            />
          </div>
          <div>
            <Link
              to={`/products/${product.id}`}
              reloadDocument
              className="text-xl md:text-lg font-medium hover:underline"
            >
              <p className="max-lg:text-sm">{product.name}</p>
            </Link>
            <p className="max-lg:text-sm">{formatRupiah(product.price)}</p>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => onProductChange(product.id, -1)}
              className="bg-gray-200 px-2 rounded-full"
            >
              -
            </button>
            <input
              type="text"
              value={product.quantity}
              readOnly
              className="w-12 max-lg:w-8 text-center max-lg:text-sm"
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
