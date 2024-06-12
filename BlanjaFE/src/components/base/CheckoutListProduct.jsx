import React from "react";

const CheckoutProductList = ({ cart }) => {
    console.log(cart);
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
          className="flex items-center justify-start gap-x-3 mb-4 rounded-md p-5 shadow-[0_0_14px_0_#ADADAD40]"
        >
          <div>
            <img
              className="w-24 h-24 max-md:w-16 max-md:h-16"
              src={product.photo}
            />
          </div>
          <div>
            <p className="max-md:text-sm font-semibold">{product.name}</p>
          </div>
          <div className="ml-auto">
            {/* <p className="max-md:text-sm">{product.colors}</p> */}
            <p className="max-md:text-sm font-semibold">{formatRupiah(product.price)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CheckoutProductList;
