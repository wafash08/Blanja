import React from "react";

const CheckoutAdress = ({address, onClick}) => {
  return (
    <div className="w-full">
      <div className="mb-4 rounded-md p-5 shadow-[0_0_14px_0_#ADADAD40] flex flex-col justify-start gap-y-3">
        <div>
          <p className="text-xl">{address.name}</p>
        </div>
        <div>
          <p className="text-xs">
          {address.main_address}
          </p>
        </div>
        <button onClick={onClick} className="w-1/2 border-2 border-gray-400 border-solid hover:border-none text-gray-400 px-4 py-2 rounded-full max-md:mt-0 max-md:h-full hover:bg-red-500 hover:text-white">
            Change Address
          </button>
      </div>
    </div>
  );
};

export default CheckoutAdress;
