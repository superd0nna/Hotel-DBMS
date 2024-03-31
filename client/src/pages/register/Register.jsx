import React from 'react'
import ResponsiveAppBar from '../../components/nav/navbar'
import EditData from '../../components/editData/EditData'
import './register.css'

const Register = () => {
  return (
    <div>
      <ResponsiveAppBar/>
      <div className="tables">
        <EditData/>
      </div>
    </div>
  )
}

export default Register