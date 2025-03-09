import React, {useEffect} from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import { Link, useNavigate } from 'react-router-dom'
import Container from '../components/Container'
import CustomInput from '../components/CustomInput'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../features/user/userSlice'


const loginSchema = yup.object().shape({
    email: yup.string().email("Email is not valid").required("Email is required"),
    password: yup.string().required("Password is required").min(6, 'Password must be at least 6 characters').max(20, 'Password must be at most 20 characters'),
});

const Login = () => {
    const authState = useSelector((state) => state.auth);
    console.log(authState);
    const navigate = useNavigate();
    const dispatch =  useDispatch();

    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        validationSchema: loginSchema,
        onSubmit: values => {
          dispatch(loginUser(values));
          // navigate('/');
        }, 
    });

    useEffect(() => {
        if(authState.user !== null && authState.isError === false ) {
            navigate('/');
        }
    }, [authState]);

  return (
    <>
    <Meta title={'Login'}/>
    <BreadCrumb title='Login'/>

    <Container class1='login-wrapper home-wrapper-2 py-5'>
        <div className="row">
            <div className="col-12">
                <div className="auth-card">
                    <h3 className='text-center mb-3'>Login account</h3>
                    <form action="" onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                        <CustomInput 
                            type="email" 
                            name='email' 
                            placeholder='Email' 
                            value = {formik.values.email}
                            onChange = {formik.handleChange('email')}
                            onBlur = {formik.handleBlur('email')}
                        />

                        <div className="error mt-2 px-2 text-danger" style={{fontSize: "12px"}}>
                            {formik.touched.email && formik.errors.email}
                        </div>
                        
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

                        <div>
                            <Link to='/forgot-password' className='px-2'>Forgot Password?</Link>
                            <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                                <button className='button border-0' type='submit'>Login</button>
                                <Link to='/signup' className='button signup '>SignUp</Link>
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

export default Login