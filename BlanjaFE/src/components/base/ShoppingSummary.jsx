import React from "react";

const ShoppingSummary = ({ total }) => {
  return (
    <div className="w-full max-md:h-40 rounded-md max-md:rounded-lg p-5 shadow-[0_0_14px_0_#ADADAD40]">
      <div className=" mt-2 max-md:hidden">
        <span className="text-lg font-bold text-[#222222]">
          Shopping Summary
        </span>
      </div>
      <div className="mt-8 max-md:flex-col max-md:flex max-md:justify-between max-md:h-full max-md:mt-0">
        <div className="flex justify-between max-md:h-1/2">
          <span className="text-lg font-bold text-gray-300">Total Price</span>
          <span className="text-lg font-bold">Rp.{total}</span>
        </div>

        <div className="max-md:h-1/2">
          <button className="w-full bg-red-500 text-white px-4 py-2 rounded-full mt-8 max-md:mt-0 max-md:h-full">
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingSummary;
