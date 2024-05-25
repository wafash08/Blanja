import { React, useEffect, useState } from "react";
import Container from "../../../components/base/Container";
import Navbar from "../../../components/modules/Navbar";
import SelectAllItems from "../../../components/base/CartSelectItem";
import ProductList from "../../../components/base/CartListProduct";
import ShoppingSummary from "../../../components/base/ShoppingSummary";
import productDummy from "../../../assets/product-dummy.png";
import { useCarts } from "../../../hooks/CartsHooks";
import { ProductListSkeleton } from "../../../components/base/Skeleton";

const Cart = () => {
  const { data: cartsProduct, status } = useCarts();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (status === "success") {
      setProducts(cartsProduct);
    }
  });
  const handleSelectAll = (isSelected) => {
    const updatedProducts = products.map((product) => ({
      ...product,
      isSelected,
    }));
    setProducts(updatedProducts);
  };

  const handleProductChange = (id, quantity, isSelected) => {
    const updatedProducts = products.map((product) =>
      product.id === id
        ? { ...product, quantity, isSelected: isSelected ?? product.isSelected }
        : product
    );
    setProducts(updatedProducts);
  };

  const handleDeleteSelected = () => {
    const updatedProducts = products.filter((product) => !product.isSelected);
    setProducts(updatedProducts);
  };
  const total = products && products.length > 0 ? products.reduce(
    (acc, product) => acc + product.price * product.quantity, 0
  ) : 0;
  // const total =  products.reduce(
  //   (acc, product) => acc + product.price * product.quantity,0
  // )

  return (
    <Container>
      <section className="mt-32">
        <div>
          <h2 className="text-[34px] font-extrabold text-[#222222] leading-8">
            My Bag
          </h2>
        </div>
          <div className=" p-4 flex justify-between gap-6">
            <div className=" w-3/5">
              <SelectAllItems
                products={products}
                onSelectAll={handleSelectAll}
                onDeleteSelected={handleDeleteSelected}
              />
              <ProductList
              />
            </div>
            <div className=" w-2/5">
              <ShoppingSummary total={total} />
            </div>
          </div>
      </section>
    </Container>
  );
};

export default Cart;
