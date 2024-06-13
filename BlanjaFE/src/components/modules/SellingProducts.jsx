import React, { useEffect, useState } from 'react'
import InputField from '../base/InputField'
import ImageBox from '../../assets/ImageBox.svg'
import Button from '../base/Button'
import axios from 'axios'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CloseMark from "@heroicons/react/24/solid/XMarkIcon";

const SellingProducts = () => {
    const [formProduct, setFormProduct] = useState({
        name: "",
        price: 0,
        stock: 0,
        rating: 5,
        description: "",
        condition: "",
        category_id: 1,
        images: [],
        sizes: [],
        colors: []
    })
    const [inputColor, setInputColor] = useState("")
    const [inputSize, setInputSize] = useState("")
    const [listCategories, setListCategories] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        axios.get(`${import.meta.env.VITE_BE_URL}categories`)
        .then((res) => {
            console.log(res.data.data);
            setListCategories(res.data.data)
            setLoading(false)
        })
        .catch((err) => {
            console.log(err.response);
            setLoading(false)
        })
    }, [])

    const handleChangeInput = (e) => {
        setFormProduct({
            ...formProduct,
            [e.target.name]: e.target.value
        })
    }

    const handleUploadImage = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        axios
          .post(`${import.meta.env.VITE_BE_URL}uploadImage`, formData, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            const { url } = res.data.data;
            console.log(url);
            setFormProduct({
                ...formProduct,
                images: [
                    ...formProduct.images,
                    {url: url}
                ]
            })
          })
          .catch((err) => {
            console.log(err.response);
            alert(`Failed to upload image`);
          });
      };
    const handleRemoveUrl = (index) => {
        setFormProduct({
            ...formProduct,
            images: [
                ...formProduct.images.slice(0, index),
                ...formProduct.images.slice(index+1,)
            ]
        })
    }

    const handleStoreColor = () => {
        setFormProduct({
            ...formProduct,
            colors: [
                ...formProduct.colors,
                {value: inputColor}
            ]
        })
        console.log(formProduct);
    }
    const handleRemoveColor = (index) => {
        setFormProduct({
            ...formProduct,
            colors: [
                ...formProduct.colors.slice(0, index),
                ...formProduct.colors.slice(index+1,)
            ]
        })
    }

    const handleStoreSize = () => {
        setFormProduct({
            ...formProduct,
            sizes: [
                ...formProduct.sizes,
                {value: inputSize}
            ]
        })
        console.log(formProduct);
    }
    const handleRemoveSize = (index) => {
        setFormProduct({
            ...formProduct,
            sizes: [
                ...formProduct.sizes.slice(0, index),
                ...formProduct.sizes.slice(index+1,)
            ]
        })
    }
    
    const handleAddProduct = () => {
        console.log(formProduct);
        axios.post(`${import.meta.env.VITE_BE_URL}product`, {
            name: formProduct.name,
            price: parseInt(formProduct.price),
            stock: parseInt(formProduct.stock),
            description: formProduct.description,
            condition: formProduct.condition,
            category_id: formProduct.category_id,
            images: formProduct.images,
            sizes: formProduct.sizes,
            colors: formProduct.colors
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((res) => {
            console.log(res.data.message);
            alert(res.data.message)
        })
        .catch((err) => {
            console.log(err.response);
            alert(`${err.response.data.message}`)
        })
    }
    


    if (loading === true) {
        return (
        <div className='w-[850px] h-auto bg-[#F5F5F5]'>
            <div className='w-[100%] bg-white px-6 py-8 rounded-[4px]'>
                <div className='w-[40%]'>
                    <Skeleton className='h-[70px]' />
                </div>
            </div>
            <div className='w-full h-0 border-t border-[#D4D4D4]'></div>
            <div className='w-[100%] bg-white px-6 py-8  rounded-[4px]'>
                <div className='w-[348px]'>
                    <Skeleton className='h-[70px]' />
                </div>
            </div>
        </div>
        )
    }
  return (
    <div className='w-[850px] h-auto bg-[#F5F5F5]'>
        {/* Inventory */}
        <div className='w-[100%] bg-white px-6 py-8 rounded-[4px]'>
            <p className='font-metropolis font-semibold text-[20px] text-[#222222]'>Inventory</p>
        </div>
        <div className='w-full h-0 border-t border-[#D4D4D4]'></div>
        <div className='w-[100%] bg-white px-6 py-8  rounded-[4px]'>
            <div className='w-[348px]'>
                <InputField type='text' name="name" label="Name of goods" onChange={handleChangeInput} />
            </div>
        </div>
        {/* Inventory */}

        {/* Item details */}
        <div className='w-[100%] bg-white px-6 py-8 rounded-[4px] mt-10'>
            <p className='font-metropolis font-semibold text-[20px] text-[#222222]'>Item details</p>
        </div>
        <div className='w-full h-0 border-t border-[#D4D4D4]'></div>
        <div className='w-[100%] bg-white px-6 py-8  rounded-[4px]'>
            <div className='w-[348px] mb-8'>
                <InputField type='text' name="price" label="Unit price" onChange={handleChangeInput} />
            </div>
            <div className='w-[348px] mb-10'>
                <InputField type='text' name="stock" label="Stock" placeholder="Ex: 12" onChange={handleChangeInput} />
            </div>
            <div className='w-[348px] mb-10'>
                <fieldset className='border-none flex'>
                    <legend className='font-metropolis font-medium text-[14px] text-[#9B9B9B] mb-5'>Condition</legend>
                    <label className='font-normal font-metropolis text-[14px] text-[#9B9B9B] flex gap-3 items-center mr-7'>
                        <input type="radio" name="condition" onClick={handleChangeInput} id='new' value="new" />
                        New
                    </label>
                    <label className='font-normal font-metropolis text-[14px] text-[#9B9B9B] flex gap-3 items-center'>
                        <input type="radio" name="condition" onClick={handleChangeInput} id='used' value="used" />
                        Used
                    </label>
                </fieldset>
            </div>
            <div className='w-[348px] mb-10'>
                <p className='font-metropolis font-medium text-[14px] text-[#9B9B9B] mb-5'>Category</p>
                <div className='w-full flex flex-wrap justify-start gap-4'>
                    {listCategories.map((category, index) => (
                        <button onClick={() => setFormProduct({...formProduct, category_id: category.id})} className={`${formProduct.category_id === category.id ? 'h-[30px] w-[70px] outline-none bg-[#DB3022] font-metropolis font-normal text-[14px] text-[#FFFFFF]' : 'h-[30px] w-[70px] outline outline-1 outline-[#9B9B9B] font-metropolis font-normal text-[14px] text-[#9B9B9B]'}`} key={index}>
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>
            <div className='w-[348px] mb-10'>
                <div className='flex gap-5 justify-start items-end'>
                    <div className='w-[70%]'>
                        <InputField type='text' name="color" label="Add Color" placeholder="Input Hex Color. Ex: #DB3022" onChange={(e) => setInputColor(e.target.value)} />
                    </div>
                    <div className='w-[20%]'>
                        <button onClick={handleStoreColor} className='w-full h-[40px] rounded-r-[25px] rounded-l-[25px] bg-[#DB3022] font-normal text-[14px] text-white border-none hover:cursor-pointer hover:bg-red-900'>Add</button>
                    </div>
                </div>
                <div className='flex flex-wrap justify-start gap-4 mt-5'>
                    {formProduct.colors.length !== 0 && formProduct.colors.map((color, index) => (
                        <button key={index} onClick={() => handleRemoveColor(index)} style={{ "--color-product": `${color.value}` }} className={`group bg-[var(--color-product)] rounded-full w-[50px] h-[50px] shadow-lg`}><CloseMark className='w-full h-full rounded-full outline-none border-none opacity-0 group-hover:text-black group-hover:opacity-100 group-hover:bg-gray-400 group-hover:bg-opacity-30' /></button>
                    ))}
                </div>
            </div>
            <div className='w-[348px] mb-10'>
                <div className='flex gap-5 justify-start items-end'>
                    <div className='w-[70%]'>
                        <InputField type='text' name="size" label="Add Size" placeholder="Input Size. Ex: XL or Ex: 42" onChange={(e) => setInputSize(e.target.value)} />
                    </div>
                    <div className='w-[20%]'>
                        <button onClick={handleStoreSize} className='w-full h-[40px] rounded-r-[25px] rounded-l-[25px] bg-[#DB3022] font-normal text-[14px] text-white border-none hover:cursor-pointer hover:bg-red-900'>Add</button>
                    </div>
                </div>
                <div className='flex flex-wrap justify-start gap-4 mt-5'>
                    {formProduct.sizes.length !== 0 && formProduct.sizes.map((size, index) => (
                        <button key={index} onClick={() => handleRemoveSize(index)} className={'group h-[30px] w-[70px] outline outline-1 outline-[#9B9B9B] font-metropolis font-normal text-[14px] text-[#9B9B9B] hover:flex hover:justify-start hover:items-center hover:pl-2 hover:pr-2 relative'}>{size.value}  <CloseMark className='w-[14px] h-[14px] text-black ml-auto rounded-full outline outline-1 outline-black opacity-0 absolute group-hover:static group-hover:opacity-100  shadow-md' /></button>
                    ))}
                </div>
            </div>           
        </div>
        {/* Item details */}

        {/* Photo of goods */}
        <div className='w-[100%] bg-white px-6 py-8 rounded-[4px] mt-10'>
            <p className='font-metropolis font-semibold text-[20px] text-[#222222]'>Photo of goods</p>
        </div>
        <div className='w-full h-0 border-t border-[#D4D4D4]'></div>
        <div className='w-[100%] bg-white px-6 py-8  rounded-[4px]'>
            <div className='w-[790px] h-auto px-4 py-8 rounded-[4px] outline-1 outline-dashed outline-[#D4D4D4] flex flex-col items-center'>
                {formProduct.images.length > 0 ? (
                <div className='w-full h-auto flex justify-start overflow-x-auto pb-4'>
                <ul className='flex items-center gap-5 whitespace-nowrap'>
                    {formProduct.images.map((image, index) => (
                        <li 
                        key={index}
                        style={{ "--image-product": `url(${image.url})` }} 
                        className={`relative bg-[image:var(--image-product)] bg-cover rounded-md whitespace-nowrap ${index === 0 ? 'w-[190px] h-[190px]' : 'w-[120px] h-[120px]'}`}
                      >
                        <button onClick={() => handleRemoveUrl(index)} className='absolute top-2 right-2 w-[24px] h-[24px] rounded-full bg-white'>
                          <CloseMark />
                        </button>
                      </li>
                    ))}
                </ul>
                </div>
                ) : (
                <div className='w-full flex items-center gap-5 overflow-x-auto pb-4'>
                    {[1,2,3,4,5,6].map((value, index) => (
                        index === 0 ? <img src={ImageBox} alt="imagbox" className='w-[190px] h-[190px]' key={index} /> : <img src={ImageBox} alt="imagebox" className='w-[120px] h-[120px]' key={index} />
                    ))}
                </div>
                )}
                <div className='w-[100%] h-0 border-t border-[#D4D4D4] mt-8'></div>
                <label className='w-[160px] h-[36px] mt-6 border border-[#9B9B9B] rounded-[24px] px-3 font-metropolis font-medium text-[14px] text-[#9B9B9B] flex justify-center items-center hover:cursor-pointer'>
                    <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleUploadImage}
                    />
                    Upload Photos
                </label>
            </div>
        </div>
        {/* Photo of goods */}

        {/* Description */}
        <div className='w-[100%] bg-white px-6 py-8 rounded-[4px] mt-10'>
            <p className='font-metropolis font-semibold text-[20px] text-[#222222]'>Description</p>
        </div>
        <div className='w-full h-0 border-t border-[#D4D4D4]'></div>
        <div className='w-[100%] bg-white px-6 py-8  rounded-[4px] flex justify-center'>
            <textarea name="description" id="description" cols="30" rows="100" className='font-metropolis font-normal text-[14px] text-black outline outline-1 outline-[#D4D4D4] w-[85%] max-h-[316px] p-5' onChange={handleChangeInput}></textarea>
        </div>
        {/* Description */}

        {/* Button submit */}
        <div className='w-full h-auto flex justify-end mt-10'>
            <div className='w-[128px]'>
                <Button onClick={handleAddProduct}>Jual</Button>
            </div>
        </div>
        {/* Button submit */}
    </div>
  )
}

export default SellingProducts