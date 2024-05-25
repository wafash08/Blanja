import React, { useEffect, useState } from "react";
import Container from "../../../components/base/Container";
import StoreImage from "../../../assets/store-image.svg";
import clsx from "clsx";
import Button from "../../../components/base/Button";
import { useParams } from "react-router-dom";
import BreadCrumb from "../../../components/base/BreadCrumb";
import ProductSection from "../../../components/modules/ProductSection";
import axios from "axios";

const DetailProduct = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("")
  const [sellerName, setSellerName] = useState("")
  const [imageList, setImageList] = useState([]);
  let isImage = false;
  const [imageURL, setImageURL] = useState(StoreImage);
  const starColors = [];

  const ratingCustomers = [
    {
      name: "Ahmad",
      user_id: 1,
      product_id: 465,
      rating: 5,
    },
    {
      name: "Barnabas",
      user_id: 2,
      product_id: 465,
      rating: 5,
    },
    {
      name: "Cyrus",
      user_id: 3,
      product_id: 465,
      rating: 5,
    },
    {
      name: "Darius",
      user_id: 4,
      product_id: 465,
      rating: 5,
    },
    {
      name: "Ezekiel",
      user_id: 5,
      product_id: 465,
      rating: 5,
    },
    {
      name: "Farroukh",
      user_id: 6,
      product_id: 465,
      rating: 5,
    },
    {
      name: "Ghulam",
      user_id: 7,
      product_id: 465,
      rating: 5,
    },
    {
      name: "Hasheem",
      user_id: 8,
      product_id: 465,
      rating: 5,
    },
    {
      name: "Illyria",
      user_id: 9,
      product_id: 465,
      rating: 5,
    },
    {
      name: "Jalut",
      user_id: 10,
      product_id: 465,
      rating: 5,
    },
  ];
  const sumRatings = {
    rating1: 0,
    rating2: 0,
    rating3: 0,
    rating4: 0,
    rating5: 0,
  };
  const sumOfUsersWhoRates = {
    rating1: 0,
    rating2: 0,
    rating3: 0,
    rating4: 0,
    rating5: 0,
  };
  ratingCustomers.map((value) => {
    if (value.rating === 1) {
      sumRatings.rating1 = sumRatings.rating1 + 1;
      sumOfUsersWhoRates.rating1 = sumOfUsersWhoRates.rating1 + 1;
    } else if (value.rating === 2) {
      sumRatings.rating2 = sumRatings.rating2 + 2;
      sumOfUsersWhoRates.rating2 = sumOfUsersWhoRates.rating2 + 1;
    } else if (value.rating === 3) {
      sumRatings.rating3 = sumRatings.rating3 + 3;
      sumOfUsersWhoRates.rating3 = sumOfUsersWhoRates.rating3 + 1;
    } else if (value.rating === 4) {
      sumRatings.rating4 = sumRatings.rating4 + 4;
      sumOfUsersWhoRates.rating4 = sumOfUsersWhoRates.rating4 + 1;
    } else if (value.rating === 5) {
      sumRatings.rating5 = sumRatings.rating5 + 5;
      sumOfUsersWhoRates.rating5 = sumOfUsersWhoRates.rating5 + 1;
    }
  });
  const meanRatings =
    Object.values(sumRatings).reduce((a, b) => a + b, 0) /
    ratingCustomers.length;
  const meanDisplay = Math.round(meanRatings * 10) / 10;
  const [ratings, setRatings] = useState(Math.floor(meanRatings));

  const [price, setPrice] = useState(0);
  const [colorList, setColorList] = useState([{

  }]);
  const [sizeList, setSizeList] = useState([{

  }]);
  const [quantity, setQuantity] = useState(1);
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("")
  const [indexSize, setIndexSize] = useState(0);
  const [amount, setAmount] = useState(1);
  for (let index = 5; index >= 1; index--) {
    if (index <= ratings) {
      starColors.push("yellow");
    } else {
      starColors.push("");
    }
  }

  const [loading, setLoading] = useState(true);
  const checkImage = (url) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = function () {
        if (this.width > 0) {
          resolve(true);
        }
      };
      image.onerror = function () {
        reject(false);
      };
      image.src = url;
    });
  };
  const outputCheckImage = async (url) => {
    let isImage = false;
    try {
      isImage = await checkImage(url);
      return isImage;
    } catch (error) {
      return isImage;
    }
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BE_URL}product/${id}`)
      .then(async (res) => {
        console.log(res);
        const imageURLS = []
        for (const index in res.data.data.images) {
          isImage = await outputCheckImage(res.data.data.images[index].url)
          if (isImage === true) {
             imageURLS.push(res.data.data.images[index].url)
          }
        }

        setImageList(imageURLS)
        setTitle(res.data.data.name)
        setSellerName(res.data.data.seller_name)
        setRatings(res.data.data.rating)
        setPrice(res.data.data.price)
        setColorList(res.data.data.colors)
        setSizeList(res.data.data.sizes)
        setCondition(res.data.data.condition)
        setDescription(res.data.data.desc)
        setQuantity(res.data.data.stock)
        await outputCheckImage(res.data.data.images[0].url) === true && setImageURL(res.data.data.images[0].url)



        setLoading(false);
      })
      .catch((err) => {
        console.log(err);

        setLoading(false);
      });
  }, []);
  const handleClickListImage = (e) => {
    setImageURL(e.target.src);
  };
  const handleClickIncreaseSize = () => {
    setIndexSize(indexSize + 1);
  };
  const handleClickDecreaseSize = () => {
    setIndexSize(indexSize - 1);
  };
  const handleClickIncreaseAmount = () => {
    setAmount(amount + 1);
  };
  const handleClickDecreaseAmount = () => {
    setAmount(amount - 1);
  };
  return (
    <Container className={"w-[1156px] mx-auto px-0 mb-40"}>
      <div>
        <Container>
          <BreadCrumb
            items={[
              {
                name: "Products",
                href: "/",
              },
              {
                name: "Product Name",
                href: `/products/${id}`,
                current: true,
              },
            ]}
          />
        </Container>
      </div>
      <div className="w-full h-auto flex mt-12">
        {/* Image Section */}
        <div className="h-[482px] w-auto">
          <div className="w-[367px] h-[460px]">
            <div className="w-[367px] h-[378px]">
              <img
                src={imageURL}
                alt="product-image"
                className="w-[367px] h-[378px] rounded-xl"
              />
            </div>
            <div className="flex gap-[10.5px] overflow-x-auto mt-4">
              {imageList.map((value, index) => (
                <img
                  className="w-[65px] h-[65px] rounded-md hover:cursor-pointer"
                  key={index}
                  src={value}
                  alt="product-image"
                  onClick={handleClickListImage}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Image Section */}

        {/*Detail Product Section*/}
        <div className="h-[482px] w-auto ml-7">
          <p className="text-[#222222] font-semibold text-[28px]">
            {title}
          </p>
          <p className="text-[#9B9B9B] text-[16px] font-medium">{sellerName}</p>
          {/* Ratings */}
          <div className="flex mt-4">
            <div className="flex flex-row-reverse justify-end gap-1">
              {starColors.map((value, index) =>
                value === "yellow" ? (
                  <svg
                    viewBox="0 0 16 16"
                    className="text-yellow-400 fill-current h-[16px] w-[16px]"
                    key={index}
                  >
                    <path d="M8.00021 13.0788L3.72956 15.258C3.36189 15.4456 2.9381 15.1321 3.00993 14.7256L3.82164 10.1322L0.397075 6.89231C0.0928178 6.60446 0.256135 6.09249 0.670876 6.034L5.41771 5.36454L7.55452 1.16227C7.73986 0.79777 8.26056 0.79777 8.4459 1.16227L10.5827 5.36454L15.3295 6.034C15.7443 6.09249 15.9076 6.60446 15.6033 6.89231L12.1788 10.1322L12.9905 14.7256C13.0623 15.1321 12.6385 15.4456 12.2709 15.258L8.00021 13.0788Z" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 16 16"
                    className="text-gray-400 fill-current h-[16px] w-[16px] peer peer-hover:text-yellow-400 hover:text-yellow-400"
                    key={index}
                  >
                    <path d="M8.00021 13.0788L3.72956 15.258C3.36189 15.4456 2.9381 15.1321 3.00993 14.7256L3.82164 10.1322L0.397075 6.89231C0.0928178 6.60446 0.256135 6.09249 0.670876 6.034L5.41771 5.36454L7.55452 1.16227C7.73986 0.79777 8.26056 0.79777 8.4459 1.16227L10.5827 5.36454L15.3295 6.034C15.7443 6.09249 15.9076 6.60446 15.6033 6.89231L12.1788 10.1322L12.9905 14.7256C13.0623 15.1321 12.6385 15.4456 12.2709 15.258L8.00021 13.0788Z" />
                  </svg>
                )
              )}
            </div>
            <p className="text-[12px] font-normal text-[#9B9B9B] ml-1">
              ({ratings})
            </p>
          </div>
          {/* Ratings */}

          {/* Price */}
          <p className="text-[16px] font-medium text-[#9B9B9B] mt-4">Price</p>
          <p className="font-bold text-[33px] text-[#222222]">$ {price}</p>
          {/* Price */}

          {/* Colors */}
          <p className="text-[16px] font-semibold text-[#222222] mt-8">Color</p>
          <ul className="flex items-center gap-5 mt-2">
            {colorList.map((color, index) => (
              <li className="inline-flex" key={index}>
                <label className="relative">
                  <span className="sr-only">{color.value}</span>
                  <input
                    type="radio"
                    name="colors"
                    id={color.value}
                    value={color.value}
                    className="peer appearance-none absolute top-0 left-0 w-full h-full cursor-pointer"
                  />
                  <div
                    className={clsx(
                      "w-9 h-9 rounded-full outline outline-1 outline-transparent peer-checked:outline-[#DB3022] outline-offset-4"
                    )}
                    style={{ backgroundColor: color.value, boxShadow: `0px 0px 8px grey` }}
                  />
                </label>
              </li>
            ))}
          </ul>
          {/* Colors */}

          {/* Size and Amounts */}
          <div className="w-full h-auto flex gap-x-24 mt-9">
            <div>
              <label className="text-[#222222] text-[16px] font-semibold">
                Size
              </label>
              <div className="flex items-center gap-2">
                {indexSize === 0 ? (
                  <button className="rounded-full bg-[#D4D4D4] w-[36px] h-[36px] text-[36px] text-[#FFFFFF] flex justify-center items-center shadow-[0px_0px_20px_#d5d8dc] hover:cursor-not-allowed">
                    {"<"}
                  </button>
                ) : (
                  <button
                    onClick={handleClickDecreaseSize}
                    className="rounded-full bg-white w-[36px] h-[36px] text-[36px] text-[#222222] flex justify-center items-center shadow-[0px_0px_20px_#d5d8dc]"
                  >
                    {"<"}
                  </button>
                )}
                <p>{sizeList[indexSize].value}</p>
                {indexSize === sizeList.length - 1 ? (
                  <button className="rounded-full bg-[#D4D4D4] w-[36px] h-[36px] text-[36px] text-[#FFFFFF] flex justify-center items-center shadow-[0px_0px_20px_#d5d8dc] hover:cursor-not-allowed">
                    {">"}
                  </button>
                ) : (
                  <button
                    onClick={handleClickIncreaseSize}
                    className="rounded-full bg-white w-[36px] h-[36px] text-[36px] text-[#222222] flex justify-center items-center shadow-[0px_0px_20px_#d5d8dc]"
                  >
                    {">"}
                  </button>
                )}
              </div>
            </div>
            <div>
              <label className="text-[#222222] text-[16px] font-semibold">
                Amount
              </label>
              <div className="flex items-center gap-2">
                {amount === 1 ? (
                  <button className="rounded-full bg-[#D4D4D4] w-[36px] h-[36px] text-[50px] text-[#FFFFFF] flex justify-center items-center shadow-[0px_0px_20px_#d5d8dc] hover:cursor-not-allowed">
                    -
                  </button>
                ) : (
                  <button
                    onClick={handleClickDecreaseAmount}
                    className="rounded-full bg-white w-[36px] h-[36px] text-[50px] text-[#222222] flex justify-center items-center shadow-[0px_0px_20px_#d5d8dc]"
                  >
                    -
                  </button>
                )}
                <p>{amount}</p>
                {amount === quantity ? (
                  <button className="rounded-full bg-[#D4D4D4] w-[36px] h-[36px] text-[36px] text-[#FFFFFF] flex justify-center items-center shadow-[0px_0px_20px_#d5d8dc] hover:cursor-not-allowed">
                    +
                  </button>
                ) : (
                  <button
                    onClick={handleClickIncreaseAmount}
                    className="rounded-full bg-white w-[36px] h-[36px] text-[36px] text-[#222222] flex justify-center items-center shadow-[0px_0px_20px_#d5d8dc]"
                  >
                    +
                  </button>
                )}
              </div>
            </div>
          </div>
          {/* Size and Amounts */}

          <div className="mt-10 flex gap-4">
            <button className="w-[160px] h-[50px] rounded-r-[25px] rounded-l-[25px] bg-white font-[500] text-[14px] text-[#222222] border-2 border-[#222222] hover:cursor-pointer">
              Chat
            </button>
            <button className="w-[160px] h-[50px] rounded-r-[25px] rounded-l-[25px] bg-white font-[500] text-[14px] text-[#222222] border-2 border-[#222222] hover:cursor-pointer">
              Add Bag
            </button>
            <div className="w-[343px]">
              <Button>Buy Now</Button>
            </div>
          </div>
        </div>
        {/* Detail Product section */}
      </div>

      {/* Product Information */}
      <div className="w-full h-auto mt-12">
        <p className="text-[#222222] text-[28px] font-semibold">
          Product Information
        </p>
        <p className="text-[#222222] text-[20px] font-semibold mt-10">
          Condition
        </p>
        <p className="text-[#DB3022] text-[20px] font-semibold">{condition}</p>
        <p className="text-[#222222] text-[20px] font-semibold mt-10">
          Description
        </p>
        <p className="text-[#9B9B9B] text-[14px] font-medium mt-3 leading-6">
          {description}
        </p>

        {/* Product Review */}
        <p className="text-[#222222] text-[28px] font-semibold mt-10">
          Product Review
        </p>
        <div className="w-full h-auto flex">
          <div className="flex-col mt-4">
            <p className="text-[60px] font-medium text-[#222222]">
              {meanDisplay}
              <span className="text-[#9B9B9B] text-[20px] font-normal">/5</span>
            </p>
            <div className="flex flex-row-reverse justify-end gap-1">
              {starColors.map((value, index) =>
                value === "yellow" ? (
                  <svg
                    viewBox="0 0 16 16"
                    className="text-yellow-400 fill-current h-[22px] w-[22px]"
                    key={index}
                  >
                    <path d="M8.00021 13.0788L3.72956 15.258C3.36189 15.4456 2.9381 15.1321 3.00993 14.7256L3.82164 10.1322L0.397075 6.89231C0.0928178 6.60446 0.256135 6.09249 0.670876 6.034L5.41771 5.36454L7.55452 1.16227C7.73986 0.79777 8.26056 0.79777 8.4459 1.16227L10.5827 5.36454L15.3295 6.034C15.7443 6.09249 15.9076 6.60446 15.6033 6.89231L12.1788 10.1322L12.9905 14.7256C13.0623 15.1321 12.6385 15.4456 12.2709 15.258L8.00021 13.0788Z" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 16 16"
                    className="text-gray-400 fill-current h-[22px] w-[22px] peer peer-hover:text-yellow-400 hover:text-yellow-400"
                    key={index}
                  >
                    <path d="M8.00021 13.0788L3.72956 15.258C3.36189 15.4456 2.9381 15.1321 3.00993 14.7256L3.82164 10.1322L0.397075 6.89231C0.0928178 6.60446 0.256135 6.09249 0.670876 6.034L5.41771 5.36454L7.55452 1.16227C7.73986 0.79777 8.26056 0.79777 8.4459 1.16227L10.5827 5.36454L15.3295 6.034C15.7443 6.09249 15.9076 6.60446 15.6033 6.89231L12.1788 10.1322L12.9905 14.7256C13.0623 15.1321 12.6385 15.4456 12.2709 15.258L8.00021 13.0788Z" />
                  </svg>
                )
              )}
            </div>
          </div>

          <div className="flex-col ml-10 mt-4">
            {/* Rating 5 */}
            <div className="flex items-center">
              <svg
                viewBox="0 0 16 16"
                className="text-yellow-400 fill-current h-[16px] w-[16px]"
              >
                <path d="M8.00021 13.0788L3.72956 15.258C3.36189 15.4456 2.9381 15.1321 3.00993 14.7256L3.82164 10.1322L0.397075 6.89231C0.0928178 6.60446 0.256135 6.09249 0.670876 6.034L5.41771 5.36454L7.55452 1.16227C7.73986 0.79777 8.26056 0.79777 8.4459 1.16227L10.5827 5.36454L15.3295 6.034C15.7443 6.09249 15.9076 6.60446 15.6033 6.89231L12.1788 10.1322L12.9905 14.7256C13.0623 15.1321 12.6385 15.4456 12.2709 15.258L8.00021 13.0788Z" />
              </svg>
              <p className="font-medium text-[14px] text-[#9B9B9B] ml-3 w-[9px]">
                5
              </p>
              <div className="w-[120px] h-auto ml-7">
                <div
                  style={{
                    width: `calc(100% * ${
                      sumOfUsersWhoRates.rating5 / ratingCustomers.length
                    })`,
                  }}
                  className="h-0 border-t-[6px] border-[#DB3022] rounded-lg"
                ></div>
              </div>
              <p className="font-medium text-[14px] text-[#9B9B9B] ml-5">
                {sumOfUsersWhoRates.rating5}
              </p>
            </div>
            {/* Rating 5 */}

            {/* Rating 4 */}
            <div className="flex items-center">
              <svg
                viewBox="0 0 16 16"
                className="text-yellow-400 fill-current h-[16px] w-[16px]"
              >
                <path d="M8.00021 13.0788L3.72956 15.258C3.36189 15.4456 2.9381 15.1321 3.00993 14.7256L3.82164 10.1322L0.397075 6.89231C0.0928178 6.60446 0.256135 6.09249 0.670876 6.034L5.41771 5.36454L7.55452 1.16227C7.73986 0.79777 8.26056 0.79777 8.4459 1.16227L10.5827 5.36454L15.3295 6.034C15.7443 6.09249 15.9076 6.60446 15.6033 6.89231L12.1788 10.1322L12.9905 14.7256C13.0623 15.1321 12.6385 15.4456 12.2709 15.258L8.00021 13.0788Z" />
              </svg>
              <p className="font-medium text-[14px] text-[#9B9B9B] ml-3 w-[9px]">
                4
              </p>
              <div className="w-[120px] h-auto ml-7">
                <div
                  style={{
                    width: `calc(100% * ${
                      sumOfUsersWhoRates.rating4 / ratingCustomers.length
                    })`,
                  }}
                  className="h-0 border-t-[6px] border-[#DB3022] rounded-lg"
                ></div>
              </div>
              <p className="font-medium text-[14px] text-[#9B9B9B] ml-5">
                {sumOfUsersWhoRates.rating4}
              </p>
            </div>
            {/* Rating 4 */}

            {/* Rating 3 */}
            <div className="flex items-center">
              <svg
                viewBox="0 0 16 16"
                className="text-yellow-400 fill-current h-[16px] w-[16px]"
              >
                <path d="M8.00021 13.0788L3.72956 15.258C3.36189 15.4456 2.9381 15.1321 3.00993 14.7256L3.82164 10.1322L0.397075 6.89231C0.0928178 6.60446 0.256135 6.09249 0.670876 6.034L5.41771 5.36454L7.55452 1.16227C7.73986 0.79777 8.26056 0.79777 8.4459 1.16227L10.5827 5.36454L15.3295 6.034C15.7443 6.09249 15.9076 6.60446 15.6033 6.89231L12.1788 10.1322L12.9905 14.7256C13.0623 15.1321 12.6385 15.4456 12.2709 15.258L8.00021 13.0788Z" />
              </svg>
              <p className="font-medium text-[14px] text-[#9B9B9B] ml-3 w-[9px]">
                3
              </p>
              <div className="w-[120px] h-auto ml-7">
                <div
                  style={{
                    width: `calc(100% * ${
                      sumOfUsersWhoRates.rating3 / ratingCustomers.length
                    })`,
                  }}
                  className="h-0 border-t-[6px] border-[#DB3022] rounded-lg"
                ></div>
              </div>
              <p className="font-medium text-[14px] text-[#9B9B9B] ml-5">
                {sumOfUsersWhoRates.rating3}
              </p>
            </div>
            {/* Rating 3 */}

            {/* Rating 2 */}
            <div className="flex items-center">
              <svg
                viewBox="0 0 16 16"
                className="text-yellow-400 fill-current h-[16px] w-[16px]"
              >
                <path d="M8.00021 13.0788L3.72956 15.258C3.36189 15.4456 2.9381 15.1321 3.00993 14.7256L3.82164 10.1322L0.397075 6.89231C0.0928178 6.60446 0.256135 6.09249 0.670876 6.034L5.41771 5.36454L7.55452 1.16227C7.73986 0.79777 8.26056 0.79777 8.4459 1.16227L10.5827 5.36454L15.3295 6.034C15.7443 6.09249 15.9076 6.60446 15.6033 6.89231L12.1788 10.1322L12.9905 14.7256C13.0623 15.1321 12.6385 15.4456 12.2709 15.258L8.00021 13.0788Z" />
              </svg>
              <p className="font-medium text-[14px] text-[#9B9B9B] ml-3 w-[9px]">
                2
              </p>
              <div className="w-[120px] h-auto ml-7">
                <div
                  style={{
                    width: `calc(100% * ${
                      sumOfUsersWhoRates.rating2 / ratingCustomers.length
                    })`,
                  }}
                  className="h-0 border-t-[6px] border-[#DB3022] rounded-lg"
                ></div>
              </div>
              <p className="font-medium text-[14px] text-[#9B9B9B] ml-5">
                {sumOfUsersWhoRates.rating2}
              </p>
            </div>
            {/* Rating 2 */}

            {/* Rating 1 */}
            <div className="flex items-center">
              <svg
                viewBox="0 0 16 16"
                className="text-yellow-400 fill-current h-[16px] w-[16px]"
              >
                <path d="M8.00021 13.0788L3.72956 15.258C3.36189 15.4456 2.9381 15.1321 3.00993 14.7256L3.82164 10.1322L0.397075 6.89231C0.0928178 6.60446 0.256135 6.09249 0.670876 6.034L5.41771 5.36454L7.55452 1.16227C7.73986 0.79777 8.26056 0.79777 8.4459 1.16227L10.5827 5.36454L15.3295 6.034C15.7443 6.09249 15.9076 6.60446 15.6033 6.89231L12.1788 10.1322L12.9905 14.7256C13.0623 15.1321 12.6385 15.4456 12.2709 15.258L8.00021 13.0788Z" />
              </svg>
              <p className="font-medium text-[14px] text-[#9B9B9B] ml-3 w-[9px]">
                1
              </p>
              <div className="w-[120px] h-auto ml-7">
                <div
                  style={{
                    width: `calc(100% * ${
                      sumOfUsersWhoRates.rating1 / ratingCustomers.length
                    })`,
                  }}
                  className="h-0 border-t-[6px] border-[#DB3022] rounded-lg"
                ></div>
              </div>
              <p className="font-medium text-[14px] text-[#9B9B9B] ml-5">
                {sumOfUsersWhoRates.rating1}
              </p>
            </div>
            {/* Rating 1 */}
          </div>
        </div>
        {/* Product Review */}
      </div>
      {/* Product Information */}

      <div className="w-full h-0 border-t border-[#D4D4D4] mt-20"></div>

      <ProductSection
        title="You can also like this"
        description="You’ve never seen it before!"
      />
    </Container>
  );
};

export default DetailProduct;
