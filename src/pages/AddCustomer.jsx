import React from 'react'
import AddCustomerForm from '../components/addcustomer/AddCustomerForm'
import '../styles/addcustomer.css'


const AddCustomer = () => {
  return (
    <>
      <div className='mt-4  d-flex align-items-center text-box'>
        <div className='line' ></div>
        <span className='px-2 ms-2 text'
        >Add Customer</span>
      </div >
      <AddCustomerForm toBeEdited={false} />
    </>
  )
}

export default AddCustomer