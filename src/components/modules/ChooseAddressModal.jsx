import React, { forwardRef, useEffect, useRef, useState } from "react";
import CloseMark from "@heroicons/react/24/solid/XMarkIcon";
import Button from "../base/Button";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getTokenFromLocalStorage } from "../../utils";
import { useNavigate } from "react-router-dom";
import { CloseIcon } from "../base/Icons";

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
  const [changeAddress, setChangeAddress] = useState(false);
  const [addresses, setAddresses] = useState("");
  const [defaultAddress, setDefaultAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const newAddressRef = useRef();

  const handleOpenNewAddress = () => {
    newAddressRef.current.showModal();
  };

  const handleCloseNewAddress = () => {
    newAddressRef.current.close();
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BE_URL}customer/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setAddresses(res.data.data.addresses);
        for (const key in res.data.data.addresses) {
          if (res.data.data.addresses[key].primary === "on") {
            setDefaultAddress(res.data.data.addresses[key]);
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setLoading(false);
      });
  }, []);

  const onClickOk = (address) => {
    axios
      .put(
        `${import.meta.env.VITE_BE_URL}address/${address.id}`,
        {
          ...address,
          primary: "on",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.data);
        setChangeAddress(false);
      })
      .catch((err) => {
        console.log(err.response);
        setChangeAddress(false);
      });
  };

  if (loading === true) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="w-[810px] min-h-[675px] h-auto flex flex-col items-center bg-white relative max-lg:w-[90%] max-lg:min-h-[675px]">
          <div className="w-[100%] h-auto flex justify-center mt-10">
            <div className="w-[50%] h-auto mt-5 hover:cursor-pointer mb-10">
              <Skeleton className="w-[100%] h-[70px]" />
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
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50 overflow-y-auto">
      <div className="w-[810px] max-lg:w-[80%] min-h-[575px] h-[700px] max-lg:h-[600px] flex flex-col items-center gap-y-3 p-4 bg-white relative rounded-lg overflow-y-auto">
        <CloseMark
          className="text-[#9B9B9B] w-6 h-6 absolute top-3 right-3 hover:cursor-pointer"
          onClick={onClickX}
        />
        <p className="font-metropolis font-semibold text-[28px] max-lg:text-xl text-[#222222] text-center">
          Choose another address
        </p>
        <div
          onClick={handleOpenNewAddress}
          className="w-[90%] min-h-[80px] flex justify-center items-center border border-dashed rounded-[8px] border-[#9B9B9B] hover:cursor-pointer"
        >
          <p className="font-metropolis font-semibold text-[18px] max-lg:text-sm text-[#9B9B9B]">
            Add new address
          </p>
        </div>
        <div>
          <NewAddress ref={newAddressRef} onClose={handleCloseNewAddress} />
        </div>
        {changeAddress === true ? (
          <ChangeDefaultAddress
            addresses={addresses}
            defaultAddress={defaultAddress}
            setDefaultAddress={setDefaultAddress}
            onClickOk={onClickOk}
          />
        ) : (
          <DefaultAddress
            address={defaultAddress}
            setChangeAddress={setChangeAddress}
          />
        )}
      </div>
    </div>
  );
};

export default ChooseAddressModal;

