import clsx from 'clsx'
import React from 'react'

const Button = ({children, className, onClick}) => {
  return (
    <div>
        <button type='submit' onClick={onClick} className={clsx('w-full h-[50px] rounded-r-[25px] rounded-l-[25px] bg-[#DB3022] font-[500] text-base text-white border-none hover:cursor-pointer hover:bg-red-900', className)}>{children}</button>
    </div>
  )
}

export default Button