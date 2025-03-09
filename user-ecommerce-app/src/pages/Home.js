import React , { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Marquee from "react-fast-marquee";
import BlogCard from '../components/BlogCard';
import ProductCard from '../components/ProductCard';
import SpecialProduct from '../components/SpecialProduct';
import Container from '../components/Container';
import { services } from '../utils/Data';
import { useDispatch, useSelector } from 'react-redux';
import moment from "moment";
import { MdUnfoldMore } from "react-icons/md";
import { getAllBlogs } from '../features/blogs/blogSlice';
import { getAllProducts } from '../features/products/productSlice';
import ReactStars from "react-rating-stars-component";
import { addToWishlist } from '../features/products/productSlice';

const Home = () => {
  const blogState = useSelector((state) => state?.blog?.blog);
  const productState = useSelector((state) => state.product.product);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    getBlogs();
    getProducts();
  }, []);
  
  const getBlogs = () => {
    dispatch(getAllBlogs());
  };

  const getProducts = () => {
    dispatch(getAllProducts());
  };

  const addToWish = (id) => {
    dispatch(addToWishlist(id))
  }

  return (
    <>
      <Container class1='home-wrapper-1 py-5'>
        <div className="row">
          <div className="col-6">
            <div className="main-banner position-relative p-1">
              <img src="images/banner/main-banner.jpg" className='img-fluid rounded-3' alt="main banner" />
              <div className="main-banner-content position-absolute">
                <h5>SUPERCHARGED FOR PROS</h5>
                <h6>Special Sale</h6>
                <p>From $999.00 or $41.62/mo. <br />for 24 mo. Footnote*</p>
                <Link className='button'>BUY NOW</Link>
              </div>
            </div>
          </div>

          <div className="col-6">
            <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
              <div className="small-banner position-relative p-1">
                <img src="images/banner/catbanner-01.jpg" className='img-fluid rounded-3' alt="main banner" />
                <div className="small-banner-content position-absolute">
                  <h5>Best Sale</h5>
                  <h6>Macbook</h6>
                  <p>From $1699.00 or <br /> $64.62/mo.</p>
                </div>
              </div>

              <div className="small-banner position-relative p-1">
                <img src="images/banner/catbanner-02.jpg" className='img-fluid rounded-3' alt="main banner" />
                <div className="small-banner-content position-absolute">
                  <h5>15% off</h5>
                  <h6>Smart Watch</h6>
                  <p>Shop the lastest band <br /> styles and colors</p>
                </div>
              </div>

              <div className="small-banner position-relative p-1">
                <img src="images/banner/catbanner-03.jpg" className='img-fluid rounded-3' alt="main banner" />
                <div className="small-banner-content position-absolute">
                  <h5>New arrival</h5>
                  <h6>IPad</h6>
                  <p>From $599.00 or <br /> $49.92/mo.</p>
                </div>
              </div>

              <div className="small-banner position-relative p-1">
                <img src="images/banner/catbanner-04.jpg" className='img-fluid rounded-3' alt="main banner" />
                <div className="small-banner-content position-absolute">
                  <h5>Free engraving</h5>
                  <h6>AirPods Max</h6>
                  <p>High-fidelity playback & <br /> ultre-low distortion.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="home-wrapper-2 py-5">
          <div className="row">
            <div className="col-12">
              <div className="services d-flex align-items-center justify-content-between">
                {services?.map((i, j) => {
                    return (
                      <div className='d-flex align-items-center gap-15' key={j} >
                        <img src={i.image} style={{"width" : "17%"}} alt="servies" />
                        <div>
                          <h6 style={{"fontSize" : "15px"}}>{i.title}</h6>
                          <p style={{"fontSize" : "13px"}} className='stext mb-0'>{i.tagline}</p>
                        </div>
                      </div>
                    )
                })}
              </div>
            </div>
          </div>
      </Container>

      <Container class1='home-wrapper-2 py-5'>
          <div className="row">
            <div className="col-12" >
              <div style={{"borderRadius" : "10px"}} className="categories d-flex align-items-center flex-wrap justify-content-between">
                <div className='d-flex gap-15 align-items-center justify-content-center'>
                  <div>
                    <h6>Computers <br />& Laptops</h6>
                    <p>10 Items</p>
                  </div>
                  <img className='ctimg' src="images/laptop/laptop-6.jpg" alt="camera" />
                </div>

                <div className='d-flex gap-15 align-items-center justify-content-center'>
                  <div>
                    <h6>Mobiles <br />& Tablets</h6>
                    <p>10 Items</p>
                  </div>
                  <img className='ctimg' src="images/tablet/tablet-3.jpg" alt="tablet" />
                </div>

                <div className='d-flex gap-15 align-items-center justify-content-center'>
                  <div>
                    <h6>Smart<br />Watches</h6>
                    <p>10 Items</p>
                  </div>
                  <img className='ctimg' src="images/watch/watch-3.jpg" alt="watch" />
                </div>

                <div className='d-flex gap-15 align-items-center justify-content-center'>
                  <div>
                    <h6>Headphones <br />& Cameras</h6>
                    <p>10 Items</p>
                  </div>
                  <img className='ctimg' src="images/headphone/hp-13.jpg" alt="headphone" />
                </div>

                <div className='d-flex gap-15 align-items-center justify-content-center'>
                  <div>
                    <h6>Smart TV</h6>
                    <p>10 Items</p>
                  </div>
                  <img className='ctimg' src="images/tv/tv-1.jpg" alt="tv" />
                </div>

                <div className='d-flex gap-15 align-items-center justify-content-center'>
                  <div>
                    <h6>Gaming</h6>
                    <p>10 Items</p>
                  </div>
                  <img className='ctimg' src="images/gaming/gaming-1.jpg" alt="gaming" />
                </div>

                <div className='d-flex gap-15 align-items-center justify-content-center'>
                  <div>
                    <h6>Accessories</h6>
                    <p>10 Items</p>
                  </div>
                  <img className='ctimg' src="images/accessory/accessory-1.jpg" alt="accessory" />
                </div>

                <div className='d-flex gap-15 align-items-center justify-content-center'>
                  <div>
                    <h6>Home Appliances</h6>
                    <p>10 Items</p>
                  </div>
                  <img className='ctimg' src="images/homeapp/homeapp-2.jpg" alt="homeapp" />
                </div>
              </div>
            </div>
          </div>
      </Container>

      <Container class1='featured-wrapper py-5 home-wrapper-2'>
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Featured Collections</h3>
          </div>
        </div>

        <div className="row">
          { productState && productState?.map((item, index) => {
              if (item.tags === "features" && index < 15) {
                return (
                  <div key={index} className= {" col-3 "} >
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
                            <h5 className="product-title" dangerouslySetInnerHTML={{__html: item?.title.substr(0, 25) + "..."}} ></h5>
                            <ReactStars count={5} size={24} value={item?.totalrating.toString()} edit={false} activeColor="#ffd700"/>
                            <p className={`description `} dangerouslySetInnerHTML={{__html: item?.description.substr(0, 33) + "..."}} ></p>
                            <p className="price">$ {item?.price}</p>
                        </div>

                        <div className="action-bar position-absolute">
                            <div className="d-flex flex-column gap-15">
                                <button className='border-0 bg-transparent'>
                                    {/* <img onClick={() => navigate("/product/" + item?._id)} src="/images/icon/eye.png" alt="" width="20px" /> */}
                                    < MdUnfoldMore className='fs-4' onClick={() => navigate("/product/" + item?._id)} />
                                </button>
                            </div>
                        </div>
                    </div>
                  </div>
                )
              }
          })}
        </div>
      </Container>

      <Container class1="famous-wrapper py-5 home-wrapper-2">
          <div className="row">
            <div className="col-3">
              <div className="famous-card position-relative">
                <div className="famous-content position-absolute">
                  <h5>Big Screen</h5>
                  <h6>Smart Watch Series 8</h6>
                  <p>From $399 or $16.62/mo. for 24 mo.</p>
                </div>
                <img src="images/watch/watch-9.jpg" className='img-fluid' alt="" width='100%'/>
              </div>
            </div>

            <div className="col-3">
              <div className="famous-card position-relative">
                <div className="famous-content position-absolute">
                  <h5>Studio Display</h5>
                  <h6>600 nits of bright -ness</h6>
                  <p>14-inch 5K Retina display</p>
                </div>
                <img src="images/laptop/laptop-10.jpg" className='img-fluid' alt="" width='100%'/>
              </div>
            </div>

            <div className="col-3">
              <div className="famous-card position-relative">
                <div className="famous-content position-absolute">
                  <h5>Accessories</h5>
                  <h6>Tech Accessories</h6>
                  <p>From $299 or $19.62/mo. for 24 mo.</p>
                </div>
                <img src="images/accessory/accessory-8.jpg" className='img-fluid' alt="" width='100%'/>
              </div>
            </div>

            <div className="col-3">
              <div className="famous-card position-relative">
                <div className="famous-content position-absolute">
                  <h5>Gaming</h5>
                  <h6>Gaming Wallpaper</h6>
                  <p>From $199 or $12.62/mo. for 24 mo.</p>
                </div>
                <img src="images/accessory/accessory-9.jpg" className='img-fluid' alt="" width='100%'/>
              </div>
            </div>
          </div>
      </Container>

      <Container class1="special-wrapper py-5 home-wrapper-2">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Special Products</h3>
            </div>
          </div>

          <div className="row">
            { productState && productState?.map((item, index) => {
              if (item?.tags === "special" && index < 10) {
                return <SpecialProduct 
                          key={index} 
                          id={item?._id}
                          title={item?.title} 
                          brand={item?.brand}
                          price={item?.price}
                          totalrating={item?.totalrating.toString()}
                          sold={item?.sold}
                          quantity={item?.quantity}
                        />;
              }
            })} 
          </div>
      </Container>      

      <Container class1="popular-wrapper py-5 home-wrapper-2" >
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Our Popular Products</h3>
            </div>
          </div>
          
          <div className="row">
            { productState && productState?.map((item, index) => {
              if (item.tags === "popular" && index < 6) {
                return (
                  <div key={index} className= {" col-3 "} >
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
                            <h5 className="product-title" dangerouslySetInnerHTML={{__html: item?.title.substr(0, 25) + "..."}} ></h5>
                            <ReactStars count={5} size={24} value={item?.totalrating.toString()} edit={false} activeColor="#ffd700"/>
                            <p className={`description `} dangerouslySetInnerHTML={{__html: item?.description.substr(0, 33) + "..."}} ></p>
                            <p className="price">$ {item?.price}</p>
                        </div>

                        <div className="action-bar position-absolute">
                            <div className="d-flex flex-column gap-15">
                                {/* <button className='border-0 bg-transparent'>
                                    <img src="/images/icon/mix.png" alt="" width="20px" />
                                </button> */}
                                <button className='border-0 bg-transparent'>
                                    {/* <img onClick={() => navigate("/product/" + item?._id)} src="/images/icon/eye.png" alt="" width="20px" /> */}
                                    < MdUnfoldMore className='fs-4' onClick={() => navigate("/product/" + item?._id)} />
                                </button>
                                {/* <button className='border-0 bg-transparent'>
                                    <img src="/images/icon/shopping-bag.png" alt="" width="21px" />
                                </button> */}
                            </div>
                        </div>
                    </div>
                  </div>
                )
              }
            })}
          </div>
      </Container>

      <Container class1="marque-wrapper py-5">
          <div className="row">
            <div className="col-12">
              <div className="marque-inner-wrapper card-wrapper">
                <Marquee pauseOnHover direction='right' speed={20} className='d-flex'>
                  <div className='mx-4 w-25'>
                    <img src="images/banner/brand-01.png" alt="brand" />
                  </div>

                  <div className='mx-4 w-25'>
                    <img src="images/banner/brand-02.png" alt="brand" />
                  </div>

                  <div className='mx-4 w-25'>
                    <img src="images/banner/brand-03.png" alt="brand" />
                  </div>

                  <div className='mx-4 w-25'>
                    <img src="images/banner/brand-04.png" alt="brand" />
                  </div>

                  <div className='mx-4 w-25'>
                    <img src="images/banner/brand-05.png" alt="brand" />
                  </div>

                  <div className='mx-4 w-25'>
                    <img src="images/banner/brand-06.png" alt="brand" />
                  </div>

                  <div className='mx-4 w-25'>
                    <img src="images/banner/brand-07.png" alt="brand" />
                  </div>

                  <div className='mx-4 w-25'>
                    <img src="images/banner/brand-08.png" alt="brand" />
                  </div>
                </Marquee>
              </div>
            </div>
          </div>
      </Container>

      <Container class1="blog-wrapper py-5 home-wrapper-2">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Our Latest Blogs</h3>
            </div>
          </div>

          <div className="row d-flex flex-row">
              { blogState && blogState?.map((item, index) => {
                if(index < 4) {
                  return (
                    <div className="col-3 " key={index}>
                      <BlogCard 
                        id={item?._id} 
                        title={item?.title} 
                        description={item?.description} 
                        date={moment(item?.createdAt).format('MMMM Do YYYY, h:mm a')}
                        image={item?.image}  //images={item?.images[0].url} 
                      />
                    </div>
                  )
                }
              })}
          </div>
      </Container>
    </>
  )
}

export default Home