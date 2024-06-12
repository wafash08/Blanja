import React, { useState } from 'react'
import InputField from '../base/InputField'

const SellingProducts = () => {
    const [formProduct, setFormProduct] = useState({
        name: "",
        price: 0,
        stock: 0,
        rating: 0,
        description: "",
        condition: "new",
        category_id: 1,
        images: [
            {url: ""}
        ],
        sizes: [
            {value: ""}
        ],
        colors: [
            {value: ""}
        ]
    })

    const handleChangeInput = (e) => {
        setFormProduct({
            ...formProduct,
            [e.target.name]: e.target.value
        })
    }
  return (
    <div className='w-[850px] h-auto bg-[#F5F5F5]'>
        {/* Inventory */}
        <div className='w-[100%] bg-white px-6 py-8'>
            <p className='font-metropolis font-semibold text-[20px] text-[#222222]'>Inventory</p>
        </div>
        <div className='w-full h-0 border-t border-[#D4D4D4]'></div>
        <div className='w-[100%] bg-white px-6 py-8'>
            <div className='w-[348px]'>
                <InputField type='text' name="name" label="Name of goods" onChange={handleChangeInput} />
            </div>
        </div>
        {/* Inventory */}

        {/* Item details */}
        <div></div>
        {/* Item details */}

        {/* Photo of goods */}
        <div></div>
        {/* Photo of goods */}

        {/* Description */}
        <div></div>
        {/* Description */}
    </div>
  )
}

export default SellingProducts