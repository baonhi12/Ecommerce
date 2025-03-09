import React from 'react'
import CustomInput from '../components/CustomInput'

const ResetPassword = () => {
  return (
    <div className='py-5 d-flex justify-content-center align-items-center' style={{"background" : "#D0BFFF", "minHeight" : "100vh"}}>
      <div className="account-page my-5 w-35 bg-white rounded-4 mx-auto p-4">
        <h5 className='px-3 py-2 text-center'>Reset Password</h5>
        <p className='py-2 text-center'>Please enter your new password.</p>
        <form action="">
          <CustomInput className='' type='password' label="New Password" id='password' />
          <CustomInput className='' type='password' label="Confirm Password" id='confirmpassword' />
          <button className='button px-3 py-2 ' type='submit' style={{"background" : "#D0BFFF"}}>Reset Password</button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword