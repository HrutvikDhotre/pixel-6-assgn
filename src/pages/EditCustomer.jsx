import React from 'react'
import AddCustomerForm from '../components/addcustomer/AddCustomerForm'
import '../styles/addcustomer.css'


const EditCustomer = () => {
  return (
    <>
      <div className='mt-4 d-flex align-items-center text-box'>
        <div className='line' ></div>
        <span className='px-2 ms-2 text'
        >Edit Customer</span>
      </div >
      <AddCustomerForm toBeEdited={true} />
    </>
  )
}

export default EditCustomer