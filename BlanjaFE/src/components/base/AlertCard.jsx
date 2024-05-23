import React from 'react'
import Button from './Button'

const AlertCard = ({alertMessage="Something went wrong", alertType="", onClick }) => {
  return (
    <div>
        {alertType === "ERROR" && (<div className='text-red-500 text-center bg-white rounded-md border border-red-500 font-metropolis font-semibold p-4 fixed top-9 right-12'>{alertMessage}<Button onClick={onClick} className={'font-metropolis font-semibold h-auto w-auto text-[14px] rounded-r-[4px] rounded-l-[4px] px-2 mt-2'}>OK</Button></div>)}
        {alertType === "SUCCESS" && (<div className='text-blue-500 text-center bg-white rounded-md border border-blue-500 font-metropolis font-semibold p-4 fixed top-9 right-12'>{alertMessage}<Button onClick={onClick} className={'font-metropolis font-semibold h-auto w-auto text-[14px] rounded-r-[4px] rounded-l-[4px] px-2 bg-blue-500 hover:bg-blue-800 mt-2'}>OK</Button></div>)}
        {alertType === "INFO" && (<div className='text-green-600 text-center bg-white rounded-md border border-green-600 font-metropolis font-semibold p-4 fixed top-9 right-12'>{alertMessage}</div>)}

    </div>
  )
}

export default AlertCard