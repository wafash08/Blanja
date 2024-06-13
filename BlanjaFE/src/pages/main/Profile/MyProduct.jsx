import clsx from "clsx";
import { Link, useSearchParams } from "react-router-dom";
import SearchBar from "../../../components/base/SearchBar";
import EmptyProduct from "../../../assets/empty-product.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { CartListSkeleton } from "../../../components/base/Skeleton";

export default function MyProducts() {
  const [myProduct, setMyProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const formatRupiah = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BE_URL}seller/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log("data my prodouct", res.data.data.products);
        setMyProduct(res.data.data.products);
        setFilteredProducts(res.data.data.products)
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    if (searchQuery === '') {
      setFilteredProducts(myProduct);
    } else {
      setFilteredProducts(
        myProduct.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, myProduct]);
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
    <section className="bg-white border border-[#9B9B9B] rounded p-7 max-w-[850px] min-h-screen">
      <div className="mb-[14px]">
        <h2 className="text-[#222] text-xl font-semibold">My Product</h2>
      </div>
      <div className="border-b border-b-[#D4D4D4] mb-4"></div>
      <div className="mb-4">
        <div className="w-full sm:w-[230px] bg-white border border-[#8E8E93] flex items-center gap-2 overflow-hidden rounded-full">
          <input
            type="text"
            name="search"
            className="w-full h-full py-3 pl-5 focus:outline-none placeholder:text-[#9B9B9B] rounded-full"
            placeholder="Search"
            id="search"
            value={searchQuery}
            onChange={handleSearch}
          />
          <button
            type="submit"
            className="rounded-full w-8 h-8 inline-flex items-center justify-center mr-3"
          >
            <span className="sr-only">Cari produk</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className=""
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.6697 16.1666L12.7415 11.2366C13.6249 10.0317 14.0981 8.57511 14.0915 7.08114C14.0747 3.18139 10.9205 0.0225957 7.02076 7.16372e-05C5.15452 -0.00837202 3.36242 0.729916 2.04368 2.05047C0.724944 3.37102 -0.0108835 5.16413 0.000121693 7.03036C0.016977 10.9305 3.17147 14.0895 7.07155 14.1121C8.57161 14.1186 10.0335 13.6398 11.2392 12.7473L11.2443 12.7434L16.168 17.6696C16.4342 17.9489 16.8308 18.062 17.2043 17.965C17.5777 17.868 17.8692 17.5762 17.9659 17.2027C18.0626 16.8292 17.9492 16.4326 17.6697 16.1666ZM7.06638 12.7004C3.94649 12.6824 1.42294 10.1554 1.40924 7.0355C1.40082 5.54272 1.98953 4.10851 3.04432 3.05215C4.09912 1.99579 5.53244 1.40495 7.02524 1.41115C10.1451 1.42909 12.6687 3.95609 12.6824 7.076C12.6908 8.56879 12.1021 10.003 11.0473 11.0594C9.99251 12.1157 8.55918 12.7066 7.06638 12.7004Z"
                fill="#8E8E93"
              />
            </svg>
          </button>
        </div>
      </div>
      {loading ? (
        <CartListSkeleton />
      ) : (
        <div className="border-2 border-[#D4D4D4] rounded-md h-[412px] overflow-auto">
          {filteredProducts.length === 0 ? (
            <div className="flex justify-center items-end mt-24">
              <img src={EmptyProduct} alt="No products" />
            </div>
          ) : (
            <table className="w-full table-fixed border-collapse">
              <thead>
                <tr className="bg-gray-200 h-14 text-gray-400">
                  <th className="p-4 text-left text-sm font-semibold w-1/2">
                    Product Name
                  </th>
                  <th className="p-4 text-center text-sm font-semibold w-1/4">
                    Price
                  </th>
                  <th className="p-4 text-center text-sm font-semibold w-1/4">
                    Stock
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map((product, index) => (
                  <tr key={index}>
                    <td className="p-4 border-t border-gray-200 text-sm">
                      {product.name}
                    </td>
                    <td className="p-4 border-t border-gray-200 text-sm text-center">
                      {formatRupiah(product.price)}
                    </td>
                    <td className="p-4 border-t border-gray-200 text-sm text-center">
                      {product.stock}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </section>
  );
}
