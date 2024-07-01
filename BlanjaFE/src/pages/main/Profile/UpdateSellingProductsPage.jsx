import React from 'react'
import UpdateSellingProducts from '../../../components/modules/UpdateSellingProducts'
import { useParams } from 'react-router-dom'

const UpdateSellingProductsPage = () => {
    const { id } = useParams()
  return (
    <div>
        <UpdateSellingProducts id={id} />
    </div>
  )
}

export default UpdateSellingProductsPage