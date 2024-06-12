import { useParams } from "react-router-dom";
import Container from "../../../components/base/Container";
import { useEffect, useState } from "react";
import { useCarts } from "../../../hooks/CartsHooks";
import CheckoutProductList from "../../../components/base/CheckoutListProduct";
// import ShoppingSummary from "../../../components/base/ShoppingSummary";
import CheckoutAdress from "../../../components/base/CheckoutAddress";
import ShoppingSummary from "../../../components/base/CheckoutSummary";

const Checkout = () => {
  //   const { id } = useParams();
  const { data: cartsProduct, status } = useCarts();
  const [products, setProducts] = useState([]);
  let cartList = null;

  useEffect(() => {
    if (
      status === "success" &&
      cartsProduct &&
      Array.isArray(cartsProduct.cartsProducts)
    ) {
      const extractedProducts = cartsProduct.cartsProducts.flatMap((cart) => {
        // setCartId(cart.id);
        return cart.products.map((product) => ({
          ...product,
          cartId: cart.id,
          isSelected: false,
        }));
      });
      setProducts(extractedProducts);
    }
  }, [cartsProduct, status]);
  const total =
    products && products.length > 0
      ? products.reduce(
          (acc, product) => acc + product.price * product.quantity,
          0
        )
      : 0;
  return (
    <Container>
      <section className="mt-32">
        <div>
          <h2 className="text-[34px] font-extrabold text-[#222222] leading-8">
            Checkout
          </h2>
          <p className="text-base text-[#222222] leading-10">
            Shipping Address
          </p>
        </div>
        <div className="p-4 flex justify-between gap-6 max-md:flex-col max-md:p-0 max-md:py-4">
          <div className=" w-3/5 max-md:w-full">
          <CheckoutAdress />
            <CheckoutProductList cart={products} />
            {cartList}
          </div>

          <div className=" w-2/5 max-md:w-full">
            <ShoppingSummary total={total} />
          </div>
        </div>
      </section>
    </Container>
  );
};
export default Checkout;
