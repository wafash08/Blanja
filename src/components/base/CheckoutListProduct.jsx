import React from "react";
import ProductDummy from "../../assets/product-dummy.png"

const CheckoutProductList = () => {
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
        <div
          className="flex items-center justify-start gap-x-3 mb-4 rounded-md p-5 shadow-[0_0_14px_0_#ADADAD40]"
        >
          <div>
            <img
              className="w-24 h-24 max-md:w-16 max-md:h-16"
              src={ProductDummy}
            />
          </div>
          <div>
            <p className="max-md:text-sm font-semibold">Dummy Jas</p>
          </div>
          <div className="ml-auto">
            {/* <p className="max-md:text-sm">{product.colors}</p> */}
            <p className="max-md:text-sm font-semibold">{formatRupiah(200000)}</p>
          </div>
        </div>
    </div>
  );
};

export default CheckoutProductList;
