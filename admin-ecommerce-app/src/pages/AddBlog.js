import React, { useState , useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Dropzone from 'react-dropzone';
import { deleteImg, uploadImg } from '../features/upload/uploadSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { getBlogsCate } from '../features/blogCate/blogCateSlice';
import { createBlog , getABlog, resetState, updateABlog } from '../features/blog/blogSlice';


let schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  category: yup.string().required('Blog Category is required'),
});

const AddBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const getBlogId = location.pathname.split("/")[3];

  const imgState = useSelector((state) => state.upload.images);
  const blogCategoryState = useSelector((state) => state.blogCate.blogsCate);
  
  const newBlog = useSelector((state) => state.blog);

  const { isSuccess, isError, isLoading, 
          createdBlog, updatedBlog,
          blogName, blogDesc, blogCategory, blogImages 
        } = newBlog;


  useEffect(() => {
    if (getBlogId !== undefined) {
      dispatch(getABlog(getBlogId));
      img.push(blogImages); 
    } else {
      dispatch(resetState());
    }
  }, [getBlogId]);
      
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogsCate());
  }, []);

  useEffect(() => {
    if (isSuccess && createdBlog) {
      toast.success('New blog added successfully!');
    }
    if (isSuccess && updatedBlog ) {
      toast.success('Blog updated successfully!');
      navigate('/admin/blog-list');
    }
    if (isError) {
      toast.error('Failed to add blog!');
    }
  }, [isSuccess, isError, isLoading]);

  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    formik.values.images = img;
  }, [blogImages]);


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogName || "",
      description: blogDesc || "",
      category: blogCategory || "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBlogId !== undefined) {
        const data = {id: getBlogId, blogData: values};
        dispatch(updateABlog(data));
        dispatch(resetState());
      } else {
        dispatch(createBlog(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
          // navigate('/admin/blog-list');
        }, 300);
      }
    },
  });

  return (
    <div>
        <h4 className="mb-4 title">{getBlogId !== undefined ? "Edit" : "Add"} Blog</h4>
        <div className=''>
            <form action="" onSubmit={formik.handleSubmit} >
              <div className='mt-4'>
                <CustomInput
                  name='title'
                  type='text' 
                  label='Enter Blog Title' 
                  onCh={formik.handleChange("title")} 
                  onBl={formik.handleBlur("title")}
                  val={formik.values.title}
                />
              </div>

              <div className="error mt-3 mb-4 px-1">
                { formik.touched.title && formik.errors.title }
              </div>

              <select name='category' 
                  onChange={formik.handleChange("category")} 
                  onBlur={formik.handleBlur("category")}
                  value={formik.values.category} 
                  className='form-control py-3 mb-3' 
                  style={{"fontSize" : "14px"}} id="">
                    <option value="">Select Blog Category</option>
                    { blogCategoryState.map((i, j) => {
                      return (<option key={j} value={i.title}>{i.title}</option>)
                    })}
              </select>
              
              <div className="error mt-3 mb-4 px-1">
                { formik.touched.category && formik.errors.category }
              </div>
              
              <div className=''>
                <ReactQuill 
                  theme="snow" 
                  name='description' 
                  onChange={formik.handleChange("description")} 
                  value={formik.values.description}
                />
              </div>

              <div className="error mt-3 mb-4 px-1">
                { formik.touched.description && formik.errors.description }
              </div>

              <div className='bg-white border-1 p-5 text-center form-control mt-3' >
                  <Dropzone onDrop={acceptedFiles => dispatch(uploadImg(acceptedFiles)) }>
                    {({getRootProps, getInputProps}) => (
                      <section>
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          <p>Click here to select files</p>
                        </div>
                      </section>
                    )}
                  </Dropzone>
              </div>

              <div className="showimages d-flex flex-wrap justify-content-center mt-3 gap-3">
                  {imgState?.map((i, j) => {
                    return (
                      <div key={j} className='position-relative'>
                        <button type='submit'  onClick={() => dispatch(deleteImg(i.public_id))} className="btn-close position-absolute" style={{"top" : "5px", "right" : "5px", "fontSize" : "10px"}}></button>
                        <img src={i.url} alt="" width="400px" />
                      </div>
                    );
                  })}
              </div>

              <button className="btn btn-success border-0 rounded-3 my-5" style={{width : "7.5rem"}} type='submit'> {getBlogId !== undefined ? "Edit" : "Add"} Blog </button>
            </form>
        </div>
    </div>
  )
}

export default AddBlog