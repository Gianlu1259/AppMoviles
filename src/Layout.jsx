import React from 'react'

const Layout = ({children}) => {
  return (
    <div>
        <h1>Navbar</h1>
        {children}
        <h1>Footwer</h1>
    </div>
  )
}

export default Layout