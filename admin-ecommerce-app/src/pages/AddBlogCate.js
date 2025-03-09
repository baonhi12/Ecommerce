import React, {useEffect} from 'react'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { createBlogCategory , getABlogCategory, resetState, updateABlogCategory } from '../features/blogCate/blogCateSlice';

let schema = yup.object().shape({
  title: yup.string().required('Blog Category title is required'),
});

const AddBlogCate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const getBlogCateId = location.pathname.split("/")[3];
  const newBlogCategory = useSelector((state) => state.blogCate);
  const { isSuccess, isError, isLoading, createBlogCate, blogCateName, updatedBlogCate } = newBlogCategory;

  useEffect(() => {
    if (getBlogCateId !== undefined) {
      dispatch(getABlogCategory(getBlogCateId));
    } 
    else {
      dispatch(resetState())
    }
  }, [getBlogCateId]);

  useEffect(() => {
    if (isSuccess && createBlogCate) {
      toast.success('New blog category added successfully!');
    }
    if (isSuccess && updatedBlogCate ) {
      toast.success('Blog Category updated successfully!');
      navigate('/admin/blog-category-list');
    }
    if (isError) {
      toast.error('Failed to add new blog!');
    }
  }, [isSuccess, isError, isLoading]);


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogCateName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBlogCateId !== undefined) {
        const data = {id: getBlogCateId, blogCategoryData: values};
        dispatch(updateABlogCategory(data));
        dispatch(resetState());
      } else {
        dispatch(createBlogCategory(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
          // navigate('/admin/blog-category-list');
        }, 300);
      }
    },
  });

  return (
    <div>
        <h4 className="mb-4 title">{getBlogCateId !== undefined ? "Edit" : "Add"} Blog Category</h4>
        <div>
            <form action="" onSubmit={formik.handleSubmit} >
                <CustomInput name='title' 
                  type='text' 
                  label='Enter Blog Category'  
                  onCh={formik.handleChange("title")} 
                  onBl={formik.handleBlur("title")}
                  val={formik.values.title} 
                />

                <div className="error mt-3">
                  { formik.touched.title && formik.errors.title }
                </div>

                <button className="btn btn-success border-0 rounded-3 my-5" style={{width : "11rem"}} type='submit'> {getBlogCateId !== undefined ? "Edit" : "Add"} Blog Category </button>
            </form>
        </div>
    </div>
  )
}

export default AddBlogCate