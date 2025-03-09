import React, { useEffect, useState } from 'react'
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import { MdDeleteSweep } from "react-icons/md";
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartProduct, getUserCart, updateCartProduct } from '../features/user/userSlice';


const Cart = () => {
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
  const [ productUpdateDetail, setProductUpdateDetail ] = useState(null);
  const [ totalAmount, setTotalAmount ] = useState(null);

  const userCartState = useSelector((state) => state.auth.cartProducts);

  useEffect(() => {
    dispatch(getUserCart(config2))
  }, []); 

  useEffect(() => {
    if(productUpdateDetail !== null) {
        dispatch(updateCartProduct({
            cartItemId: productUpdateDetail?.cartItemId, 
            quantity: productUpdateDetail?.quantity
        }));
        setTimeout(() => {
            dispatch(getUserCart(config2));
        }, 200);
    }
  }, [productUpdateDetail]);

  const deleteACartProduct = (id) => {
    dispatch(deleteCartProduct({id: id, config2: config2}));
    setTimeout(() => {
        dispatch(getUserCart(config2));
    }, 200);
  };

  useEffect(() => {
    let sum = 0;
    for(let i = 0; i < userCartState?.length; i++) {
        sum += (Number(userCartState[i]?.productId?.price * userCartState[i]?.quantity));
        setTotalAmount(sum);
    }
  }, [userCartState]);

  return (
    <>
    <Meta title={'Shopping Cart'}/>
    <BreadCrumb title='Shopping Cart'/>

    <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
            <div className="col-12">
                <div className="cart-header py-3 d-flex justify-content-between align-items-center">
                    <h6 className='d-flex justify-content-center cart-col-1'>Product</h6>
                    <h6 className='d-flex justify-content-center cart-col-2'>Price</h6>
                    <h6 className='d-flex justify-content-center cart-col-3'>Quantity</h6>
                    <h6 className='d-flex justify-content-center cart-col-4'>Total</h6>
                </div>

                { userCartState && userCartState?.map((item, index) => {
                    return (
                        <div key={index} className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
                            <div className='cart-col-1 d-flex align-items-center'>
                                <div className='w-50'>
                                    <img src="/images/headphone/hp-14.jpg" alt="" className='img-fluid' width='80%' />
                                </div>

                                <div className='w-50'>
                                    <h5 className="title">{item?.productId?.title}</h5>
                                    <p className="d-flex gap-3 align-items-center color">Color: 
                                        <ul className='colors ps-0 align-items-center mb-0'>
                                            <li style={{
                                                    backgroundColor: item?.color?.title,
                                                    listStyle: 'none',
                                                    width: ".8rem", height: ".8rem",
                                                    borderRadius: '50%',
                                                }} 
                                                key={index} 
                                            ></li>
                                        </ul>
                                    </p>
                                    {/* <p className="size">Type: S11</p> */}
                                </div>
                            </div>

                            <div className='cart-col-2 d-flex justify-content-center'>
                                <h6 className="price m-0">$ {item?.productId?.price}</h6>
                            </div>

                            <div className='cart-col-3 d-flex align-items-center gap-15 justify-content-center'>
                                <div>
                                    <input type="number" name={"quantity" + item?._id} id={"cart" + item?._id} 
                                        className='form-control' min={1} max={10} 
                                        style={{"width" : "75px"}} 
                                        value={item?.quantity} 
                                        onChange={(e) => {setProductUpdateDetail({cartItemId:item?._id, quantity:e.target.value})}}
                                    /> 
                                </div>
                                <div><MdDeleteSweep onClick={() => {deleteACartProduct(item?._id)}} style={{"fontSize" : "25px"}} className='text-secondary'/></div>
                            </div>

                            <div className='cart-col-4 d-flex justify-content-center'>
                                <h6 className="price m-0">$ {item?.productId?.price * item?.quantity}</h6>
                            </div>
                        </div>
                    )
                }) }
            </div>

            <div className="col-12 py-2 mt-4">
                <div className='d-flex justify-content-between align-items-baseline'>
                    <Link to='/store' className='button'>Continue Shopping</Link>

                    { (totalAmount !== null || totalAmount !== 0) &&
                        <div className='d-flex align-items-end flex-column'>
                            <h6>SubTotal: $ {totalAmount}</h6>
                            <p>Taxes and shipping calculated at checkout</p>
                            <Link to='/checkout' className='button'>Checkout</Link>
                        </div>
                    }
                </div>
            </div>
        </div>
    </Container>
    </>
  )
}

export default Cart