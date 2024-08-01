import React from 'react'
import '../../styles/deleteform.css'


const DeleteForm = ({ item,setToBeShown,handleDelete }) => {

    // const handleDeletion =  () => {
    //     const savedCustomers = localStorage.getItem('customers')
    //     const customersArray = savedCustomers ? JSON.parse(savedCustomers) : []
    //     const updatedCustomers = customersArray.filter(customer => customer.email !== item.email)
    //     localStorage.setItem('customers', JSON.stringify(updatedCustomers))
    //     // setToBeShown(false)
    // }

    return (
        <div className={`delete-bg`}>
            <div className={`delete-form`}>
                <div className='my-2 fs-5 '>Are you sure you want to delete this customer ?</div>
                <div className='my-4 me-4' >
                    <button
                        className={`custom-button delete-form-button delete-button py-2 px-3 `}
                        onClick={()=>handleDelete(item)}
                    >
                        Delete
                    </button>
                    <button
                        className={`custom-button  py-2 px-3 me-3`}
                        style={{ float: 'right' }}
                        onClick={() => {
                            setToBeShown(false)
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteForm
