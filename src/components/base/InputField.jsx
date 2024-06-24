import clsx from 'clsx'
import React, { useEffect, useState } from 'react'

const InputField = ({type="text", name, onChange, placeholder, value, label, className, validation=[]}) => {
  const [validate, setValidate] = useState("")
  useEffect(()=>{
    if (validation.length !== 0) {
      for (const key in validation) {
        if (validation[key].error_message.split(" ")[0].toLowerCase() === name || validation[key].error_message.split(/[.\s]+/)[1].toLowerCase() === name) {
          setValidate(validation[key].error_message)
        }
      } 
    }
  }, [validation])
  return (
    <div>
         {label && (<label className='font-normal font-metropolis text-[14px] text-[#9B9B9B]'>{label}</label>)}
        <input type={type} name={name} onChange={onChange} value={value} placeholder={placeholder} className={clsx('box-border w-full h-[48px] mt-2 rounded-[4px] px-5 outline-none border border-solid border-[#9B9B9B] bg-white font-normal text-[14px] placeholder:font-normal placeholder:text-sm placeholder:text-[#9B9B9B]', className)} required />
        {validate && (<label className='ml-1 font-normal font-metropolis text-[14px] text-red-700'>{validate}</label>)}
    </div>
  )
}

export default InputField