import React, { useEffect, useState } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { createCoupon , getACoupon, resetState, updateACoupon } from '../features/coupon/couponSlice';

let schema = yup.object().shape({
    name: yup.string().required('Coupon name is required'),
    expiry: yup.date().required('Expiry date is required'),
    discount: yup.number().required('Discount Percentage is required').integer('Discount must be an integer').min(0, 'Discount must be greater than 0%').max(100, 'Discount must be less than 100%'),
});

const AddCoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const getCouponId = location.pathname.split("/")[3];
  const newCoupon = useSelector((state) => state.coupon);

  const { isSuccess, isError, isLoading, 
          createdCoupon, updatedCoupon, 
          couponName, couponDiscount, couponExpiry } = newCoupon;
  
  const changeDateFormat = (date) => {
    // const newDate = new Date(date).toLocaleDateString();
    // const [month, day, year] = newDate.split("/");
    // return [year, month, day].join("-");
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0 nên cần cộng thêm 1
    const day = String(newDate.getDate()).padStart(2, '0'); // Đảm bảo ngày có 2 chữ số
    return `${year}-${month}-${day}`;
  };

  console.log(changeDateFormat(couponExpiry)) ;

  useEffect(() => {
    if (getCouponId !== undefined) {
      dispatch(getACoupon(getCouponId));
    } else {
      dispatch(resetState())
    }
  }, [getCouponId]);


  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast.success('New coupons added successfully!');
    }
    if (isSuccess && updatedCoupon ) {
      toast.success('Coupon updated successfully!');
      navigate('/admin/coupon-list');
    }
    if (isError && couponName && couponDiscount && couponExpiry) {
      toast.error('Failed to add new coupon!');
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
        name: couponName || "",
        expiry: changeDateFormat(couponExpiry) || "" , 
        discount: couponDiscount || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getCouponId !== undefined) {
        const data = {id: getCouponId, couponData: values};
        dispatch(updateACoupon(data));
        dispatch(resetState());
      } else {
        dispatch(createCoupon(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
          // navigate('/admin/coupon-list');
        }, 300);
      }
      
    },
  });

  return (
    <div>
        <h4 className="mb-4 title">{getCouponId !== undefined ? "Edit" : "Add"} Coupon</h4>
        <div>
            <form action="" onSubmit={formik.handleSubmit} >
                <CustomInput name='name' 
                  type='text' 
                  label='Enter Coupon Name'
                  onCh={formik.handleChange("name")} 
                  onBl={formik.handleBlur("name")}
                  val={formik.values.name} 
                />
                
                <div className="error mt-3 px-2">
                  { formik.touched.name && formik.errors.name }
                </div>

                <CustomInput name='expiry' 
                  type='date' 
                  label='Enter Expiry Date'
                  onCh={formik.handleChange("expiry")} 
                  onBl={formik.handleBlur("expiry")}
                  val={formik.values.expiry} 
                />
                
                <div className="error mt-3 px-2">
                  { formik.touched.expiry && formik.errors.expiry }
                </div>

                <CustomInput name='discount' 
                  type='number' 
                  label='Enter Coupon Discount %'
                  onCh={formik.handleChange("discount")} 
                  onBl={formik.handleBlur("discount")}
                  val={formik.values.discount} 
                />
                
                <div className="error mt-3 px-2">
                  { formik.touched.discount && formik.errors.discount }
                </div>

                <button className="btn btn-success border-0 rounded-3 my-5" style={{width : "9rem"}} type='submit'> {getCouponId !== undefined ? "Edit" : "Add"} Coupon </button>
            </form>
        </div>
    </div>
  )
}

export default AddCoupon