import { useParams } from "react-router-dom";
import Container from "../../../components/base/Container";
import { useEffect, useState } from "react";
import { useCarts } from "../../../hooks/CartsHooks";
import CheckoutProductList from "../../../components/base/CheckoutListProduct";
// import ShoppingSummary from "../../../components/base/ShoppingSummary";
import CheckoutAdress from "../../../components/base/CheckoutAddress";
import ShoppingSummary from "../../../components/base/CheckoutSummary";
import axios from "axios";

const Checkout = () => {
  //   const { id } = useParams();
  // const { data: cartsProduct, status } = useCarts();
  const [checkouts, setCheckouts] = useState("");
  const [address, setAddress] = useState("");
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  let cartList = null;

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BE_URL}checkout/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const extractCheckout = res.data.data.filter((item)=>(item.carts != 0))
        const extractCart = extractCheckout.filter((item)=>(item.carts)).map((item)=>(item.carts))
        console.log("data checkout", extractCart);
        setCheckouts(extractCheckout);
        setCarts(res.data.data.carts);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setLoading(false);
      });
  }, []);
  return (
    <Container>
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
            <CheckoutAdress  />
            <CheckoutProductList products={checkouts} />
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
