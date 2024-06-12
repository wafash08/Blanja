import React from "react";

const ShoppingSummary = ({ total, handleClick }) => {
  const formatRupiah = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };
  return (
    <div className="w-full max-md:h-40 rounded-md max-md:rounded-lg p-5 shadow-[0_0_14px_0_#ADADAD40] flex flex-col gap-y-4">
      <div className=" mt-2 max-md:hidden">
        <span className="text-lg font-bold text-[#222222]">
          Shopping Summary
        </span>
      </div>
      <div className="max-md:flex-col max-md:flex max-md:justify-between max-md:h-full max-md:mt-0 ">
        <div className="flex justify-between max-md:h-1/2">
          <span className="text-lg font-bold text-gray-400">Order</span>
          <span className="text-lg font-bold">{formatRupiah(total)}</span>
        </div>
        <div className="flex justify-between max-md:h-1/2">
          <span className="text-lg font-bold text-gray-400">Delivery</span>
          <span className="text-lg font-bold">{formatRupiah(total)}</span>
        </div>
      </div>
      <div className="flex justify-between max-md:h-1/2 border-t-2 border-gray-400">
        <span className="text-lg font-bold text-gray-400">
          Shopping Summary
        </span>
        <span className="text-lg font-bold">{formatRupiah(total)}</span>
      </div>
      <div>
        <div className="max-md:h-1/2">
          <button
            onClick={handleClick}
            className="w-full bg-red-500 text-white px-4 py-2 rounded-full max-md:mt-0 max-md:h-full"
          >
            Select Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingSummary;
