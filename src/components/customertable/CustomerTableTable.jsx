import React, { useEffect, useState } from 'react'
import { message, Table } from 'antd'
import { BsThreeDotsVertical } from "react-icons/bs"
import ActionComponent from './ActionComponent'

const columns = [
    {
        title: 'Index',
        dataIndex: 'index',
        width: 20
    },
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title : 'Email',
        dataIndex : 'email'
    },
    {
        title: '',
        dataIndex: 'action',
        width: 100
    }
]

const CustomerTableTable = () => {
    const [customerTableData, setCustomerTableData] = useState([])

    useEffect(() => {
        setCustomerData()
    }, [])

    useEffect(() => {
    }, [customerTableData])

    const setCustomerData = () => {
        const savedCustomers = localStorage.getItem('customers')
        const customersArray = savedCustomers ? JSON.parse(savedCustomers) : []
        // setCustomerTableData(customersArray)
        fetchTableData(customersArray)
    }

    const fetchTableData = (customersArray) => {
        const data = customersArray.map((item, index) => {
            return {
                key: index,
                index: index + 1,
                name: item.fullName,
                email : item.email,
                action: <ActionComponent
                    item={item}
                    setCustomerData={setCustomerData}
                />
            }
        })
        setCustomerTableData(data)
    }

    return (
        <>
            <Table className="custom-ant-table" rowSelection={undefined} columns={columns} dataSource={customerTableData} />
        </>
    )
}

export default CustomerTableTable