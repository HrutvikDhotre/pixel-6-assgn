import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddCustomer from './pages/AddCustomer'
import CustomerTable from './pages/CustomerTable'
import EditCustomer from './pages/EditCustomer'
import ProtectedRoutes from './components/ProtectedRoutes'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={(<AddCustomer />)} />
        <Route element={(<ProtectedRoutes />)}>
          <Route path='/customer-table' element={(<CustomerTable />)} />
          <Route path='/edit-customer/:email' element={(<EditCustomer />)} />
        </Route>
      </Routes>
    </>
  )
}

export default App