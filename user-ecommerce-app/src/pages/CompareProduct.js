import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import Color from '../components/Color'
import Container from '../components/Container'

const CompareProduct = () => {
  const colors1 = ['#B71C1C', '#536DFE'];
  const colors2 = ['#4A148C', '#304FFE'];
  const colors3 = ['#03A9F4', '#00695C'];
  const colors4 = ['#EEEEEE', '#E65100'];

  return (
    <>
    <Meta title={'Compare Products'}/>
    <BreadCrumb title='Compare Products'/>

    <Container class1='compare-prod-wrapper py-5 home-wrapper-2'>
      <div className="row">
        <div className="col-3">
          <div className="compare-prod-card position-relative">
            <img src="images/icon/cross-1.png" alt="" className="position-absolute cross img-fluid" />
            <div className="product-card-img">
              <img src="images/headphone/hp-1.jpg" alt="" width='100%' />
            </div>

            <div className="compare-prod-details">
              <h5 className="title">Lorem ipsum dolor sit amet.</h5>
              <h6 className="price mb-3 mt-3">$100</h6>
              <div>
                <div className='product-detail '>
                  <h5>Brand:</h5>
                  <p>Apple</p>
                </div>

                <div className='product-detail '>
                  <h5>Type:</h5>
                  <p>Headphone</p>
                </div>

                <div className='product-detail '>
                  <h5>Availability:</h5>
                  <p>In Stock</p>
                </div>

                <div className='product-detail '>
                  <h5>Color:</h5>
                  < Color 
                      selectedColors={colors1}
                    />
                </div>

                <div className='product-detail '>
                  <h5>Size:</h5>
                  <div className="d-flex gap-10">
                    <p>S</p>
                    <p>M</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-3">
          <div className="compare-prod-card position-relative">
            <img src="images/icon/cross-1.png" alt="" className="position-absolute cross img-fluid" />
            <div className="product-card-img">
              <img src="images/headphone/hp-1.jpg" alt="" width='100%' />
            </div>

            <div className="compare-prod-details">
              <h5 className="title">Lorem ipsum dolor sit amet.</h5>
              <h6 className="price mb-3 mt-3">$100</h6>
              <div>
                <div className='product-detail '>
                  <h5>Brand:</h5>
                  <p>Apple</p>
                </div>

                <div className='product-detail '>
                  <h5>Type:</h5>
                  <p>Headphone</p>
                </div>

                <div className='product-detail '>
                  <h5>Availability:</h5>
                  <p>In Stock</p>
                </div>

                <div className='product-detail '>
                  <h5>Color:</h5>
                  < Color 
                      selectedColors={colors2}
                    />
                </div>

                <div className='product-detail '>
                  <h5>Size:</h5>
                  <div className="d-flex gap-10">
                    <p>M</p>
                    <p>L</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-3">
          <div className="compare-prod-card position-relative">
            <img src="images/icon/cross-1.png" alt="" className="position-absolute cross img-fluid" />
            <div className="product-card-img">
              <img src="images/headphone/hp-1.jpg" alt="" width='100%' />
            </div>

            <div className="compare-prod-details">
              <h5 className="title">Lorem ipsum dolor sit amet.</h5>
              <h6 className="price mb-3 mt-3">$100</h6>
              <div>
                <div className='product-detail '>
                  <h5>Brand:</h5>
                  <p>Apple</p>
                </div>

                <div className='product-detail '>
                  <h5>Type:</h5>
                  <p>Headphone</p>
                </div>

                <div className='product-detail '>
                  <h5>Availability:</h5>
                  <p>In Stock</p>
                </div>

                <div className='product-detail '>
                  <h5>Color:</h5>
                  < Color 
                      selectedColors={colors3}
                    />
                </div>

                <div className='product-detail '>
                  <h5>Size:</h5>
                  <div className="d-flex gap-10">
                    <p>S</p>
                    <p>XL</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-3">
          <div className="compare-prod-card position-relative">
            <img src="images/icon/cross-1.png" alt="" className="position-absolute cross img-fluid" />
            <div className="product-card-img">
              <img src="images/headphone/hp-1.jpg" alt="" width='100%' />
            </div>

            <div className="compare-prod-details">
              <h5 className="title">Lorem ipsum dolor sit amet.</h5>
              <h6 className="price mb-3 mt-3">$100</h6>
              <div>
                <div className='product-detail '>
                  <h5>Brand:</h5>
                  <p>Apple</p>
                </div>

                <div className='product-detail '>
                  <h5>Type:</h5>
                  <p>Headphone</p>
                </div>

                <div className='product-detail '>
                  <h5>Availability:</h5>
                  <p>In Stock</p>
                </div>

                <div className='product-detail '>
                  <h5>Color:</h5>
                  < Color 
                      selectedColors={colors4}
                    />
                </div>

                <div className='product-detail '>
                  <h5>Size:</h5>
                  <div className="d-flex gap-10">
                    <p>XL</p>
                    <p>L</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>

    </>
  )
}

export default CompareProduct