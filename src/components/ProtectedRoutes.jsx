import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
    const customerSet = localStorage.getItem('isCustomerSet') === 'true'
    return customerSet ? <Outlet /> : <Navigate to='/' />

}

export default ProtectedRoutes