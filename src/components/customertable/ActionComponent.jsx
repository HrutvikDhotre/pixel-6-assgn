import React, { useState } from 'react'
import { Dropdown, message } from 'antd'
import { BsThreeDotsVertical } from "react-icons/bs"
import DeleteForm from './DeleteForm'
import { useNavigate } from 'react-router-dom'

const ActionComponent = ({ item, setCustomerData }) => {
    const navigate = useNavigate()
    const [toBeShown, setToBeShown] = useState(false)
    const items = [
        {
            key: 'Edit',
            label: 'Edit'
        },
        {
            key: 'Delete',
            label: 'Delete'
        }
    ]

    const handleClick = (e) => {
        console.log("click")
        if (e.key === 'Delete') {
            setToBeShown(true)
        }
        else {
            navigate(`/edit-customer/${item.email}`)
        }
    }

    const handleDelete = (item) => {
        console.log('delete')
        const savedCustomers = localStorage.getItem('customers')
        const customersArray = savedCustomers ? JSON.parse(savedCustomers) : []
        const updatedCustomers = customersArray.filter(customer => customer.email !== item.email)
        localStorage.setItem('customers', JSON.stringify(updatedCustomers))
        setCustomerData()
        setToBeShown(false)
        message.success("Customer deleted successfully.")
    }

    const menu = {
        items: items,
        onClick: handleClick
    }

    return (
        <>
            <Dropdown menu={menu} trigger={['click']}>
                <BsThreeDotsVertical />
            </Dropdown>
            {toBeShown && <DeleteForm item={item} setToBeShown={setToBeShown} handleDelete={handleDelete} />}
        </>
    )
}

export default ActionComponent