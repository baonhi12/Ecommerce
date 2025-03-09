import React from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import Container from '../components/Container';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { createQuery } from '../features/contact/contactSlice';


const contactSchema = yup.object({
  name: yup.string().required("Name is required").min(3, "Name should be at least 3 characters"),
  email: yup.string().email("Email should be valid").required("Email is required"),
  mobile: yup.number()
    .typeError("That doesn't look like a phone number")
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    .min(111111111, 'Phone number must be equal to 10 digits')
    .max(999999999, 'Phone number must be equal to 10 digits')
    .required("Mobile number is required"),
  comment: yup.string().required("Comment is required"),
});

const Contact = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      mobile: '',
      comment: '',
    },
    validationSchema: contactSchema,
    onSubmit: values => {
      dispatch(createQuery({
        name: values.name,
        email: values.email,
        mobile: values.mobile,
        comment: values.comment,
      }));
    },
  });


  return (
    <>
    <Meta title={'Contact Us'}/>
    <BreadCrumb title='Contact Us'/>

    <Container class1='contact-wrapper py-5 home-wrapper-2'>
      <div className="row">
        <div className="col-12">
          <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.3137384619163!2d105.7663783!3d20.980057199999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313453a3e1e1fb5d%3A0x372ab63fe05da671!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBDTUMgMQ!5e0!3m2!1svi!2s!4v1718726011867!5m2!1svi!2s" 
              width="600" 
              height="450" 
              className='border-0 w-100'
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>

        <div className="col-12 mt-5">
          <div className="contact-inner-wrapper d-flex justify-content-between">
            <div>
              <h6 className="contact-title mb-4">Contact</h6>
              <form action="" onSubmit={formik.handleSubmit}  className='d-flex flex-column gap-15'>
                <div>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder='FullName'
                    name='name'
                    onChange={formik.handleChange("name")} 
                    onBlur={formik.handleBlur("name")}
                    value={formik.values.name}
                  />

                  <div className="error mt-2 mb-2 px-2">
                    { formik.touched.name && formik.errors.name }
                  </div>
                </div>

                <div>
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder='Email'
                    name='email'
                    onChange={formik.handleChange("email")} 
                    onBlur={formik.handleBlur("email")}
                    value={formik.values.email}
                  />

                  <div className="error mt-2 mb-2 px-2">
                    { formik.touched.email && formik.errors.email }
                  </div>
                </div>

                <div>
                  <input 
                    type="tel" 
                    className="form-control" 
                    placeholder='Mobile number'
                    name='mobile'
                    onChange={formik.handleChange("mobile")} 
                    onBlur={formik.handleBlur("mobile")}
                    value={formik.values.mobile}
                  />

                  <div className="error mt-2 mb-2 px-2">
                    { formik.touched.mobile && formik.errors.mobile }
                  </div>
                </div>

                <div>
                  <textarea 
                    name="comment"  
                    className='w-100 form-control' 
                    cols='30' 
                    rows='4' 
                    placeholder='Comments'
                    onChange={formik.handleChange("comment")} 
                    onBlur={formik.handleBlur("comment")}
                    value={formik.values.comment}
                  ></textarea>

                  <div className="error mt-2 mb-2 px-2">
                    { formik.touched.comment && formik.errors.comment }
                  </div>
                </div>

                <div>
                  <button type='submit' className='button border-0'>Submit</button>
                </div>
              </form>
            </div>
              
            <div>
              <h6 className="contact-title mb-4">Get in touch with us</h6>
              <div>
                <ul className="ps-0">
                  <li className='mb-4 d-flex gap-15 align-items-center'>
                    <img src="images/icon/ct1.png" className='fs-5' alt="" width='5%' />
                    <address className='m-0'>Ha Dong, HaNoi, VietNam</address>
                  </li>
                  <li className='mb-4 d-flex gap-15 align-items-center'>
                    <img src="images/icon/ct2.png" className='fs-5' alt="" width='5%' />
                    <a href="tel:+84 942 165 818">+84 942 165 818</a>
                  </li>
                  <li className='mb-4 d-flex gap-15 align-items-center'>
                    <img src="images/icon/ct3.png" className='fs-5' alt="" width='5%' />
                    <a href="mailto:baonhi@gmail.com">baonhi@gmail.com</a>
                  </li>
                  <li className='mb-4 d-flex gap-15 align-items-center'>
                    <img src="images/icon/ct4.png" className='fs-5' alt="" width='5%' />
                    <p className='m-0'>Monday - Friday 8.30AM - 9PM</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>

    </>
  )
}

export default Contact