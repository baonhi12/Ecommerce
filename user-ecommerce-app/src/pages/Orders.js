import React, { useEffect } from 'react'
import Container from '../components/Container'
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../features/user/userSlice';


const Orders = () => {
    const dispatch = useDispatch();
    const orderState = useSelector((state) => state?.auth?.getorderedProduct?.orders);

    console.log(orderState);
    
    useEffect(() => {
        dispatch(getOrders());
    }, []);

  return (
    <>
    <Meta title={'My Orders'}/>
    <BreadCrumb title='My Orders'/>

    <Container class1="cart-wrapper home-wrapper-2 py-5" >
        <div className="row">
            <div className="col-12">
                <div className="row">
                    <div className="col-3">
                        <h6>Order ID</h6>
                    </div>

                    <div className="col-3">
                        <h6>Total Amount</h6>
                    </div>

                    <div className="col-3">
                        <h6>Total Amount After Discount</h6>
                    </div>

                    <div className="col-3">
                        <h6>Status</h6>
                    </div>
                </div>
            </div>

            <div className="col-12 mt-3">
                { orderState && orderState.map((item, index) => {
                    return (
                        <div className="row bg-info my-3 pt-3" key={index}>
                            <div className="col-3">
                                <p className='text-white'>{item?._id}</p>
                            </div>

                            <div className="col-3">
                                <p className='text-white'>{item?.totalPrice}</p>
                            </div>

                            <div className="col-3">
                                <p className='text-white'>{item?.totalPriceAfterDiscount}</p>
                            </div>

                            <div className="col-3">
                                <p className='text-white'>{item?.orderStatus}</p>
                            </div>

                            <div className="col-12">
                                <div className="row bg-light p-3 ">
                                    <div className="col-3">
                                        <h6>Product Name</h6>
                                    </div>

                                    <div className="col-3">
                                        <h6>Quantity</h6>
                                    </div>

                                    <div className="col-3">
                                        <h6>Price</h6>
                                    </div>

                                    <div className="col-3">
                                        <h6>Color</h6>
                                    </div>
                                </div>
                            </div>

                            { item?.orderItems?.map((i, index) => {
                                return (
                                    <div className="col-12">
                                        <div className="row p-3 bg-light">
                                            <div className="col-3">
                                                <p>{i?.product?.title}</p>
                                            </div>

                                            <div className="col-3">
                                                <p>{i?.quantity}</p>
                                            </div>

                                            <div className="col-3">
                                                <p>{i?.price}</p>
                                            </div>

                                            <div className="col-3">
                                                <ul className='colors ps-0 align-items-center mb-0'>
                                                    <li style={{
                                                            backgroundColor: i?.color?.title,
                                                            listStyle: 'none',
                                                            width: "1.1rem", height: "1.1rem",
                                                            borderRadius: '50%',
                                                        }} 
                                                        key={index} 
                                                    ></li>
                                                </ul> 
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            
                        </div>
                    )
                }) }
                
            </div>
        </div>
    </Container>
    </>
    )
}

export default Orders