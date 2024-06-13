import React, { useEffect, useState } from "react";
import CloseMark from "@heroicons/react/24/solid/XMarkIcon";
import Button from "../base/Button";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ChooseAddressModal = ({ onClickX }) => {
  // const listAddresses = [
  //   {
  //     id: "4982952242",
  //     user_id: "20749692047",
  //     as: "Home",
  //     name: "Adam",
  //     phone: "089786756434",
  //     address:
  //       "Perumahan Emas, Jl. Xyz No 19 A, Kelurahan Perak, Kecamatan Tawang, Kota Bandung, Jawa Barat",
  //     postalCode: "456578",
  //     city: "Kota Bandung",
  //   },
  //   {
  //     id: "55996274772",
  //     user_id: "19225789178",
  //     as: "Office",
  //     name: "Noah",
  //     phone: "08987879898",
  //     address:
  //       "Blok Jaya, Jl. Karuhun No 132 C, Kelurahan Menak, Kecamatan Harran, Kota Petang, Jawa Barat",
  //     postalCode: "556779",
  //     city: "Kota Petang",
  //   },
  //   {
  //     id: "5296335534",
  //     user_id: "20930502748",
  //     as: `Wife's House`,
  //     name: "Mary",
  //     phone: "08137534563",
  //     address:
  //       "Perumahan Diamond, Jl. Nazareth No 11 B, Kelurahan Magna, Kecamatan Antam, Kota Bandung, Jawa Barat",
  //     postalCode: "333435",
  //     city: "Kota Bandung",
  //   }
  // ];
  // const [defaultAddress, setDefaultAddress] = useState(listAddresses[0])
  const [changeAddress, setChangeAddress] = useState(false)
  const [addresses, setAddresses] = useState("")
	const [defaultAddress, setDefaultAddress] = useState("")
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setLoading(true)
		axios.get(`${import.meta.env.VITE_BE_URL}customer/profile`, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then((res) => {
			console.log(res.data.data);
			setAddresses(res.data.data.addresses)
      for (const key in res.data.data.addresses) {
        if (res.data.data.addresses[key].primary === "on") {
          setDefaultAddress(res.data.data.addresses[key])
        }
      }
			setLoading(false)
		})
		.catch((err) => {
			console.log(err.response);
			setLoading(false)
		})
	}, [])

  const onClickOk = (address) => {
    axios.put(`${import.meta.env.VITE_BE_URL}address/${address.id}`, {
      ...address,
      primary: "on"
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((res) => {
      console.log(res.data.data);
      setChangeAddress(false)
    })
    .catch((err) => {
      console.log(err.response);
      setChangeAddress(false)
    })
  }

  if (loading === true) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="w-[810px] min-h-[675px] h-auto flex flex-col items-center bg-white relative">
        <div className="w-[100%] h-auto flex justify-center mt-10">
          <div className="w-[50%] h-auto mt-5 hover:cursor-pointer mb-10">
            <Skeleton
              className="w-[100%] h-[70px]"
            />
          </div>
        </div>
        <div className="w-[90%] h-auto flex justify-center items-center mt-5 hover:cursor-pointer mb-10">
          <Skeleton
            className="w-[100%] h-[100px]"
            containerClassName="flex-1"
          />
        </div>
        <div className="w-[90%] h-auto flex justify-center items-center mt-5 hover:cursor-pointer mb-10">
          <Skeleton
            className="w-[100%] h-[100px]"
            containerClassName="flex-1"
          />
        </div>
      </div>
    </div>
    );
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50">
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
          <ChangeDefaultAddress addresses={addresses} defaultAddress={defaultAddress} setDefaultAddress={setDefaultAddress} onClickOk={onClickOk} />
        ) : (
          <DefaultAddress address={defaultAddress} setChangeAddress={setChangeAddress} />
        )}
      </div>
    </div>
  );
};

export default ChooseAddressModal;

const DefaultAddress = ({address, setChangeAddress}) => {
  return (
    <div className="border border-[#DB3022] rounded-[4px] w-[90%] px-6 py-6">
      <p className="font-metropolis font-semibold text-[16px] text-[#222222] mt-2">
        {address.name}
      </p>
      <p className="font-metropolis font-normal text-[14px] text-[#222222] mt-2">
        {address.main_address}, {address.city}, {address.postal_code}
      </p>
      <p
        className="font-metropolis font-semibold text-[16px] text-[#DB3022] mt-4 hover:cursor-pointer"
        onClick={() => setChangeAddress(true)}
      >
        Change address
      </p>
    </div>
  );
};

const ChangeDefaultAddress = ({addresses, defaultAddress, setDefaultAddress, onClickOk}) => {
  return (
    <div className="w-[100%]">
      <ul className="flex flex-col gap-4 w-[100%] items-center pb-10">
        {addresses.map((address, index) => (
          <li key={index} className="w-[100%] mb-4 flex justify-center relative">
            {/* <input
              type="radio"
              id={address.id}
              value={address.id}
              name="address"
              className="sr-only peer"
              onClick={() => setDefaultAddress(address)}
            /> */}
            <label
              htmlFor={address.id}
              className={`${
                defaultAddress.id === address.id
                  ? "border border-[#DB3022] rounded-[4px] w-[90%] px-6 py-6 hover:cursor-pointer"
                  : "border border-[#9B9B9B] rounded-[4px] w-[90%] px-6 py-6 hover:cursor-pointer"
              }`}
              onClick={() => setDefaultAddress(address)}
            >
              <p className="font-metropolis font-semibold text-[16px] text-[#222222] mt-2">
                {address.name}
              </p>
              <p className="font-metropolis font-normal text-[14px] text-[#222222] mt-2">
                {address.main_address}, {address.city}, {address.postal_code}
              </p>
            </label>
          </li>
        ))}
      </ul>

      <div className="w-[100px] ml-auto mr-10 pb-10">
        <Button onClick={() => onClickOk(defaultAddress)}>Ok</Button>
      </div>
    </div>
  )
}