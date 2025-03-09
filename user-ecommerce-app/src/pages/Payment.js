import React, { useEffect, useState } from 'react'
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import Container from '../components/Container';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { config } from '../utils/axiosConfig';
import { GrLinkNext } from "react-icons/gr";
import { PayPalButton } from "react-paypal-button-v2";
import { Modal , Button } from 'react-bootstrap';

const Payment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartState = useSelector((state) => state?.auth?.cartProducts);
    console.log(cartState);
    
    const [paymentMethod, setPaymentMethod] = useState('');
    const [shippingMethod, setShippingMethod] = useState('');
    const [paymentType, setPaymentType] = useState('');
    const [ totalAmount, setTotalAmount ] = useState(null);
    const [ sdkReady, setSdkReady ] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        let sum = 0;
        for(let i = 0; i < cartState?.length; i++) {
            sum += (Number(cartState[i]?.productId?.price * cartState[i]?.quantity));
            setTotalAmount(sum);
        }
    }, [cartState]);

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };
    
    const handleShippingMethodChange = (event) => {
        setShippingMethod(event.target.value);
    };
    
    const handlePaymentTypeChange = (event) => {
        setPaymentType(event.target.value);
    };     

    const onSuccessPaypal = async (details, data) => {
        console.log('Details and Data: ', details, data);
        // alert('Payment successful!');
        setShowModal(true); 
        // navigate('/my-orders');
    };
    

    const addPaypalScript = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/payment/config');
            console.log('API response:', response.data);  // Log để kiểm tra dữ liệu trả về
            const clientId = response.data.data; // Giả sử API trả về { clientId: 'your-client-id' }
            console.log('Client ID:', clientId); // Log để kiểm tra clientId
            
            if (clientId) {
                const script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = `https://sandbox.paypal.com/sdk/js?client-id=${clientId}`;
                script.async = true;
                script.onload = () => {
                    setSdkReady(true); 
                };
                document.body.appendChild(script);
            } else {
                console.error('Client ID is missing');
            }
        } catch (error) {
            console.error('Error loading PayPal script:', error);
        }
    };    

    useEffect(() => {
        if (!window.paypal) {
            addPaypalScript(); // Thêm script nếu chưa có PayPal
        } else {
            setSdkReady(true); // Nếu đã có PayPal SDK, set sdkReady true
        }
    }, []);
    
    const shippingCost = shippingMethod === "Express" ? 20 : 10;
    const totalAmountWithShipping = totalAmount + shippingCost;
    const handleContinueShopping = () => {
        setShowModal(false);
        navigate('/store'); // Điều hướng đến trang shop để tiếp tục mua sắm
    };

    const handleGoToOrders = () => {
        setShowModal(false);
        navigate('/my-orders'); // Điều hướng đến trang my-orders
    };

    return (
        <>
        <Meta title={'Payment'}/>
        <BreadCrumb title='Payment'/>

        <Container class1="cart-wrapper home-wrapper-2 py-5">
            <div className="row">
                <div className="col-7">
                    <h5>Select Payment Method</h5>
                    <div className="d-flex flex-column  mb-2">
                        <div style={{backgroundColor: "#D1E9F6", borderRadius: '15px'}} className='mt-2 mb-3 p-3'>
                            <h6 className="me-3 text-secondary mb-2">Payment Type:</h6>
                            <div className="form-check mb-2">
                                <input 
                                type="radio" 
                                name="paymentType" 
                                value="Cash" 
                                onChange={handlePaymentTypeChange} 
                                className="form-check-input"
                                />
                                <label className="form-check-label">Cash</label>
                            </div>
                            <div className="form-check mb-2">
                                <input 
                                type="radio" 
                                name="paymentType" 
                                value="Paypal" 
                                onChange={handlePaymentTypeChange} 
                                className="form-check-input"
                                />
                                <label className="form-check-label">Paypal</label>
                            </div>
                        </div>
                    </div>
                    
                    <div className="d-flex flex-column  mt-1">
                        <div style={{backgroundColor: "#D1E9F6", borderRadius: '15px'}} className='mt-2 mb-3 p-3'>
                            <h6 className="me-3 text-secondary mb-2">Choose Shipping:</h6>
                            <div className="form-check mb-2">
                                <input 
                                type="radio" 
                                name="shippingMethod" 
                                value="Standard" 
                                onChange={handleShippingMethodChange} 
                                className="form-check-input"
                                />
                                <label className="form-check-label">Standard - $10.00</label>
                            </div>
                            <div className="form-check mb-2">
                                <input 
                                type="radio" 
                                name="shippingMethod" 
                                value="Express" 
                                onChange={handleShippingMethodChange} 
                                className="form-check-input"
                                />
                                <label className="form-check-label">Express - $20.00</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-5">
                    <div className="border-bottom">
                        <h5>Shipping and Payment Details</h5>
                        <Link to='/checkout' className='total mb-3'>Change shipping address</Link>
                    </div>

                    <div className='border-bottom py-4'>
                        <div className='d-flex px-4 justify-content-between align-items-center'>
                            <p className='mb-0 total'>Subtotal</p>
                            <p className='mb-0 total-price'>$ { totalAmount? totalAmount : "0" }</p>
                        </div>
                                
                        <div className='d-flex px-4 justify-content-between align-items-center'>
                            <p className='mb-0 total'>Shipping</p>
                            <p className='mb-0 total-price'>$ {shippingMethod === "Express" ? "20.00" : "10.00"}</p>
                        </div>
                    </div>

                    <div className='d-flex px-4 justify-content-between align-items-center border-bottom py-4'>
                        <h5 className='total'>Total</h5>
                        <h6 className='total-price'>$ { totalAmount? totalAmount + (shippingMethod === "Express" ? 20 : 10) : "0" }</h6>
                    </div>                    

                    {paymentType === "Paypal" && sdkReady ? (
                        <PayPalButton
                            // amount={totalAmount / 30000}
                            amount={Number((totalAmount / 30000).toFixed(2))}
                            onSuccess={onSuccessPaypal}
                            onError={() => {
                                alert('Error in payment');
                            }}
                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    purchase_units: [{
                                        amount: {
                                            currency_code: "USD",
                                            value: totalAmountWithShipping.toFixed(2),
                                        },
                                        shipping: {
                                            name: {
                                                full_name: "John Doe"
                                            },
                                            address: {
                                                address_line_1: "1 Main St",
                                                admin_area_2: "San Jose",
                                                admin_area_1: "CA",
                                                postal_code: "95131",
                                                country_code: "US",
                                            }
                                        }
                                    }],
                                });
                            }}
                            onApprove={(data, actions) => {
                                return actions.order.capture().then((details) => {
                                    // Xử lý khi thanh toán thành công
                                    alert("Transaction completed by " + details.payer.name.given_name);
                                    // Bạn có thể cập nhật dữ liệu đơn hàng trên backend tại đây
                                    navigate('/my-orders'); // Chuyển hướng đến trang my-orders
                                });
                            }}
                        />
                    ) : (
                        <Link to='/payment' className='button bg-danger text-align-center text-light mt-4'>
                            Continue <GrLinkNext className='me-1'/>
                        </Link>
                    )}

                </div>
            </div>
        </Container>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Payment Successful</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Your payment was processed successfully. What would you like to do next?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleContinueShopping}>
                    Continue Shopping
                </Button>
                <Button variant="secondary" onClick={handleGoToOrders}>
                    Go to My Orders
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default Payment