import React, {useEffect} from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import { Link, useNavigate } from 'react-router-dom'
import Container from '../components/Container'
import CustomInput from '../components/CustomInput'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../features/user/userSlice'


const signUpSchema = yup.object().shape({
    firstname: yup.string().required("First Name is required"),
    lastname: yup.string().nullable().required("Last Name is required"),
    email: yup.string().nullable().email("Email is not valid").required("Email is required"),
    mobile: yup.string().required("Mobile is required").nullable().matches(/^[0-9]+$/, 'Mobile number must be a number').min(10, 'Mobile number must be 10 characters').max(10, 'Mobile number must be 10 characters'),
    password: yup.string().required("Password is required").min(6, 'Password must be at least 6 characters').max(20, 'Password must be at most 20 characters'),
});

const Signup = () => {
    const authState = useSelector((state) => state.auth);

    const dispatch =  useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
          firstname: '',
          lastname: '',
          email: '',
          mobile: '',
          password: '',
        },
        validationSchema: signUpSchema,
        onSubmit: values => {
          dispatch(registerUser(values));
        },
    });

    useEffect(() => {
        if(authState.updatedUser !== null && authState.isError === false ) {
            navigate('/login');
        }
    }, [authState]);

  return (
    <>
    <Meta title={'Sign Up'}/>
    <BreadCrumb title='Sign Up'/>

    <Container class1="login-wrapper home-wrapper-2 py-5">
        <div className="row">
            <div className="col-12">
                <div className="auth-card">
                    <h3 className='text-center mb-3'>Sign Up Account</h3>
                    <form action="" onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                        <CustomInput 
                            type="text" 
                            name='firstname' 
                            placeholder='First Name' 
                            value = {formik.values.firstname}
                            onChange = {formik.handleChange('firstname')}
                            onBlur = {formik.handleBlur('firstname')}
                        />

                        <div className="error mt-2 px-2 text-danger" style={{fontSize: "12px"}}>
                            {formik.touched.firstname && formik.errors.firstname}
                        </div>

                        <CustomInput 
                            type="text" 
                            name='lastname' 
                            placeholder='Last Name' 
                            value = {formik.values.lastname}
                            onChange = {formik.handleChange('lastname')}
                            onBlur = {formik.handleBlur('lastname')}
                        />

                        <div className="error mt-2 px-2 text-danger" style={{fontSize: "12px"}}>
                            {formik.touched.lastname && formik.errors.lastname}
                        </div>

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
                            type="tel" 
                            name='mobile' 
                            placeholder='Mobile Number' 
                            value = {formik.values.mobile}
                            onChange = {formik.handleChange('mobile')}
                            onBlur = {formik.handleBlur('mobile')}
                        />

                        <div className="error mt-2 px-2 text-danger" style={{fontSize: "12px"}}>
                            {formik.touched.mobile && formik.errors.mobile}
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
                            <Link to='/login' className='px-2'>Have u an account?</Link>
                            <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                                <button className='button border-0'>Sign Up</button>
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

export default Signup