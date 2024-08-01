import React, { useEffect, useRef, useState } from 'react'
// import '../..//styles/addcustomer.css'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin, message } from 'antd'
import axios from 'axios'
import { stateOptions, cityOptions } from '../../data/StateCityData'
import { useNavigate, useParams } from 'react-router-dom'
import AddressComponent from './AddressComponent'
import { useStateContext } from '../../contexts/ContextProvider'

const AddCustomerForm = ({ toBeEdited }) => {
  const [customer, setCustomer] = useState({
    pan: '',
    fullName: '',
    email: '',
    mobile: '',
    addresses: [{ line1: '', line2: '', postCode: '', state: '', city: '' }],
  })
  const [isPanVerified, setIsPanVefified] = useState(false)
  const [loader, setLoader] = useState(false)
  const panRef = useRef(null)
  const [isStateSet, setIsStateSet] = useState(false)
  const [citySelectOptions, setCitySelectOptions] = useState([])
  const navigate = useNavigate()
  const { email } = useParams()
  const {customerEmail,setCustomerEmail} = useStateContext()

  useEffect(() => {
    if (toBeEdited)
      setFormInitialValues()
  }, [])

  const setFormInitialValues = () => {
    // console.log("email", email)
    const savedCustomers = localStorage.getItem('customers')
    const customersArray = JSON.parse(savedCustomers)
    const customerToBeEdited = customersArray.find(customer => customer.email === email)
    console.log(customerToBeEdited)
    // setIsStateSet(true)
    // setCitySelectOptions(cityOptions[customerToBeEdited.address.state])
    setIsPanVefified(true)
    setCustomer({
      pan: customerToBeEdited.pan,
      fullName: customerToBeEdited.fullName,
      email: customerToBeEdited.email,
      mobile: customerToBeEdited.mobile,
      addresses: customerToBeEdited.addresses
    })

  }

  const handleEdit = () => {
    try {
      const savedCustomers = localStorage.getItem('customers')
      const customersArray = savedCustomers ? JSON.parse(savedCustomers) : []
      const updatedCustomers = customersArray.map((cust) =>
        cust.email === customer.email ? customer : cust
      )
      localStorage.setItem('customers', JSON.stringify(updatedCustomers))
      message.success("Details updated successfully.")
      navigate('/customer-table')
    } catch (error) {
      console.log(error)
    }
  }



  const handleChange = (e) => {
    const { name, value } = e.target
    if (['line1', 'line2', 'postCode', 'state', 'city'].includes(name)) {
      setCustomer({
        ...customer,
        address: {
          ...customer.address,
          [name]: value,
        },
      })
    } else {
      setCustomer({
        ...customer,
        [name]: value,
      })
    }
  }



  const userExists = (customersArray) => {
    const customerExists = customersArray.find(cust => customer.email === cust.email)
    console.log(customerExists)
    if (customerExists)
      return true
    return false
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      if (!isPanVerified) {
        message.error("Please verify pan.")
        return
      }
      if (customer.mobile.length !== 10) {
        message.error("Please enter a valid mobile number")
        return
      }
      else if (customer.pan.length !== 10) {
        console.log(customer.pan)
        message.error("Please enter a valid pan.")
        return
      }
      // else if (customer.address.postCode.length !== 6) {
      //   message.error("Please enter a valid post code.")
      //   return
      // }
      if (toBeEdited) {
        handleEdit()
        return
      }

      const savedCustomers = localStorage.getItem('customers')
      const customersArray = savedCustomers ? JSON.parse(savedCustomers) : []
      if (userExists(customersArray)) {
        message.error("Customer with the email id exists")
        return
      }

      const updatedCustomers = [...customersArray, customer]
      localStorage.setItem('customers', JSON.stringify(updatedCustomers))
      localStorage.setItem('isCustomerSet','true')
      // setCustomerEmail(customer.email)
      navigate('/customer-table')
    } catch (error) {
      console.log(error)
    }
  }



  const verifyPan = async () => {
    try {
      if (customer.pan.length === 0) {
        panRef.current.reportValidity()
      }else if(customer.pan.length !== 10){
        message.error("Please enter a valid pan")
      } else {
        setLoader(true)
        const result = await axios.post('https://lab.pixel6.co/api/verify-pan.php', {
          "panNumber": customer.pan
        })
        // console.log(result.data)
        if (result.data.status === 'Success' && result.data.statusCode === 200) {
          setIsPanVefified(true)
          message.success('Pan verified successfully.')
        }

      }
    } catch (err) {
      console.log(err)
      message.error("Something went wrong while verifying pan details.Try after sometime.")
    } finally {
      setLoader(false)
    }
  }



  const handleInput = (e, maxLength) => {
    // console.log(e.target.name)
    if (e.target.value.length > maxLength) {
      e.target.value = e.target.value.slice(0, maxLength)
    }

    if (e.target.name === 'mobile') {
      e.target.value = e.target.value.replace(/\D/g, '')
    }
  }



  return (
    <>
      <div className='main-container'>
        <div className='custom-container mb-5 mt-4'>
          <div className='custom-form-section'>
            <form onSubmit={handleSubmit}>
              <div className='input-group-parent'>
                <label className='sub-form-label' htmlFor="">Personal Information</label>
                <div className='custom-input-group'>
                  <div className="input-label-container w-100">
                    <label htmlFor="">Full Name <span>*</span></label>
                    <input
                      type='text'
                      // placeholder='Full Name*'
                      name='fullName'
                      value={customer.fullName}
                      onChange={handleChange}
                      required
                      maxLength={140}
                      onInput={(e) => handleInput(e, 140)}
                    />
                  </div>
                </div>
                <div className='custom-input-group'>
                  <div className='input-label-container'>
                    <label htmlFor="">Email <span>*</span></label>
                    <input
                      type='email'
                      // placeholder='Email Address*'
                      name='email'
                      value={customer.email}
                      onChange={handleChange}
                      required
                      maxLength={255}
                      onInput={(e) => handleInput(e, 255)}
                    />
                  </div>

                  <div className='p-0 mobile-container '>
                    <div className="input-label-container w-100">
                      <label htmlFor="">Mobile <span>*</span></label>
                      <div className='d-flex'>
                        <span className='px-2 py-0 prefix' style={{ color: 'black' }}>+91</span>
                        <input
                          className='w-100'
                          type='tel'
                          // placeholder='Phone Number*'
                          name='mobile'
                          value={customer.mobile}
                          onChange={handleChange}
                          required
                          maxLength={10}
                          minLength={10}
                          onInput={(e) => handleInput(e, 10)}
                          style={{
                            // borderLeft: 'none',
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>


                <div className='custom-input-group'>
                  <div className="input-label-container w-100 ">
                    <label htmlFor="">PAN <span>*</span></label>
                    <div className='d-flex  flex-md-row flex-sm-column'>
                      <input
                        type='text'
                        // placeholder='PAN*'
                        name='pan'
                        value={customer.pan}
                        onChange={handleChange}
                        required
                        ref={panRef}
                        minLength={10}
                        maxLength={10}
                        onInput={(e) => handleInput(e, 10)}
                        disabled={toBeEdited || isPanVerified}
                      />
                      <button
                        type='button'
                        style={{ padding: loader ? '6px' : '', }}
                        disabled={isPanVerified}
                        className={`verify-pan-button`}
                        onClick={verifyPan}
                      >{
                          loader ?
                            <Spin indicator={
                              <LoadingOutlined
                                className="loading-icon"
                                style={{
                                  // padding : 0,
                                  // color : 'white'
                                }}
                                spin />}
                              size="large" />
                            : 'Verify'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {customer.addresses.map((address, index) => (
                <AddressComponent
                  key={index}
                  address={address}
                  index={index}
                  handleInput={handleInput}
                  customer={customer}
                  setCustomer={setCustomer}
                />
              ))}
              <button type='submit' className='custom-button mt-4' >
                {toBeEdited ? 'Edit Customer' : 'Add Customer'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddCustomerForm







