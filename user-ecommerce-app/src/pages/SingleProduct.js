import React, { useEffect, useState } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import ReactStars from "react-rating-stars-component";
import Color from '../components/Color'
import Image from 'rc-image';
import { BiGitCompare } from "react-icons/bi";
import { BsBagHeart } from "react-icons/bs";
import Container from '../components/Container'
import { useDispatch, useSelector } from 'react-redux'
import { addRating, getAllProducts, getAProduct } from '../features/products/productSlice'
import { toast } from 'react-toastify';
import { addProdToCart, getUserCart } from '../features/user/userSlice';
import { CgUserlane } from "react-icons/cg";


const SingleProduct = () => {
    const [ color, setColor ] = useState(null);
    const [ quantity, setQuantity ] = useState(1);
    const [ alreadyAdded, setAlreadyAdded ] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const getProductId = location.pathname.split('/')[2];
    const dispatch = useDispatch();
    const productState = useSelector((state) => state.product.singleProduct);
    const productsState = useSelector((state) => state?.product?.product);
    
    const cartState = useSelector((state) => state.auth.cartProducts);
    const colorState = useSelector((state) => state?.product?.singleProduct?.color);
    console.log(colorState);
    

    useEffect(() => {
        dispatch(getAProduct(getProductId));
        dispatch(getUserCart());
        dispatch(getAllProducts());
    }, []);

    useEffect(() => {
        for (let i = 0; i < cartState?.length; i++) {
            if(getProductId === cartState[i]?.productId?._id) {
                setAlreadyAdded(true)
            }
        }
    }, []);

    const uploadCart = () => {
        if(color === null) {
            toast.error('Please select a color');
            return false;
        } else {
            dispatch(addProdToCart({
                productId: productState?._id,
                quantity,
                color, 
                price: productState?.price
            }));
            navigate('/cart');
        }
    }
    
    const [orederedProduct, setorderedProduct] = useState(true);

    // set color 
    // const colors1 = ['#8D959C', '#2196F3', '#26A69A', '#7E57C2', '#262626'];

    const copyToClipboard = (text) => {
        console.log('text', text)
        var textField = document.createElement('textarea')
        textField.innerText = text
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
    };

    const [ popularProduct, setPopularProduct ] = useState([]);
    useEffect(() => {
        let data = [];
        for (let i = 0; i < productsState.length; i++) {
        const element = productsState[i];
        if(element.tags === "popular") {
                data.push(element)
        }
        setPopularProduct(data)
        }
    }, [productState]);
    console.log(popularProduct);

    const [ star, setStar ] = useState(null);
    const [ comment, setComment ] = useState(null);
    const addRatingToProduct = () => {
        if(star === null) {
            toast.error('Please pick star rating');
            return false;
        } 
        else if(comment === null) {
            toast.error('Please write review about the product');
            return false;
        }
        else {
            dispatch(addRating({star: star, comment: comment, prodId: getProductId}))
            setTimeout(() => {
                dispatch(getAProduct(getProductId));
            }, 100);
        }
        return false;
    }

    // bổ sung
    const [open, setOpen] = useState(false);
    const reviewCount = 3; // Số lượng review mặc định hiển thị
    // console.log(productState?.ratings?.length);


    return (
        <>
        <Meta title={productState?.title.substr(0,20) + " ..."}/>
        <BreadCrumb title={productState?.title.substr(0,20) + " ..."}/>

        <Container class1="main-product-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-6">
                        <div className="main-product-img">
                            <div>
                                <Image src='/images/laptop/laptop-1.png' />
                            </div>
                        </div>

                        <div className="other-product-img d-flex flex-wrap gap-15 p-3 bg-white">
                            {productState?.images?.map((item, index) => {
                                return (
                                    <div className='other-prod-img-detail'>
                                        <img src={item?.url} alt="" className='img-fluid w-100' />
                                    </div>
                                )
                            })}
                            <div className='other-prod-img-detail'>
                                <img src="/images/laptop/laptop-1-1.png" alt="" className='img-fluid w-100' />
                            </div>
                            <div className='other-prod-img-detail'>
                                <img src="/images/laptop/laptop-1-2.png" alt="" className='img-fluid w-100' />
                            </div>
                            <div className='other-prod-img-details'>
                                <img src="/images/laptop/laptop-1-3.png" alt="" className='img-fluid w-100' />
                            </div>
                            <div className='other-prod-img-details'>
                                <img src="/images/laptop/laptop-1-4.png" alt="" className='img-fluid w-100' />
                            </div>
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="main-products-details">
                            <div className='border-bottom'>
                                <h5 className='title'>{productState?.title}</h5>
                            </div>

                            <div className="border-bottom py-3">
                                <p className="price">$ {productState?.price}</p>
                                <div className="d-flex align-items-center gap-10">
                                    <ReactStars count={5} size={22} value={productState?.totalrating} edit={false} activeColor="#ffd700"/>
                                    <p className='mb-0 text-secondary t-review'>[ 2 Reviews ]</p>
                                </div>
                                <a className='review-link' href="#review">Write a Review</a>
                            </div>

                            <div className="border-bottom py-3">
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h6 className='product-head'>Types :</h6>
                                    <p className='product-data'>Macbook</p>
                                </div>

                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h6 className='product-head'>Brand :</h6>
                                    <p className='product-data'>{productState?.brand}</p>
                                </div>
                                
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h6 className='product-head'>Category :</h6>
                                    <p className='product-data'>{productState?.category}</p>
                                </div>

                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h6 className='product-head'>Tags :</h6>
                                    <p className='product-data'>{productState?.tags}</p>
                                </div>

                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h6 className='product-head'>Availability :</h6>
                                    <p className='product-data'>In Stock</p>
                                </div>

                                <div className='d-flex gap-10 flex-column mt-2 mb-3'>
                                    <h6 className='product-head'>Size :</h6>
                                    <div className='d-flex flex-wrap gap-15'>
                                        <span className='badge border border-1 bg-white text-dark border-secondary'>64 GB</span>
                                        <span className='badge border border-1 bg-white text-dark border-secondary'>128 GB</span>
                                        <span className='badge border border-1 bg-white text-dark border-secondary'>256 GB</span>
                                        <span className='badge border border-1 bg-white text-dark border-secondary'>512 GB</span>
                                    </div>
                                </div>

                                { alreadyAdded === false && 
                                <>
                                    <h6 className="product-head">Color :</h6>
                                    <div className="d-flex gap-3 flex-wrap mt-2 mb-3">
                                        <Color setColor={setColor} colorData={productState?.color} />
                                    </div>
                                </>
                                }

                                <div className='d-flex align-items-center gap-10 flex-row mt-2 mb-3'>
                                    { alreadyAdded === false && 
                                    <>
                                        <h6 className='product-head'>Quantity :</h6>
                                        <div className="">
                                            <input type="number" className='form-control' name="" 
                                                min={0} max={10} style={{"width" : "80px"}}
                                                onChange={(e) => setQuantity(e.target.value)}
                                                value={quantity}
                                            />
                                        </div>
                                    </> }

                                    <div className={ alreadyAdded? "ms-0" : "ms-5" + 'd-flex align-items-center gap-30 ms-5' }>
                                        <button className='button border-0' type='submit' 
                                            onClick={() => {alreadyAdded? navigate('/cart'): uploadCart()}}>
                                            { alreadyAdded? "Go to Cart" : "Add to Cart"}
                                        </button>
                                        {/* <button className='button border-0' type='submit'>Buy Now</button> */}
                                    </div>
                                </div>

                                <div className='d-flex align-items-center gap-30 p-3'>
                                    <div>
                                        <a href="" className='d-flex align-items-center gap-15'> <BiGitCompare className='fs-5 me-2'/> Add to Compare</a>
                                    </div>
                                    <div>
                                        <a href="" className='d-flex align-items-center gap-15'> <BsBagHeart className='fs-5 me-2'/> Add to Wishlist</a>
                                    </div>
                                </div>

                                <div className='d-flex gap-10 flex-column my-3'>
                                    <h6 className='product-head'>Shipping & Returns :</h6>
                                    <p className='product-data'>Free shipping and returns available on all orders! <br /> We ship all US domestic orders within <b>5-10 business days!</b></p>
                                </div>

                                <div className='d-flex gap-10 align-items-center my-3'>
                                    <h6 className='product-head'>Product Link :</h6>
                                    <a className='text-secondary' href="javascript:void(0);" onClick={() => {copyToClipboard(window.location.href);}}>Copy Product Link</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </Container>

        <Container class1="description-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h4>Description</h4>
                        <div className="desc bg-white p-3">
                            <p dangerouslySetInnerHTML={{__html: productState?.description}}></p>
                        </div>
                    </div>
                </div>
        </Container>

        <Container class1="reviews-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h4>Reviews</h4>
                        <div id='review' className="review-inner-wrapper">
                            <div className="review-heading d-flex justify-content-between align-items-center">
                                <div >
                                    <h5 className='mb-2'>Customer Reviews</h5>
                                    <div className='d-flex align-items-center gap-10'>
                                        <ReactStars count={5} size={24} value={4} edit={false} activeColor="#ffd700"/>
                                        <p className='mb-0'>Based on 2 Reviews</p>
                                    </div>
                                </div>

                                {orederedProduct && (
                                    <div>
                                        <a href="" className='text-decoration-underline'>Write a review</a>
                                    </div>
                                )} 
                            </div>

                            <div className="review-form py-4">
                                <h5>Write a review</h5>
                                <div className='d-flex align-items-center'>
                                    <p className='mb-0 p-1'>Your Rating</p>
                                    <ReactStars count={5} size={24} value={0} 
                                        edit={true} activeColor="#ffd700"
                                        onChange={(e) => {
                                            setStar(e)
                                        }}
                                    />
                                </div>

                                <div>
                                    <textarea name="" id="" className='w-100 form-control' 
                                        cols='30' rows='3' 
                                        placeholder='Write your comments here'
                                        onChange={(e) => {
                                            setComment(e.target.value)
                                        }}
                                    ></textarea>
                                </div>

                                <div className='d-flex justify-content-end mt-3 py-2'>
                                    <button onClick={addRatingToProduct} type='button' className='button border-0'>Submit Review</button>
                                </div>
                            </div>

                            <div className="reviews mt-4">
                                { productState && productState?.ratings?.map((item, index) => {
                                    return (
                                        <div key={index} className="review mt-3">
                                            <div className='d-flex gap-10 align-items-center'>
                                                <h6 className='mb-0 fs-4'> <CgUserlane/> </h6>
                                                <ReactStars count={5} size={20} value={item?.star} edit={false} activeColor="#ffd700"/>
                                            </div>
                                            <p className='mt-3'>{item?.comment}</p>
                                        </div>
                                    )
                                })} 

                                
                                {/* see more and see less 
                                {productState && productState.ratings && productState.ratings.slice(0, reviewCount).map((item, index) => {
                                    return (
                                        <div key={index} className="review mt-3">
                                            <div className='d-flex gap-10 align-items-center'>
                                                <h6 className='mb-0 fs-4'> <CgUserlane/> </h6>
                                                <ReactStars count={5} size={20} value={item.star} edit={false} activeColor="#ffd700"/>
                                            </div>
                                            <p className='mt-3'>{item.comment}</p>
                                        </div>
                                    ) 
                                })}

                                <Collapse in={open}>
                                    <div id="collapse-reviews" style={{ display: open ? 'block' : 'none' }}>
                                    {productState && productState?.ratings && productState?.ratings?.slice(reviewCount).map((item, index) => {
                                        return (
                                            <div key={index + reviewCount} className="review mt-3">
                                                <div className='d-flex gap-10 align-items-center'>
                                                    <h6 className='mb-0 fs-4'> <CgUserlane/> </h6>
                                                    <ReactStars count={5} size={20} value={item?.star} edit={false} activeColor="#ffd700"/>
                                                </div>
                                                <p className='mt-3'>{item?.comment}</p>
                                            </div>
                                        )
                                    })}
                                    </div>
                                </Collapse> 

                                {productState && productState?.ratings && productState?.ratings?.length > reviewCount && (
                                    <button type='button'
                                        onClick={() => { setOpen(!open) }}
                                        aria-controls="collapse-reviews"
                                        aria-expanded={open}
                                        className="mt-3 button border-0"
                                    >
                                        {open ? 'See less' : 'See more'}
                                    </button>
                                )}  
                                */}
                            </div>
                        </div>
                    </div>
                </div>
        </Container>

        <Container class1="popular-wrapper py-5 home-wrapper-2">
            <div className="row">
                <div className="col-12">
                <h6 className='single-prod-like'>You May Also Like</h6>
                </div>
            </div>
            <div className="row">
                <ProductCard data={popularProduct} />
            </div>
        </Container>
        </>
    )
}

export default SingleProduct