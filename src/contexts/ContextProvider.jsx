import React, { useState, createContext, useContext} from 'react'

const StateContext = createContext();

const ContextProvider = ({ children }) => {
    const [customerEmail, setCustomerEmail] = useState('')
    return (
        <StateContext.Provider
            value={
                {
                    customerEmail,
                    setCustomerEmail
                }
            }
        >
            {children}
        </StateContext.Provider>
    )
}

export default ContextProvider

export const useStateContext = () => useContext(StateContext)