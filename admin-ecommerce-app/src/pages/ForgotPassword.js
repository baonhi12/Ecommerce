import React from 'react'
import CustomInput from '../components/CustomInput'

const ForgotPassword = () => {
  return (
    <div className='py-5 d-flex justify-content-center align-items-center' style={{"background" : "#D0BFFF", "minHeight" : "100vh"}}>
      <div className="account-page my-5 w-35 bg-white rounded-4 mx-auto p-4">
        <h5 className='px-3 py-2 text-center'>Forgot Password</h5>
        <p className='py-2 text-center'>Please enter your register email to get reset password.</p>
        <form action="">
          <CustomInput className='' type='email' label="Email Address" id='email' />
          <button className='button px-3 py-2 mt-4' type='submit' style={{"background" : "#D0BFFF"}}>Send</button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword