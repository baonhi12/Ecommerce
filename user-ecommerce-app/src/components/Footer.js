import React from 'react'
import {BsSearch} from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { FaLinkedin, FaGithub, FaFacebook, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className='py-4'>
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-5">
              <div className="footer-top-data d-flex gap-30 align-items-center">
                <img src="/images/icon/newsletter.png" alt="newsletter" />
                <h6 className='mb-0 text-white'>Signup For Newsletter</h6>
              </div>
            </div>

            <div className="col-7">
              <div className="input-group">
                <input type="text" className="form-control py-3" placeholder="Your Email Address" aria-label="Your Email Address" aria-describedby="basic-addon2"/>
                <span className="input-group-text p-2" id="basic-addon2">Subscribe</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <footer className='py-4'>
        <div className="container-xxl">
          <div className="row">
            <div className="col-4">
              <h6 className='text-white mb-4'>Contact Us</h6>
              <div>
                <address className='text-white fs-6'>
                  Ha Dong, HaNoi, VietNam <br /> 
                  84C Nguyen Thanh Binh <br />
                </address>
                <a href="tel:+84 942 165 818" className="mt-3 d-block mb-2 text-white">+84 942 165 818</a>
                <a href="mailto:baonhi@gmail.com" className="mt-3 d-block mb-2 text-white">baonhi@gmail.com</a>
                <div className="social-icons d-flex align-items-center gap-30 mt-4">
                  <a className='text-white' to="/"><FaLinkedin className='fs-4'/></a>
                  <a className='text-white' to="/"><FaGithub className='fs-4'/></a>
                  <a className='text-white' to="/"><FaFacebook className='fs-4'/></a>
                  <a className='text-white' to="/"><FaWhatsapp className='fs-4'/></a>
                </div>
              </div>
            </div>

            <div className="col-3">
              <h6 className='text-white mb-4'>Informations</h6>
              <div className='footer-link d-flex flex-column'>
                <Link to='/privacy-policy' className='text-white py-2 mb-1'>Privacy Policy</Link>
                <Link to='/refund-policy' className='text-white py-2 mb-1'>Refund Policy</Link>
                <Link to='/shipping-policy' className='text-white py-2 mb-1'>Shipping Policy</Link>
                <Link to='/term-conditions' className='text-white py-2 mb-1'>Terms Of Service</Link>
                <Link to='/blogs' className='text-white py-2 mb-1'>Blogs</Link>
              </div>
            </div>

            <div className="col-3">
              <h6 className='text-white mb-4'>Account</h6>
              <div className='footer-link d-flex flex-column'>
                <Link className='text-white py-2 mb-1'>About Us</Link>
                <Link className='text-white py-2 mb-1'>Faq</Link>
                <Link className='text-white py-2 mb-1'>Contact</Link>
                <Link className='text-white py-2 mb-1'>Search</Link> 
              </div>
            </div>

            <div className="col-2">
              <h6 className='text-white mb-4'>Quick Links</h6>
              <div className='footer-link d-flex flex-column'>
                <Link className='text-white py-2 mb-1'>Laptops</Link>
                <Link className='text-white py-2 mb-1'>Headphones</Link>
                <Link className='text-white py-2 mb-1'>Tablets</Link>
                <Link className='text-white py-2 mb-1'>Watch</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      <footer className='py-4'>
        <div className="container-xxl">
          <div className="">
            <div className="col-12">
              <p className="text-center mb-0 text-white">Powered by Bảo Nhi, {new Date().getFullYear()}</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer