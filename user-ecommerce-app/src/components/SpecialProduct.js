import React from 'react'
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';

const SpecialProduct = (props) => {
  const { id, title, brand, price, totalrating, sold, quantity } = props;

  return (
    <div className='col-4 mb-3'>
        <div className="special-product-card">
            <div className="d-flex justify-content-around">
                <div>
                    <img src="images/tablet/mobile-1.jpg" className='img-fluid' alt="" width='100%' />
                </div>
                <div className="special-product-content m-1 mx-4">
                    <h5 className="brand d-flex justify-content-center">{brand}</h5>
                    <h6 className="title">{title}</h6>
                    <ReactStars count={5} size={24} value={totalrating} edit={false} activeColor="#ffd700"/>
                    <p className="price"><span className="red-p">$ {price}</span></p>

                    <div className="prod-count my-3">
                        <p>Products: {quantity}</p>
                        <div class="progress">
                            <div role="progressbar" 
                                class="progress-bar bg-success" 
                                style={{width: quantity / quantity + sold * 100 + "%"}} 
                                aria-valuenow={quantity / quantity + sold * 100} 
                                aria-valuemin={quantity} 
                                aria-valuemax={sold + quantity}>    
                            </div>
                        </div>
                    </div>
                    <Link className='button' to={'/product/' + id}>View details</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SpecialProduct