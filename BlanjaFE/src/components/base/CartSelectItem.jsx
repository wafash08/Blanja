import React from "react";

const SelectAllItems = ({ products, onSelectAll, onDeleteSelected }) => {
//     let newProducts = Object.values(products)
  const allSelected =
    products.length > 0 &&
    products.every((product) => product.isSelected);

  return (
    <div className="w-full flex items-center justify-between mb-4 rounded-lg p-5 shadow-[0_0_14px_0_#ADADAD40]">
      <div className="flex max-lg:items-center">
        <input
          type="checkbox"
          checked={allSelected}
          onChange={(e) => onSelectAll(e.target.checked)}
          className="checkbox mr-2 w-5 h-5 max-lg:w-4 max-lg:h-4 rounded-lg appearance-none checked:bg-[#DB3022]  bg-white border border-gray-300"
        />
        <label className="flex font-medium max-lg:text-sm">
          Select all items
          <p className=" text-gray-300 ml-1 max-lg:text-sm">
            {" "}
            ({products.length} items selected)
          </p>
        </label>
      </div>
      <button
        onClick={onDeleteSelected}
        className="bg-red-500 text-white px-4 py-2 rounded max-lg:text-sm"
      >
        Delete
      </button>
    </div>
  );
};

export default SelectAllItems;
