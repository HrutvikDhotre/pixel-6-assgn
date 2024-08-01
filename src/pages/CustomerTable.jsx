import React from 'react'
import CustomerTableTable from '../components/customertable/CustomerTableTable'
import '../styles/customertable.css'

const CustomerTable = () => {
  return (
    <>
    <div className='mt-4  d-flex align-items-center text-box'>
        <div className='line' ></div>
        <span className='px-2 ms-2 text'
        >Customer Details</span>
      </div >
          <div className='mx-5 my-5'>
      <CustomerTableTable/>
    </div>
    </>
  )
}

export default CustomerTable