import React from 'react'
import ResponsiveAppBar from '../../components/nav/navbar'
import EditData from '../../components/editData/EditData'
import Footer2 from '../../components/footer2/Footer2'
import './register.css'

const Register = () => {
  return (
    <div>
      <ResponsiveAppBar/>
      <div className="tables">
        <EditData/>
      </div>
      <Footer2/>
    </div>
  )
}

export default Register