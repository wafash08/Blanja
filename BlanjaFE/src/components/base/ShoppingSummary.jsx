import React from "react";

const ShoppingSummary = ({ total }) => {
  return (
    <div className="w-full rounded-md p-5 shadow-[0_0_14px_0_#ADADAD40]">
      <div className=" mt-2">
        <span className="text-lg font-bold text-[#222222]">
          Shopping Summary
        </span>
      </div>
      <div className="mt-8 flex justify-between">
      <span className="text-lg font-bold text-gray-300">
          Total Price
        </span>
        <span className="text-lg font-bold">Rp.{total}</span>
      </div>
      
      <button className="w-full bg-red-500 text-white px-4 py-2 rounded-full mt-8">Buy</button>
    </div>
  );
};

export default ShoppingSummary;
