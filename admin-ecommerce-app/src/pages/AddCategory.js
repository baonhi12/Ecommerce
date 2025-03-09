import React, {useEffect} from 'react'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { createCategories , getACategory, resetState, updateACategory } from '../features/category/categorySlice';

let schema = yup.object().shape({
  title: yup.string().required('Category title is required'),
});

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const getCategoryId = location.pathname.split("/")[3];
  const newCategory = useSelector((state) => state.category);
  const { isSuccess, isError, isLoading, createdCategories, categoryName, updatedCategory } = newCategory;

  useEffect(() => {
    if (getCategoryId !== undefined) {
      dispatch(getACategory(getCategoryId));
      // formik.values.title = brandName;
    } 
    else {
      dispatch(resetState())
    }
  }, [getCategoryId]);

  useEffect(() => {
    if (isSuccess && createdCategories) {
      toast.success('New category added successfully!');
    }
    if (isSuccess && updatedCategory ) {
      toast.success('Category updated successfully!');
      navigate('/admin/list-category');
    }
    if (isError) {
      toast.error('Failed to add new category!');
    }
  }, [isSuccess, isError, isLoading]);


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getCategoryId !== undefined) {
        const data = {id: getCategoryId, categoryData: values};
        dispatch(updateACategory(data));
        dispatch(resetState());
      } else {
        dispatch(createCategories(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
          // navigate('/admin/list-category');
        }, 300);
      }
    },
  });

  return (
    <div>
        <h4 className="mb-4 title">{getCategoryId !== undefined ? "Edit" : "Add"} Category</h4>
        <div>
            <form action="" onSubmit={formik.handleSubmit}>
                <CustomInput 
                  name='title'  
                  type='text' 
                  label='Enter Product Category' 
                  onCh={formik.handleChange("title")} 
                  onBl={formik.handleBlur("title")}
                  val={formik.values.title} 
                />

                <div className="error mt-3">
                  { formik.touched.title && formik.errors.title }
                </div>

                <button className="btn btn-success border-0 rounded-3 my-5" style={{width : "9.5rem"}} type='submit'> {getCategoryId !== undefined ? "Edit" : "Add"} Category </button>
            </form>
        </div>
    </div>
  )
}

export default AddCategory