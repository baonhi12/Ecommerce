import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';

let schema = Yup.object().shape({
  email: Yup.string().email('Email should be valid').required('Email is required'),
  password: Yup.string().required('Password is required').max(20, 'Password should be less than 20 characters').min(5, 'Password should be more than 5 characters'),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  const authState = useSelector((state) => state);

  const { user, isError, isSuccess, isLoading, message } = authState.auth; 
  

  useEffect(() => {
    if (isSuccess) {
      navigate("admin");
    }
    else {
      navigate("");
    }
  }, [user, isLoading, isError, isSuccess]); 

  return (
    <div className='py-5 d-flex justify-content-center align-items-center' style={{"background" : "#D0BFFF", "minHeight" : "100vh"}}>
      <div className="account-page my-5 w-35 bg-white rounded-4 mx-auto p-4">
        <h5 className='px-3 py-2 text-center'>Login account</h5>
        <p className=' px-2 text-center'>Login to your account to continue.</p>
        
        <form action="" onSubmit={formik.handleSubmit} >
          <CustomInput 
            name='email'  
            type='text' 
            label="Email Address" 
            id='email' 
            val={formik.values.email} 
            onCh={formik.handleChange('email')}
            onBl={formik.handleBlur('email')}
          />
          
          <div className="error mt-2 px-2">
            {formik.touched.email && formik.errors.email}
          </div>

          <CustomInput 
            name='password'  
            type='password' 
            label="Password" 
            id='password' 
            val={formik.values.password}
            onCh={formik.handleChange('password')}
            onBl={formik.handleBlur('password')}
          />
          
          <div className="error mt-2 px-2">
            {formik.touched.password && formik.errors.password}
          </div>

          <div className="error mt-2 text-center">
            {message.message == 'Rejected' ? "Your are not admin" : ""}
          </div>

          {/* <div className='mb-3 text-end'>
            <Link to='forgot-password' className='text-secondary text-decoration-none'>Forgot Password?</Link>
          </div> */}

          <button  className='button px-3 py-2 text-center mt-3' type='submit' style={{"background" : "#D0BFFF"}}>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login