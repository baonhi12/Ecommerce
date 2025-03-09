import React , { useEffect, useState } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import ReactStars from "react-rating-stars-component";
import ProductCard from '../components/ProductCard';
import Color from '../components/Color';
import Container from '../components/Container'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../features/products/productSlice';


const OurStore = () => {
  const [ grid, setGrid ] = useState(4);

  const productState = useSelector((state) => state?.product?.product);
  const [ brands, setBrands ] = useState([]);
  const [ categories, setCategories ] = useState([]);
  const [ tags, setTags ] = useState([]);

  // filter by brand, category and tags
  const [ category, setCategory ] = useState(null);
  const [ tag, setTag ] = useState(null);
  const [ brand, setBrand ] = useState(null);
  const [ minPrice, setMinPrice ] = useState(null);
  const [ maxPrice, setMaxPrice ] = useState(null);
  const [ sort, setSort ] = useState(null);
  console.log(sort);

  useEffect(() => {
    let newBrands = [];
    let category = [];
    let newTags = [];
    for (let i = 0; i < productState.length; i++) {
      const element = productState[i];
      newBrands.push(element.brand);
      category.push(element.category);
      newTags.push(element.tags);
    }
    setBrands(newBrands);
    setCategories(category);
    setTags(newTags);
  }, [productState]);
  // console.log(
  //   [...new Set(brands)], 
  //   [...new Set(categories)], 
  //   [...new Set(tags)]
  // );


  const dispatch = useDispatch();

  useEffect(() => {
    getProducts();
  }, [sort, tag, brand, category, minPrice, maxPrice]);

  const getProducts = () => {
    dispatch(getAllProducts({sort, tag, brand, category, minPrice, maxPrice}));
  };

  
  
  return (
    <> 
      <Meta title={'Our Store'}/>
      <BreadCrumb title='Our Store'/>

      <Container class1='store-wrapper py-5 home-wrapper-2'>
        <div className="row">
          <div className="col-3">
            <div className='filter-card mb-3'>
              <h6 className="filter-title">Shop By Categories</h6>
              <div>
                <ul className='ps-0'>
                  { categories && [...new Set(categories)].map((item, index) => {
                    return <li key={index} onClick={() => setCategory(item)}>{item}</li>
                  })}
                </ul>
              </div>
            </div>

            <div className='filter-card mb-3'>
              {/* <h6 className="filter-title">Filter By</h6> */}
              <div>
                {/* <h6 className="sub-title">Availability</h6>
                <div>
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" value=''  />
                    <label htmlFor="" className="form-check-label">
                        In Stock (1)
                    </label>
                  </div>

                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" value='' />
                    <label htmlFor="" className="form-check-label">
                        Out of Stock (1)
                    </label>
                  </div>
                </div> */}

                <h6 className="filter-title">Price</h6>
                <div className='d-flex align-items-center gap-10'>
                  <div className="form-floating">
                    <input type="number" 
                      className="form-control" id="floatingInput" 
                      placeholder="From" 
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <label htmlFor="floatingInput">From</label>
                  </div>

                  <div className="form-floating">
                    <input type="number" 
                      className="form-control" id="floatingInput" 
                      placeholder="To" 
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                    <label htmlFor="floatingInput">To</label>
                  </div>
                </div>

                {/* 
                <h6 className="sub-title">Color</h6>
                <div className='p-2'> < Color /> </div>

                <h6 className="sub-title">Size</h6>
                <div>
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" value='' id='color-1' />
                    <label htmlFor="color-1" className="form-check-label">
                        S (2)
                    </label>
                  </div>

                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" value='' id='color-2' />
                    <label htmlFor="color-2" className="form-check-label">
                        M (5)
                    </label>
                  </div>

                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" value='' id='color-3' />
                    <label htmlFor="color-3" className="form-check-label">
                        L (1)
                    </label>
                  </div>

                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" value='' id='color-4' />
                    <label htmlFor="color-4" className="form-check-label">
                        XL (6)
                    </label>
                  </div>

                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" value='' id='color-5' />
                    <label htmlFor="color-5" className="form-check-label">
                        XXL (0)
                    </label>
                  </div>
                </div> 
                */}
              </div>
            </div>

            <div className='filter-card mb-3'>
              <h6 className="filter-title">Product Tags</h6>
              <div>
                <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                  { tags && [...new Set(tags)].map((item, index) => {
                    return (
                      <span onClick={() => setTag(item)} key={index} className="text-capitalize badge bg-light text-secondary rounded-3 py-2 px-2">{item}</span>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className='filter-card mb-3'>
              <h6 className="filter-title">Product Brands</h6>
              <div>
                <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                  { brands && [...new Set(brands)].map((item, index) => {
                    return (
                      <span onClick={() => setBrand(item)} key={index} className="text-capitalize badge bg-light text-secondary rounded-3 py-2 px-2">{item}</span>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* <div className='filter-card mb-3'>
              <h6 className="filter-title">Random Products</h6>
              <div>
                <div className="random-product d-flex mb-3">
                  <div className="w-50">
                    <img src="images/watch/watch-6.jpg" className='img-fluid' alt="" width='100%' />
                  </div>
                  <div className="w-50">
                    <h6>Apple Watch Series 8</h6>
                    <ReactStars count={5} size={24} value={4} edit={false} activeColor="#ffd700"/>
                    <b>$199.00</b>
                  </div>
                </div>

                <div className="random-product d-flex ">
                  <div className="w-50">
                    <img src="images/headphone/hp-11.jpg" className='img-fluid' alt="" width='100%' />
                  </div>
                  <div className="w-50">
                    <h6>SS Headphone Bluetooth</h6>
                    <ReactStars count={5} size={24} value={4} edit={false} activeColor="#ffd700"/>
                    <b>$189.00</b>
                  </div>
                </div>
              </div>
            </div> */}
          </div>

          <div className="col-9">
            <div className="filter-sort-grid mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-10">
                  <p className="col-3 mb-1 align-items-center d-block">Sort By:</p>
                  <select name="" id="" className="form-control form-select"  
                    style={{"width": '17rem'}} defaultValue={"manual"} 
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option value="manual" disabled >Select option</option>
                    <option value="title">Alphabetically, A-Z</option>
                    <option value="-title">Alphabetically, Z-A</option>
                    <option value="price">Price, low to high</option>
                    <option value="-price">Price, high to low</option>
                    <option value="createdAt">Date, old to new</option>
                    <option value="-createdAt">Date, new to old</option>
                  </select>
                </div>

                <div className='d-flex align-items-center gap-5'>
                  <p className="totalproduct mb-0">30 Products</p>
                  <div className="d-flex gap-10 align-items-center">
                    <img onClick={() => {setGrid(3);}} src="images/icon/icon-1.png" className='d-block img-fluid' alt="" />
                    <img onClick={() => {setGrid(4);}} src="images/icon/icon-2.png" className='d-block img-fluid' alt="" />
                    <img onClick={() => {setGrid(6);}} src="images/icon/icon-3.png" className='d-block img-fluid' alt="" />
                    <img onClick={() => {setGrid(12);}} src="images/icon/icon-4.png" className='d-block img-fluid' alt="" />
                  </div>
                </div>
              </div>
            </div>

            <div className="product-list pb-5">
              <div className="d-flex gap-10 flex-wrap">
                <ProductCard 
                  data={productState ? productState : []} 
                  grid={grid} 
                />
              </div>
            </div>
          </div>
        </div>
      </Container>

    </>
  )
}

export default OurStore