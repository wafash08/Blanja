import { React, useState } from "react";
import Container from "../../../components/base/Container";
import Navbar from "../../../components/modules/Navbar";
import SelectAllItems from "../../../components/base/CartSelectItem";
import ProductList from "../../../components/base/CartListProduct";
import ShoppingSummary from "../../../components/base/ShoppingSummary";
import productDummy from '../../../assets/product-dummy.png';

const Cart = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Men's formal suit - Black",
      image: productDummy,
      price: 20.0,
      quantity: 1,
      isSelected: false,
    },
    {
      id: 2,
      name: "Men's Jacket jeans",
      image: productDummy,
      price: 20.0,
      quantity: 1,
      isSelected: false,
    },
  ]);

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

  const total = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  return (
    <Container>
      <header className="fixed top-0 left-0 w-full h-[100px] z-50 flex items-center bg-white shadow-[0_6px_40px_0_#ADADAD40]">
        <Container>
          <Navbar hasLoggedIn={true} inHomePage={true} />
        </Container>
      </header>
      <section className="mt-32">
      <div>
      <h2 className='text-[34px] font-extrabold text-[#222222] leading-8'>My Bag</h2>
      </div>
        <div className=" p-4 flex justify-between gap-6">
        <div className=" w-3/5">
          <SelectAllItems
            products={products}
            onSelectAll={handleSelectAll}
            onDeleteSelected={handleDeleteSelected}
          />
          <ProductList
            products={products}
            onProductChange={handleProductChange}
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