const DefaultAddress = ({ address, setChangeAddress }) => {
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

const ChangeDefaultAddress = ({
  addresses,
  defaultAddress,
  setDefaultAddress,
  onClickOk,
}) => {
  return (
    <div className="w-[100%] flex flex-col">
      <ul className="flex flex-col w-[100%] items-center gap-y-4">
        {addresses.map((address, index) => (
          <li key={index} className="w-[100%] flex justify-center min-h-20">
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
                  ? "border border-[#DB3022] rounded-[4px] w-[90%] px-6 py-2 hover:cursor-pointer"
                  : "border border-[#9B9B9B] rounded-[4px] w-[90%] px-6 py-2 hover:cursor-pointer"
              }`}
              onClick={() => setDefaultAddress(address)}
            >
              <p className="font-metropolis font-semibold text-[16px] text-[#222222]">
                {address.name}
              </p>
              <p className="font-metropolis font-normal text-[14px] text-[#222222]">
                {address.main_address}, {address.city}, {address.postal_code}
              </p>
            </label>
          </li>
        ))}
      </ul>
      <div className="my-4 w-full flex justify-center">
        <div className="w-1/2 ">
          <Button onClick={() => onClickOk(defaultAddress)}>Ok</Button>
        </div>
      </div>
    </div>
  );
};

const NewAddress = forwardRef(({ onClose }, ref) => {
  const token = getTokenFromLocalStorage();
  const navigate = useNavigate();
  const handleAddAddress = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.target);
      const main_address = formData.get("main_address");
      const detail_address = formData.get("detail_address");
      const name = formData.get("name");
      const phone = formData.get("phone");
      const postal_code = formData.get("postal_code");
      const city = formData.get("city");
      const primary = formData.get("primary") ?? "off";
      const address = {
        main_address,
        detail_address,
        name,
        phone,
        postal_code,
        city,
        primary,
      };
      const response = await addAddress(token, address);
      console.log("response > ", response);
      navigate(0);
    } catch (error) {
      console.log("error while submitting new address", error);
    }
  };
  return (
    <dialog
      ref={ref}
      className="font-metropolis backdrop:bg-black/40 w-[90%] max-w-3xl border border-[#9B9B9B] bg-white rounded-lg relative p-5 lg:p-10"
    >
      <div className="mb-10">
        <h2 className="text-[#222222] text-[28px] text-center">
          Add new address
        </h2>
      </div>
      <form className="space-y-12" onSubmit={handleAddAddress}>
        <div className="space-y-4">
          <FormControl>
            <Label id="detail_address">Save address as</Label>
            <Input
              type="text"
              name="detail_address"
              id="detail_address"
              placeholder="Ex: Rumah"
            />
          </FormControl>
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
            <div className="flex-1">
              <FormControl>
                <Label id="name">Recipient’s name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Ex: Andri"
                />
              </FormControl>
            </div>
            <div className="flex-1">
              <FormControl>
                <Label id="phone">Recipient's telephone number</Label>
                <Input
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="Ex: 0812xxxxxxxx"
                />
              </FormControl>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
            <div className="flex-1">
              <FormControl>
                <Label id="main_address">Address</Label>
                <Input
                  type="text"
                  name="main_address"
                  id="main_address"
                  placeholder="Ex: Jl. Imam Bonjol"
                />
              </FormControl>
            </div>
            <div className="flex-1">
              <FormControl>
                <Label id="postal_code">Postal Code</Label>
                <Input
                  type="text"
                  name="postal_code"
                  id="postal_code"
                  placeholder="Ex: 15890"
                />
              </FormControl>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
            <div className="flex-1">
              <FormControl>
                <Label id="city">City or Subdistrict</Label>
                <Input
                  type="text"
                  name="city"
                  id="city"
                  placeholder="Ex: Jakarta"
                />
              </FormControl>
            </div>
            <div className="flex-1" />
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" name="primary" id="primary" />
            <Label id="primary">Make it the primary address</Label>
          </div>
        </div>

        <div className="flex justify-end gap-5">
          <button
            type="button"
            className="text-[#9B9B9B] bg-white border border-[#9B9B9B] py-2 px-4 w-full max-w-40 rounded-full"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="text-white bg-[#DB3022] border border-[#DB3022] py-2 px-4 w-full max-w-40 rounded-full"
          >
            Save
          </button>
        </div>
      </form>
      <button
        type="button"
        className="absolute top-5 right-5"
        onClick={onClose}
      >
        <span className="sr-only">Tutup</span>
        <CloseIcon />
      </button>
    </dialog>
  );
});

function FormControl({ children }) {
  return <div className="flex flex-col gap-3">{children}</div>;
}

function Label({ children, id }) {
  return (
    <label htmlFor={id} className="text-[#9B9B9B] text-sm font-medium">
      {children}
    </label>
  );
}

function Input({ ...props }) {
  return (
    <input
      {...props}
      className="py-3 px-5 w-full border border-[#9B9B9B] shadow-[0_1px_8px_0px_#0000000D] rounded"
    />
  );
}
