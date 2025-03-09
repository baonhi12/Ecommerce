import React, { useEffect, useState } from 'react'
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import { Link, useNavigate } from 'react-router-dom'
import { MdArrowBackIos } from 'react-icons/md'
import { GrLinkNext } from "react-icons/gr";
import Container from '../components/Container'
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import axios from "axios";
import { config } from '../utils/axiosConfig';


const shippingSchema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    address: yup.string().required('Address is required'),
    state: yup.string().required('State is required'),
    city: yup.string().required('City is required'),
    country: yup.string().required('Country is required'),
    pincode: yup.number()
        .typeError("That doesn't look like a pincode")
        .positive("Pincode can't start with a minus")
        .integer("Pincode can't include a decimal point")
        .min(11111, 'Pincode must be equal to 6 digits')
        .max(999991, 'Pincode must be equal to 6 digits')
        .required('Pincode is required'),
});

const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userState = useSelector((state) => state?.auth?.user);    
    const cartState = useSelector((state) => state?.auth?.cartProducts);
    console.log(cartState);
    const [ totalAmount, setTotalAmount ] = useState(null);
    const [ shippingInfo, setShippingInfo ] = useState(null);


    useEffect(() => {
        let sum = 0;
        for(let i = 0; i < cartState?.length; i++) {
            sum += (Number(cartState[i]?.productId?.price * cartState[i]?.quantity));
            setTotalAmount(sum);
        }
    }, [cartState]);

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            address: '',
            state: '',
            city: '',
            country: '',
            pincode: '', 
            other: '',   
        },

        validationSchema: shippingSchema,
        onSubmit: (values) => {
            const shippingData = {
                firstName: values.firstName,
                lastName: values.lastName,
                address: values.address,
                state: values.state,
                city: values.city,
                country: values.country,
                pincode: values.pincode,
                other: values.other,
            };
            setShippingInfo(shippingData);
        }    
    });

    useEffect(() => {
        console.log("Updated Shipping Info:", shippingInfo);
    }, [shippingInfo]);
    

    const handleContinueToPayment = async () => {
        console.log('Shipping Info:', shippingInfo);
        try {
            const response = await axios.post("http://localhost:5000/api/user/cart/create-order", {
                shippingInfo,
                orderItems: cartState.map(item => ({
                    product: item?.productId?._id,  
                    color: item?.color?._id,
                    quantity: item?.quantity,
                    price: item?.price
                })),
                totalPrice: totalAmount,
                totalPriceAfterDiscount: totalAmount + 10,  // Ví dụ, nếu có giảm giá
                paymentInfo: {
                    // Cung cấp thông tin thanh toán nếu có
                }
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                    // Include authorization header if needed
                }
            });

            if (response.data.success) {
                navigate('/payment');
            }
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };
            
    return (
    <>
        <Meta title='Checkout' />
        <BreadCrumb title='Checkout' />

        <Container class1="cart-wrapper home-wrapper-2 py-5">
            <div className="row">
                <div className="col-7">
                    <div className="checkout-left-data">
                        {/* <nav style={{ '--bs-breadcrumb-divider': "'>'" }} aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item total"><Link to='/cart' className='text-dark'>Cart</Link></li>
                                <li className="breadcrumb-item total active " aria-current="page">Information</li>
                                <li className="breadcrumb-item total active " aria-current="page">Shipping</li>
                                <li className="breadcrumb-item total active " aria-current="page">Payment</li>
                            </ol>
                        </nav> */}

                        <h5 className="title">Contact Information</h5>
                        {useState && <p className="user-detail total">{userState?.email}</p>}
                        <h5 className='mb-3'>Shipping Address</h5>

                        <form action="" onSubmit={formik.handleSubmit}  className='d-flex flex-wrap gap-15 justify-content-between'>
                            <div className='w-100'>
                                <select name="country" id="" className="form-control form-select"
                                    onChange={formik.handleChange("country")}
                                    onBlur={formik.handleBlur("country")}
                                    value={formik.values.country}
                                >
                                    <option value="" selected disabled>Select Country</option>
                                    <option value="VietNam" >VietNam</option>
                                </select>

                                <div className="error mt-2 px-2 text-danger" style={{fontSize: "12px"}}>
                                    {formik.touched.country && formik.errors.country}
                                </div>
                            </div>

                            <div className='flex-grow-1'>
                                <input type="text" name='firstName'
                                    placeholder='First Name' 
                                    className="form-control" 
                                    onChange={formik.handleChange("firstName")}
                                    onBlur={formik.handleBlur("firstName")}
                                    value={formik.values.firstName}
                                />
                                <div className="error mt-2 px-2 text-danger" style={{fontSize: "12px"}}>
                                    {formik.touched.firstName && formik.errors.firstName}
                                </div>
                            </div>

                            <div className='flex-grow-1'>
                                <input type="text" name='lastName'
                                    placeholder='Last Name' 
                                    className="form-control" 
                                    onChange={formik.handleChange("lastName")}
                                    onBlur={formik.handleBlur("lastName")}
                                    value={formik.values.lastName}
                                />
                                <div className="error mt-2 px-2 text-danger" style={{fontSize: "12px"}}>
                                    {formik.touched.lastName && formik.errors.lastName}
                                </div>
                            </div>

                            <div className='w-100'>
                                <input type="text" name='address'
                                    placeholder='Address' 
                                    className="form-control" 
                                    onChange={formik.handleChange("address")}
                                    onBlur={formik.handleBlur("address")}
                                    value={formik.values.address}
                                />
                                <div className="error mt-2 px-2 text-danger" style={{fontSize: "12px"}}>
                                    {formik.touched.address && formik.errors.address}
                                </div>
                            </div>

                            <div className='w-100'>
                                <input name='other'
                                    type="text" 
                                    placeholder='Apartment, Suite, etc (optional)' 
                                    className="form-control" 
                                    onChange={formik.handleChange("other")}
                                    onBlur={formik.handleBlur("other")}
                                    value={formik.values.other}
                                />
                            </div>

                            <div className='flex-grow-1'>
                                <input type="text" name='city'
                                    placeholder='City' 
                                    className="form-control" 
                                    onChange={formik.handleChange("city")}
                                    onBlur={formik.handleBlur("city")}
                                    value={formik.values.city}
                                />
                                <div className="error mt-2 px-2 text-danger" style={{fontSize: "12px"}}>
                                    {formik.touched.city && formik.errors.city}
                                </div>
                            </div>

                            <div className='flex-grow-1'>
                                <select name='state' id="" className="form-control form-select"
                                    onChange={formik.handleChange("state")}
                                    onBlur={formik.handleBlur("state")}
                                    value={formik.values.state}
                                >
                                    <option value="" selected disabled>Select State</option>
                                    <option value="Ha Noi" >Ha Noi</option>
                                    <option value="TP HCM" >TP HCM</option>
                                    <option value="Da Nang" >Da Nang</option>
                                </select>
                                <div className="error mt-2 px-2 text-danger" style={{fontSize: "12px"}}>
                                    {formik.touched.state && formik.errors.state}
                                </div>
                            </div>

                            <div className='flex-grow-1'>
                                <input type="text" name='pincode'
                                    placeholder='Zipcode' 
                                    className="form-control" 
                                    onChange={formik.handleChange("pincode")}
                                    onBlur={formik.handleBlur("pincode")}
                                    value={formik.values.pincode}
                                />
                                <div className="error mt-2 px-2 text-danger" style={{fontSize: "12px"}}>
                                    {formik.touched.pincode && formik.errors.pincode}
                                </div>
                            </div>

                            <div className="w-100">
                                <div className="d-flex justify-content-between align-items-center">
                                    <Link to='/cart' className='return-cart'><MdArrowBackIos className='fs-6' /> Return to Cart</Link>
                                    <button className="button" type='submit' >Place Order</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="col-5">
                    <div className='border-bottom py-4 '>
                        { cartState && cartState?.map((item, index) => {
                            return (
                                <div key={index} className="d-flex gap-10 mb-3 align-items-center ">
                                    <div className='w-75 d-flex gap-10 '>
                                        <div className='w-50 position-relative'>
                                            <span style={{"top" : "-10px", "right" : "-10px"}} className='badge bg-secondary text-white rounded-circle p-2 position-absolute'>{item?.quantity}</span>
                                            <img src="/images/headphone/hp-14.jpg" className='img-fluid checkout-prod-image' alt="" />
                                        </div>
                                            
                                        <div className='d-flex flex-column justify-content-center'>
                                            <h5 className="total mb-0" style={{"fontSize" : "14px"}}>{item?.productId?.title}</h5>
                                            <p className='total mb-0' style={{"fontSize" : "13px"}}>{item?.color?.title}</p>
                                        </div>
                                    </div>

                                    <div className='flex-grow-1'>
                                        <h6 className='total-price'>$ {item?.price * item?.quantity}</h6>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <div className='border-bottom py-4'>
                        <div className='d-flex px-4 justify-content-between align-items-center'>
                            <p className='mb-0 total'>Subtotal</p>
                            <p className='mb-0 total-price'>$ { totalAmount? totalAmount : "0" }</p>
                        </div>
                            
                        <div className='d-flex px-4 justify-content-between align-items-center'>
                            <p className='mb-0 total'>Shipping</p>
                            <p className='mb-0 total-price'>$ 10.00</p>
                        </div>
                    </div>

                    <div className='d-flex px-4 justify-content-between align-items-center border-bottom py-4'>
                        <h5 className='total'>Total</h5>
                        <h6 className='total-price'>$ { totalAmount? totalAmount + 10 : "0" }</h6>
                    </div>

                    <button className='button border-0 bg-danger text-light mt-4' onClick={handleContinueToPayment}>
                        Continue to Payment  <GrLinkNext className='me-1' />
                    </button>
                    {/* <Link to='/payment' className='button bg-danger text-light mt-4'>Continue to Payment  <GrLinkNext className='me-1'/></Link> */}
                </div>
            </div>
        </Container>
    </>
    )
}

export default Checkout 
