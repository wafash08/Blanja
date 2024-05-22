import clsx from 'clsx'
import React from 'react'

const InputField = ({type="text", name, onChange, placeholder, value, label, className}) => {
  return (
    <div>
         {label && (<label className='ml-1 mb-1 font-normal font-metropolis text-[14px] text-[#187465]'>{label}</label>)}
        <input type={type} name={name} onChange={onChange} value={value} placeholder={placeholder} className={clsx('box-border w-full h-[48px] rounded-[4px] px-5 outline-none border border-solid border-[#9B9B9B] bg-white font-normal text-[14px] placeholder:font-normal placeholder:text-sm placeholder:text-[#9B9B9B]', className)} required />
    </div>
  )
}

export default InputField