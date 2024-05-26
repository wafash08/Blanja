import React from "react";

const SelectAllItems = ({ products, onSelectAll, onDeleteSelected }) => {
//     let newProducts = Object.values(products)
  const allSelected =
    products.length > 0 &&
    products.every((product) => product.isSelected);

  return (
    <div className="w-full flex items-center justify-between mb-4 rounded-md p-5 shadow-[0_0_14px_0_#ADADAD40]">
      <div className="flex">
        <input
          type="checkbox"
          checked={allSelected}
          onChange={(e) => onSelectAll(e.target.checked)}
          className="checkbox mr-2 w-5 h-5 rounded-md appearance-none checked:bg-[#DB3022]  bg-white border border-gray-300"
        />
        <label className="flex font-medium">
          Select all items
          <p className=" text-gray-300 ml-1">
            {" "}
            ({products.length} items selected)
          </p>
        </label>
      </div>
      <button
        onClick={onDeleteSelected}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Delete
      </button>
    </div>
  );
};

export default SelectAllItems;
