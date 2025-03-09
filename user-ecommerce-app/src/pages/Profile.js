import React, { useState } from 'react'
import Container from '../components/Container'
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { updateProfile } from '../features/user/userSlice';
import { FaUserEdit } from "react-icons/fa";


const profileSchema = yup.object().shape({
    firstname: yup.string().required("First Name is required"),
    lastname: yup.string().required("Last Name is required"),
    email: yup.string().email("Email is not valid").required("Email is required"),
    mobile: yup.string().required("Mobile is required")
        .matches(/^[0-9]+$/, 'Mobile number must be a number')
        .min(9, 'Mobile number must be 10 characters')
        .max(9, 'Mobile number must be 10 characters'),
});



const Profile = () => {
    const getTokenFromLocalStorage = localStorage.getItem("customer") 
    ? JSON.parse(localStorage.getItem("customer")) 
    : null;

    const config2 = {
        headers: {
            Authorization: `Bearer ${
                getTokenFromLocalStorage !== null 
                ? getTokenFromLocalStorage.token : "" 
            }`,
            Accept: 'application/json',
        }
    }

    const dispatch = useDispatch();
    const userState = useSelector((state) => state.auth.user);
    console.log(userState);
    const [ edit, setEdit ] = useState(true);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstname: userState?.firstname || '',
            lastname: userState?.lastname || '',
            email: userState?.email || '',
            mobile: userState?.mobile || '',
        },
        validationSchema: profileSchema,
        onSubmit: values => {
            dispatch(updateProfile({data: values, config2: config2}));
            setEdit(true);
        }, 
    });

  return (
    <>
    <Meta title={'My Profile'}/>
    <BreadCrumb title='My Profile'/>

    <Container class1="cart-wrapper home-wrapper-2 py-5" >
        <div className="row">
            <div className="col-12">
                <div className="d-flex justify-content-between align-items-center">
                    <h4 className='my-3'>Update Profile</h4>
                    <FaUserEdit className='fs-4' onClick={() => setEdit(false)} />
                </div>
            </div>

            <div className="col-12">
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="example1" className="form-label">First Name</label>
                        <input type="text" name='firstname' 
                            className="form-control" id="example1" 
                            value={formik.values.firstname}
                            onChange={formik.handleChange('firstname')}
                            onBlur={formik.handleBlur('firstname')}
                            disabled={edit}
                        />
                        <div className="error mt-2 px-2 text-danger" style={{fontSize: "12px"}}>
                            {formik.touched.firstname && formik.errors.firstname}
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="example2" className="form-label">Last Name</label>
                        <input type="text" name='lastname' 
                            className="form-control" id="example2" 
                            value={formik.values.lastname}
                            onChange={formik.handleChange('lastname')}
                            onBlur={formik.handleBlur('lastname')}
                            disabled={edit}
                        />
                        <div className="error mt-2 px-2 text-danger" style={{fontSize: "12px"}}>
                            {formik.touched.lastname && formik.errors.lastname}
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail2" className="form-label">Email address</label>
                        <input type="email" name='email' 
                            className="form-control" 
                            id="exampleInputEmail2" 
                            aria-describedby="emailHelp" 
                            value={formik.values.email}
                            onChange={formik.handleChange('email')}
                            onBlur={formik.handleBlur('email')}
                            disabled={edit}
                        />
                        <div className="error mt-2 px-2 text-danger" style={{fontSize: "12px"}}>
                            {formik.touched.email && formik.errors.email}
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Mobile Number</label>
                        <input type="number" name='mobile' 
                            className="form-control" 
                            id="exampleInputEmail1" 
                            aria-describedby="emailHelp" 
                            value={formik.values.mobile}
                            onChange={formik.handleChange('mobile')}
                            onBlur={formik.handleBlur('mobile')}
                            disabled={edit}
                        />
                        <div className="error mt-2 px-2 text-danger" style={{fontSize: "12px"}}>
                            {formik.touched.mobile && formik.errors.mobile}
                        </div>
                    </div>
                    
                    { edit === false && <button type="submit" className="button" style={{border:"none"}}>Save</button> }
                </form>
            </div>
        </div>
    </Container>
    </>
  )
}

export default Profile