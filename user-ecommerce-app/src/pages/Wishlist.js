import React, { useEffect } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProductWishlist } from '../features/user/userSlice';
import { addToWishlist } from '../features/products/productSlice';

const Wishlist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getWishlistFromDb();
  }, []);

  const getWishlistFromDb = () => {
    dispatch(getUserProductWishlist());
  };

  const wishlistState = useSelector((state) => state?.auth?.wishlist?.wishlist);
  console.log(wishlistState);

  const removeFromWishlist = (id) => {
    dispatch(addToWishlist(id));
    setTimeout(() => {
        dispatch(getUserProductWishlist());
    }, 300);
  };

  return (
    <>
    <Meta title={'Wishlist'}/>
    <BreadCrumb title='Wishlist'/>

    <Container class1="wishlist-wrapper home-wrapper-2 py-5">
        <div className="row">
            { wishlistState && wishlistState.length === 0 && <div className='text-center text-secondary'>No Data</div> }
            { wishlistState && wishlistState?.map((item, index) => {
                return (
                    <div className="col-3" key={index}>
                        <div className="wishlist-card position-relative">
                            <img onClick={() => {removeFromWishlist(item?._id)}} src="images/icon/cross-2.png" alt="" className="position-absolute cross img-fluid" />
                            <div className="wishlist-card-img">
                                <img src= "images/gaming/gaming-3.jpg"  className='img-fluid' alt="" width='100%' />
                                {/* <img src= {item?.images[0].url ? item?.images[0].url : "images/gaming/gaming-3.jpg"}  className='img-fluid' alt="" width='100%' /> */}
                            </div>

                            <div className='wishlist-prod-details px-3 py-3'>
                                <h5 className="title">{item?.title}</h5>
                                <h6 className="price mb-3 mt-3">$ {item?.price}</h6>
                            </div>
                        </div>
                    </div>
                )
            })} 

            {/* <div className="col-3">
                <div className="wishlist-card position-relative">
                    <img src="images/icon/cross-2.png" alt="" className="position-absolute cross img-fluid" />
                    <div className="wishlist-card-img">
                        <img src="images/gaming/gaming-3.jpg" className='img-fluid' alt="" width='100%' />
                    </div>

                    <div className='wishlist-prod-details px-3 py-3'>
                        <h5 className="title">Lorem ipsum dolor sit amet.</h5>
                        <h6 className="price mb-3 mt-3">$100</h6>
                    </div>
                </div>
            </div>

            <div className="col-3">
                <div className="wishlist-card position-relative">
                    <img src="images/icon/cross-2.png" alt="" className="position-absolute cross img-fluid" />
                    <div className="wishlist-card-img">
                        <img src="images/gaming/gaming-4.jpg" className='img-fluid' alt="" width='100%' />
                    </div>

                    <div className='wishlist-prod-details px-3 py-3'>
                        <h5 className="title">Lorem ipsum dolor sit amet.</h5>
                        <h6 className="price mb-3 mt-3">$100</h6>
                    </div>
                </div>
            </div>

            <div className="col-3">
                <div className="wishlist-card position-relative">
                    <img src="images/icon/cross-2.png" alt="" className="position-absolute cross img-fluid" />
                    <div className="wishlist-card-img">
                        <img src="images/gaming/gaming-5.jpg" className='img-fluid' alt="" width='100%' />
                    </div>

                    <div className='wishlist-prod-details px-3 py-3'>
                        <h5 className="title">Lorem ipsum dolor sit amet.</h5>
                        <h6 className="price mb-3 mt-3">$100</h6>
                    </div>
                </div>
            </div>

            <div className="col-3">
                <div className="wishlist-card position-relative">
                    <img src="images/icon/cross-2.png" alt="" className="position-absolute cross img-fluid" />
                    <div className="wishlist-card-img">
                        <img src="images/gaming/gaming-6.jpg" className='img-fluid' alt="" width='100%' />
                    </div>

                    <div className='wishlist-prod-details px-3 py-3'>
                        <h5 className="title">Lorem ipsum dolor sit amet.</h5>
                        <h6 className="price mb-3 mt-3">$100</h6>
                    </div>
                </div>
            </div> */}
        </div>
    </Container>
    
    </>
  )
}

export default Wishlist