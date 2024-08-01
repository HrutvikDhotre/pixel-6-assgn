import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { stateOptions, cityOptions } from '../../data/StateCityData'
import { IoAddCircle } from "react-icons/io5"
import { MdDelete } from "react-icons/md"
import { IoAddCircleOutline } from "react-icons/io5"
import axios from 'axios'
const AddressComponent = ({ customer, setCustomer, handleInput, address, index }) => {
    const [isStateSet, setIsStateSet] = useState(false)
    const [citySelectOptions, setCitySelectOptions] = useState([])

    useEffect(() => {
        if (address.state) {
            setIsStateSet(true)
            setCitySelectOptions(cityOptions[address.state])
        }
    }, [address.state])

    const handleSelectChange = (selectedOption, actionMeta) => {
        const { name } = actionMeta
        const newAddresses = [...customer.addresses]
        newAddresses[index][name] = selectedOption ? selectedOption.value : ''
        setCustomer({
            ...customer,
            addresses: newAddresses
        })
        if (name === 'state') {
            setIsStateSet(true)
            setCitySelectOptions(cityOptions[selectedOption.value])
        }
    }





    const selectStyles1 = {
        control: (styles, state) => {
            state.theme.colors.primary = "#8de7e1"
            return {
                ...styles,
                width: "22rem",
                padding: '3px',
                // marginRight: '9px',
                marginBottom: "10px",
                '@media (max-width: 768px)': {
                    marginTop: "6px",
                    marginRight: '0px',
                    width: "18.4rem",
                    padding: '3.7px',
                },
                marginTop: '5px'
            }
        },
    }


    const handleAddressChange = (e) => {
        const { name, value } = e.target
        const newAddresses = [...customer.addresses]
        newAddresses[index][name] = value


        setCustomer({
            ...customer,
            addresses: newAddresses
        })
    }

    const handlePostInput = (e) => {
        e.target.value = e.target.value.replace(/\D/g, '')
        if (e.target.value.length === 6) {
            console.log("hello")
            getStateCity(e.target.value)
        }
    }

    const handleAddAddress = () => {
        if (customer.addresses.length < 10) {
            setCustomer({
                ...customer,
                addresses: [...customer.addresses, { postCode: '', state: '', city: '' }]
            })
        } else {
            message.error("You can only add up to 10 addresses.")
        }
    }

    const handleDeleteAddress = () => {
        const newAddresses = [...customer.addresses]
        newAddresses.splice(index, 1)
        setCustomer({
            ...customer,
            addresses: newAddresses
        })
    }

    const getStateCity = async (postCode) => {
        try {
            const result = await axios.post('https://lab.pixel6.co/api/get-postcode-details.php', {
                "postcode": parseInt(postCode)
            })
            if (result.data.status === 'Success' && result.data.statusCode === 200) {
                setIsStateSet(true)
                const state = result.data.state[0].name
                setCitySelectOptions(cityOptions[state])
                // setCustomer({
                //     ...customer,
                //     address: {
                //         ...customer.address,
                //         state: result.data.state[0].name,
                //         city: result.data.city[0].name,
                //         postCode: postCode
                //     }
                // })
                const newAddresses = [...customer.addresses]
                newAddresses[index]['postCode'] = postCode
                newAddresses[index]['city'] = result.data.city[0].name
                newAddresses[index]['state'] = result.data.state[0].name
                setCustomer({
                    ...customer,
                    addresses: newAddresses
                })
            }
        } catch (error) {
            console.log(error)
            message.error("Something wen't wrong while fetching state and city. Enter them manually.")
        }
    }




    return (
        <>
            {/* <div className='add-delete-container mb-3'>
                <button className=''><IoAddCircle size={25} color='#3705be' /></button>
                <button className='me-2'><MdDelete size={25} color='#dc3545' /></button>
            </div> */}

            <div className='input-group-parent mt-4'>
                <label className='sub-form-label' htmlFor="">{`Address ${index + 1}`}</label>
                <div className='add-delete-container'>
                    {index === 10 ? '' : <button type='button' className='' onClick={handleAddAddress}>
                        <IoAddCircleOutline size={25} color='green' />
                    </button>}
                    {index === 0 ? "" : <button type='button' className='me-1' onClick={handleDeleteAddress}>
                        <MdDelete size={25} color='#dc3545' />
                    </button>}
                </div>

                <div className='custom-input-group'>
                    <div className="input-label-container w-100">
                        <label htmlFor="">Address Line 1 <span>*</span></label>
                        <input
                            type='text'
                            // placeholder='Address Line 1*'
                            name='line1'
                            value={address.line1}
                            // onChange={handleChange}
                            onChange={handleAddressChange}
                            required
                        />
                    </div>
                </div>
                <div className='custom-input-group'>
                    <div className="input-label-container w-100">
                        <label htmlFor="">Address Line 2</label>
                        <input
                            type='text'
                            // placeholder='Address Line 2'
                            name='line2'
                            value={address.line2}
                            // onChange={handleChange}
                            onChange={handleAddressChange}
                        />
                    </div>
                </div>
                <div className='custom-input-group'>
                    <div className="input-label-container">
                        <label htmlFor="">Post Code <span>*</span></label>
                        <input
                            type='text'
                            // placeholder='Post Code*'
                            name='postCode'
                            value={address.postCode}
                            // onChange={handleChange}
                            onChange={handleAddressChange}
                            required
                            maxLength={6}
                            minLength={6}
                            onInput={handlePostInput}
                        />
                    </div>
                    <div className="input-label-container">
                        <label htmlFor="">State <span>*</span></label>
                        <Select
                            name='state'
                            value={stateOptions.find(option => option.value === address.state)}
                            onChange={handleSelectChange}
                            options={stateOptions}
                            // placeholder='State*'
                            styles={selectStyles1}
                            menuPlacement="top"
                            required
                        />
                    </div>
                    <div className="input-label-container">
                        <label htmlFor="">City <span>*</span></label>
                        <Select
                            name='city'
                            value={citySelectOptions.find(option => option.value === address.city)}
                            onChange={handleSelectChange}
                            options={citySelectOptions}
                            // placeholder='City*'
                            styles={selectStyles1}
                            menuPlacement="top"
                            isDisabled={!isStateSet}
                            required
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddressComponent

