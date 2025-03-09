import React from 'react';
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist } from '../features/products/productSlice';
import { MdUnfoldMore } from "react-icons/md";

const ProductCard = (props) => {
  const { grid, data } = props;

  const dispatch = useDispatch();
  // console.log(data);

  let location = useLocation();
  const addToWish = (id) => {
    dispatch(addToWishlist(id))
  }

  
  return (
    <>
    {
        data?.map((item, index) => {
            return (
                <div key={index} className= {`${location.pathname == "/store" ? `gr-${grid}` :" col-3 "}`}  >
                    <div className="product-card position-relative"
                        // to={`${location.pathname == "/" ? "/product/:id" : location.pathname == "/product/:id" ? "/product/:id" : "/product/:id" }`} 
                    >
                        <div className="wishlist-icon position-absolute">
                            <button className='border-0 bg-transparent' 
                                    onClick={() => {addToWish(item?._id)}}
                            >
                                <img src="/images/icon/smile.png" alt="" width="19px" />
                            </button>
                        </div>
                            
                        <div className="product-image">
                            <img src="/images/headphone/hp-12.jpg" alt="" className='img-fluid' />
                            <img src="/images/headphone/hp-1.jpg" alt="" className='img-fluid' /> 

                            {/* <img src={item?.images.url} alt="" className='img-fluid' />
                            <img src="/images/headphone/hp-1.jpg" alt="" className='img-fluid' /> */}
                        </div>

                        <div className="product-details">
                            <h6 className="brand">{item?.brand}</h6>
                            <h5 className="product-title">{item?.title}</h5>
                            <ReactStars count={5} size={24} value={item?.totalrating.toString()} edit={false} activeColor="#ffd700"/>
                            <p className={`description ${grid === 12 ? "d-block" : "d-none"}`} dangerouslySetInnerHTML={{__html: item?.description.substr(0, 20) + "..."}} ></p>
                            <p className="price">$ {item?.price}</p>
                        </div>

                        <div className="action-bar position-absolute">
                            <div className="d-flex flex-column gap-15">
                                <Link to={'/product/' + item?._id} className='border-0 bg-transparent'>
                                    {/* <img src="/images/icon/eye.png" alt="" width="20px" /> */}
                                    < MdUnfoldMore className='fs-4 text-dark' />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    } 
    </>
  )
}

export default ProductCard