import { React, useEffect, useState } from "react";
import Container from "../../../components/base/Container";
import Navbar from "../../../components/modules/Navbar";
import SelectAllItems from "../../../components/base/CartSelectItem";
import ProductList from "../../../components/base/CartListProduct";
import ShoppingSummary from "../../../components/base/ShoppingSummary";
import productDummy from "../../../assets/product-dummy.png";
import { useCarts } from "../../../hooks/CartsHooks";
import {
  AvatarSkeleton,
  CartListSkeleton,
  ProductListSkeleton,
} from "../../../components/base/Skeleton";
import axios from "axios";

const Cart = () => {
  const { data: cartsProduct, status } = useCarts();
  const [products, setProducts] = useState([]);
  const [cartId, setCartId] = useState(null);
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

  const handleSelectAll = (isSelected) => {
    const updatedProducts = products.map((product) => ({
      ...product,
      isSelected,
    }));
    setProducts(updatedProducts);
    console.log("cek data", updatedProducts);
  };

  const handleProductChange = async (productId, quantityChange) => {
    console.log("params", productId, quantityChange);
    const BASE_URL = import.meta.env.VITE_BE_URL;
    const addProduct = `${BASE_URL}cart/addProduct`;
    const removeProduct = `${BASE_URL}cart/removeProduct`;
    const product = products.find((product) => product.id === productId);
    if (!product) return;

    const newQuantity = product.quantity + quantityChange;
    console.log("quantity: ", newQuantity);
    // if (newQuantity < 1) return;

    const endpoint = quantityChange > 0 ? addProduct : removeProduct;
    console.log("endpoint", endpoint);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          cart_id: product.cartId,
          product_id: productId,
          quantity: Math.abs(quantityChange),
        }),
      });

      if (response.ok) {
        let updatedProducts;
        if (newQuantity === 0) {
          updatedProducts = products.filter(
            (product) => product.id !== productId
          );
        } else {
          updatedProducts = products.map((product) =>
            product.id === productId
              ? {
                  ...product,
                  quantity: newQuantity,
                }
              : product
          );
        }
        setProducts(updatedProducts);
      } else {
        console.error(
          "Failed to update product quantity:",
          await response.text()
        );
      }
    } catch (error) {
      console.error("Error updating product quantity:", error);
    }
  };
  const handleIndividualSelect = (productId, isSelected) => {
    const updatedProducts = products.map((product) =>
      product.id === productId ? { ...product, isSelected } : product
    );
    setProducts(updatedProducts);
    console.log("data individual", updatedProducts);
  };

  const handleDeleteSelected = async () => {
    const BASE_URL = import.meta.env.VITE_BE_URL;
    const product = products.filter((item) => item.isSelected === true);
    const productID = product.map((item) => item.id);
    const cartID = product.map((item) => item.cartId);
    console.log(productID);
    try {
      const response = await fetch(`${BASE_URL}cart/deleteAllProduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          cart_id: cartID,
          product_id: productID,
        }),
      });
      if (response.ok) {
        // Jika penghapusan berhasil, perbarui state products
        const updatedProducts = products.filter((item) => !item.isSelected);
        setProducts(updatedProducts);
        console.log("Products successfully deleted and updated.");
      } else {
        console.error("Failed to delete products:", await response.text());
      }
      console.log("respon from delete", response);
    } catch (error) {
      console.error("Error updating product quantity:", error);
    }
  };
  const total =
    products && products.length > 0
      ? products.reduce(
          (acc, product) => acc + product.price * product.quantity,
          0
        )
      : 0;
  // const total =  products.reduce(
  //   (acc, product) => acc + product.price * product.quantity,0
  // )
  if (status === "loading") {
    cartList = <CartListSkeleton />;
  } else if (status === "success") {
    cartList = (
      <ProductList
        cart={products}
        onProductChange={handleProductChange}
        onIndividualSelect={handleIndividualSelect}
      />
    );
  } else if (status === "error") {
    cartList = <p>error</p>;
  }
  // console.log("list", products);
  return (
    <Container>
      <section className="mt-32">
        <div>
          <h2 className="text-[34px] font-extrabold text-[#222222] leading-8">
            My Bag
          </h2>
        </div>
        <div className="p-4 flex justify-between gap-6 max-md:flex-col max-md:p-0 max-md:py-4">
          <div className=" w-3/5 max-md:w-full">
            <SelectAllItems
              products={products}
              onSelectAll={handleSelectAll}
              onDeleteSelected={handleDeleteSelected}
            />
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

export default Cart;
