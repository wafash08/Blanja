import { useParams } from "react-router-dom";
import Container from "../../../components/base/Container";
import { useEffect, useState } from "react";
import { useCarts } from "../../../hooks/CartsHooks";
import CheckoutProductList from "../../../components/base/CheckoutListProduct";
// import ShoppingSummary from "../../../components/base/ShoppingSummary";
import CheckoutAdress from "../../../components/base/CheckoutAddress";
import ShoppingSummary from "../../../components/base/CheckoutSummary";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import axios from "axios";
import ChooseAddressModal from "../../../components/modules/ChooseAddressModal";

const Checkout = () => {
  // //   const { id } = useParams();
  // const { data: cartsProduct, status } = useCarts();
  // const [checkouts, setCheckouts] = useState("");
  // const [address, setAddress] = useState("");
  // const [carts, setCarts] = useState([]);
  // const [loading, setLoading] = useState(true);
  // let cartList = null;

  // useEffect(() => {
  //   axios
  //     .get(`${import.meta.env.VITE_BE_URL}checkout/user`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     })
  //     .then((res) => {
  //       console.log("data checkout", res.data.data);
  //       setCheckouts(res.data.data);
  //       setAddress(res.data.data.address);
  //       setCarts(res.data.data.carts);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err.response);
  //       setLoading(false);
  //     });
  // }, []);
  const [loading, setLoading] = useState(true)
  const [defaultAddress, setDefaultAddress] = useState({}) 
  const getProfile = () => {
    setLoading(true);
    if (localStorage.getItem('role') === "customer") {
      axios.get(`${import.meta.env.VITE_BE_URL}customer/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then(res => {
          console.log(res.data.data);
          for (const key in res.data.data.addresses) {
            if (res.data.data.addresses[key].primary === 'on') {
              setDefaultAddress(res.data.data.addresses[key])
            }
          }
          setLoading(false);
        })
        .catch(err => {
          console.log(err.response);
          setLoading(false);
        });
    } else {
      axios.get(`${import.meta.env.VITE_BE_URL}seller/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(res => {
        console.log(res.data.data);
        for (const key in res.data.data.addresses) {
          if (res.data.data.addresses[key].primary === 'on') {
            setDefaultAddress(res.data.data.addresses[key])
          }
        }
        setLoading(false);
      })
      .catch(err => {
        console.log(err.response);
        setLoading(false);
      });
    }
  }
	useEffect(() => {
		getProfile()
	}, []);
  
  const [showChooseAddress, setShowChooseAddress] = useState(false)
  const handleChangeAddress = () => {
    setShowChooseAddress(true)
  }
  const handleCloseModal = () => {
    setShowChooseAddress(false)
    getProfile()
  }

  if (loading === true) {
    return (
      <Container>
        <section className="mt-32">
          <div className="px-4">
            <Skeleton className="w-[100%] h-[300px]" />
            <Skeleton className="w-[100%] h-[100px]" />
          </div>
          <div className="p-4 flex justify-between gap-6 max-md:flex-col max-md:p-0 max-md:py-4">
            <div className=" w-3/5 max-md:w-full">
              <Skeleton className="w-[100%] h-[400px]" />
              <Skeleton className="w-[100%] h-[200px]" />
            </div>
  
            <div className=" w-2/5 max-md:w-full">
              <Skeleton className="w-[100%] h-[500px]" />
            </div>
          </div>
        </section>
      </Container>
    );
  }
  return (
    <Container>
      {showChooseAddress === true && <ChooseAddressModal onClickX={handleCloseModal} />}
      <section className="mt-32">
        <div className="px-4">
          <h2 className="text-[34px] font-extrabold text-[#222222] leading-8">
            Checkout
          </h2>
          <p className="text-base text-[#222222] leading-10">
            Shipping Address
          </p>
        </div>
        <div className="p-4 flex justify-between gap-6 max-md:flex-col max-md:p-0 max-md:py-4">
          <div className=" w-3/5 max-md:w-full">
            <CheckoutAdress address={defaultAddress} onClick={handleChangeAddress} />
            <CheckoutProductList  />
          </div>

          <div className=" w-2/5 max-md:w-full">
            <ShoppingSummary />
          </div>
        </div>
      </section>
    </Container>
  );
};
export default Checkout;
