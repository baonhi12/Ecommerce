import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Container from '../components/Container'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { resetPassword } from '../features/user/userSlice'


const passwordSchema = yup.object().shape({
  password: yup.string().required("Password is required").min(6, 'Password must be at least 6 characters').max(20, 'Password must be at most 20 characters'),
});

const ResetPassword = () => {
  const location = useLocation();
  const getToken = location.pathname.split('/')[2];
  console.log(getToken);

  const navigate =useNavigate();
  const dispatch =  useDispatch();

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: passwordSchema,
    onSubmit: values => {
      dispatch(resetPassword({password: values.password, token: getToken}));
      navigate('/login');
    }, 
  });

  return (
    <>
    <Meta title={'Reset Password'}/>
    <BreadCrumb title='Reset Password'/>

    <Container class1="login-wrapper home-wrapper-2 py-5">
      <div className="row">
          <div className="col-12">
              <div className="auth-card">
                  <h3 className='text-center mb-3'>Reset Your Password</h3>
                  <form action="" onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                      <CustomInput 
                            type="password" 
                            name='password' 
                            placeholder='Password' 
                            value = {formik.values.password}
                            onChange = {formik.handleChange('password')}
                            onBlur = {formik.handleBlur('password')}
                        />

                        <div className="error mt-2 px-2 text-danger" style={{fontSize: "12px"}}>
                            {formik.touched.password && formik.errors.password}
                        </div>

                      {/* <CustomInput type="password" name='confpassword' placeholder='Confirm Password' /> */}

                      <div>
                        <div className="mt-3 d-flex justify-content-center gap-15 flex-column align-items-center">
                            <button className='button border-0' type='submit'>Reset</button>
                            <Link to='/login' className='px-2'>Cancel</Link>
                        </div>
                      </div>
                  </form>
              </div>
          </div>
      </div>
    </Container>
    </>
  )
}

export default ResetPassword