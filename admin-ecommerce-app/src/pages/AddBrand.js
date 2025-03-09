import React, {useEffect} from 'react'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { createBrand , getABrand, resetState, updateABrand } from '../features/brand/brandSlice';

let schema = yup.object().shape({
  title: yup.string().required('Brand title is required'),
});

const AddBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const getBrandId = location.pathname.split("/")[3];
  const newBrand = useSelector((state) => state.brand);
  const { isSuccess, isError, isLoading, createdBrand, brandName, updatedBrand } = newBrand;

  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getABrand(getBrandId));
      // formik.values.title = brandName;
    } 
    else {
      dispatch(resetState())
    }
  }, [getBrandId]);

  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success('New brands added successfully!');
      // navigate('/admin/list-brand');
    }
    if (isSuccess && updatedBrand ) {
      toast.success('Brand updated successfully!');
      navigate('/admin/list-brand');
    }
    if (isError) {
      toast.error('Failed to add new brand!');
    }
  }, [isSuccess, isError, isLoading]);


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBrandId !== undefined) {
        const data = {id: getBrandId, brandData: values};
        dispatch(updateABrand(data));
        dispatch(resetState());
      } else {
        dispatch(createBrand(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
          // navigate('/admin/list-brand');
        }, 300);
      }
    },
  });

  return (
    <div>
        <h4 className="mb-4 title">{getBrandId !== undefined ? "Edit" : "Add"} Brand</h4>
        <div>
            <form action="" onSubmit={formik.handleSubmit} >
                <CustomInput name='title' 
                  type='text' 
                  label='Enter Brand'
                  onCh={formik.handleChange("title")} 
                  onBl={formik.handleBlur("title")}
                  val={formik.values.title} 
                />
                
                <div className="error mt-3">
                  { formik.touched.title && formik.errors.title }
                </div>

                <button className="btn btn-success border-0 rounded-3 my-5" style={{width : "7.5rem"}} type='submit'> {getBrandId !== undefined ? "Edit" : "Add"} Brand </button>
            </form>
        </div>
    </div>
  )
}

export default AddBrand