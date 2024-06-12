import React, { useEffect, useState } from "react";
import CloseMark from "@heroicons/react/24/solid/XMarkIcon";
import Button from "../base/Button";

const ChooseAddress = ({ addresses, defaultAddress, setDefaultAddress, onClickX }) => {
  const listAddresses = [
    {
      id: "4982952242",
      user_id: "20749692047",
      as: "Home",
      name: "Adam",
      phone: "089786756434",
      address:
        "Perumahan Emas, Jl. Xyz No 19 A, Kelurahan Perak, Kecamatan Tawang, Kota Bandung, Jawa Barat",
      postalCode: "456578",
      city: "Kota Bandung",
    },
    {
      id: "55996274772",
      user_id: "19225789178",
      as: "Office",
      name: "Noah",
      phone: "08987879898",
      address:
        "Blok Jaya, Jl. Karuhun No 132 C, Kelurahan Menak, Kecamatan Harran, Kota Petang, Jawa Barat",
      postalCode: "556779",
      city: "Kota Petang",
    },
    {
      id: "5296335534",
      user_id: "20930502748",
      as: `Wife's House`,
      name: "Mary",
      phone: "08137534563",
      address:
        "Perumahan Diamond, Jl. Nazareth No 11 B, Kelurahan Magna, Kecamatan Antam, Kota Bandung, Jawa Barat",
      postalCode: "333435",
      city: "Kota Bandung",
    }
  ];
  // const [defaultAddress, setDefaultAddress] = useState(listAddresses[0])
  const [changeAddress, setChangeAddress] = useState(false)
  useEffect(() => {
    if (defaultAddress === "") {
      setDefaultAddress(listAddresses[0])
    }
  }, [])
  return (
      <div className="w-[810px] min-h-[675px] h-auto flex flex-col items-center bg-white relative">
        <CloseMark className="text-[#9B9B9B] w-6 h-6 absolute top-3 right-3 hover:cursor-pointer" onClick={onClickX} />
        <p className="font-metropolis font-semibold text-[28px] text-[#222222] text-center mt-14">
          Choose another address
        </p>
        <div className="w-[90%] h-[86px] flex justify-center items-center border border-dashed rounded-[8px] border-[#9B9B9B] mt-5 hover:cursor-pointer mb-10">
          <p className="font-metropolis font-semibold text-[18px] text-[#9B9B9B]">
            Add new address
          </p>
        </div>
        {changeAddress === true ? (
          <ChangeDefaultAddress addresses={listAddresses} defaultAddress={defaultAddress} setDefaultAddress={setDefaultAddress} setChangeAddress={setChangeAddress} />
        ) : (
          <DefaultAddress address={defaultAddress} setChangeAddress={setChangeAddress} />
        )}
      </div>
  );
};

export default ChooseAddress;

const DefaultAddress = ({address, setChangeAddress}) => {
  return (
    <div
      className="border border-[#DB3022] rounded-[4px] w-[90%] px-6 py-6"
    >
      <p className="font-metropolis font-semibold text-[16px] text-[#222222] mt-2">
        {address.name}
      </p>
      <p className="font-metropolis font-normal text-[14px] text-[#222222] mt-2">
        {address.address}, {address.city}, {address.postalCode}
      </p>
      <p className="font-metropolis font-semibold text-[16px] text-[#DB3022] mt-4 hover:cursor-pointer" onClick={() => setChangeAddress(true)}>
        Change address
      </p>
    </div>
  );
};

const ChangeDefaultAddress = ({addresses, defaultAddress, setDefaultAddress, setChangeAddress}) => {
  return (
    <div>
    <ul className="flex flex-col gap-4 w-[100%] items-center pb-10">
      {addresses.map((address, index) => (
      <li key={index} className="w-[100%] mb-4 flex justify-center">
      <input type="radio" id={address.id} value={address.id} name="address" className="hidden peer" onClick={() => setDefaultAddress(address)} />
        <label
          htmlFor={address.id}
          className={`${defaultAddress.id === address.id ? "border border-[#DB3022] rounded-[4px] w-[90%] px-6 py-6 peer-checked:border-[#DB3022] peer-hover:cursor-pointer" : "border border-[#9B9B9B] rounded-[4px] w-[90%] px-6 py-6 peer-checked:border-[#DB3022] peer-hover:cursor-pointer"}`}
        >
          <p className="font-metropolis font-semibold text-[16px] text-[#222222] mt-2">
            {address.name}
          </p>
          <p className="font-metropolis font-normal text-[14px] text-[#222222] mt-2">
            {address.address}, {address.city}, {address.postalCode}
          </p>
        </label>
      </li>
      ))}
    </ul>

      <div className="w-[100px] ml-auto mr-10 pb-10">
        <Button onClick={()=>setChangeAddress(false)}>Ok</Button>
      </div>
    </div>
  )
}
