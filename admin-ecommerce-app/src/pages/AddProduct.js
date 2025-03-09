import React, {useEffect, useState} from 'react'
import CustomInput from '../components/CustomInput'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getBrands } from '../features/brand/brandSlice';
import { getCategories } from '../features/category/categorySlice';
import { getColors } from '../features/color/colorSlice';
import { Select } from 'antd';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import { deleteImg, uploadImg } from '../features/upload/uploadSlice';
import { createProduct , getAProduct, getProducts, resetState, updateAProduct } from '../features/product/productSlice';
import { toast } from 'react-toastify';


let schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  price: yup.number().required('Price is required').min(100),
  brand: yup.string().required('Brand is required'),
  category: yup.string().required('Category is required'),
  color: yup.array().required('Colors are required'),
  quantity: yup.number().required('Quantity is required').min(1, 'Quantity should be more than 1'),
  tags: yup.string().required('Tags is required'),
});

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getProductId = location.pathname.split("/")[3];
  
  const [color, setColors] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
  }, [dispatch]);

  const brandState = useSelector((state) => state.brand.brands);
  const categoryState = useSelector((state) => state.category.categories);
  const colorState = useSelector((state) => state.color.colors);
  const imgState = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product);

  const { isSuccess, isError, isLoading, 
          createdProduct, updatedProduct,
          productName, productDesc, productPrice, productBrand, productQuantity,
          productCategory, productColor, productTags, productImages
        } = newProduct;

  useEffect(() => {
    if (getProductId !== undefined) {
      dispatch(getAProduct(getProductId));
      img.push(productImages); 
    } else {
      dispatch(resetState());
    }
  }, [getProductId, dispatch]);

  useEffect(() => {
    dispatch(resetState());
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success('New product added successfully!');
    }
    if (isSuccess && updatedProduct ) {
      toast.success('Product updated successfully!');
      navigate('/admin/product-list');
    }
    if (isError) {
      toast.error('Failed to add product!');
    }
  }, [isSuccess, isError, isLoading]);
  
  const coloropt = [];
  colorState.forEach((i) => {
    coloropt.push({
      label: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div 
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: i.title,
              marginRight: '10px',
              border: 'none'
            }}
          ></div>
          {i.title}
        </div>
      ),
      value: i._id,
    });
  });

  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  // useEffect(() => {
  //   formik.values.color = color ? color : " ";
  //   formik.values.images = img;
  // // }, [color, img]);
  // }, [productColor, productImages]);


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: productName || "",
      description: productDesc || "",
      price: productPrice || "",
      brand: productBrand || "",
      category: productCategory || "",
      quantity: productQuantity || "",
      tags: productTags || "",
      color: productColor || [],  // Initialize with productColor
      images: productImages || [],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getProductId !== undefined) {
        const data = {id: getProductId, productData: values};
        dispatch(updateAProduct(data));
        dispatch(resetState());
      } else {
        dispatch(createProduct(values));
        formik.resetForm();
        setColors([]);
        setImages([]);
        setTimeout(() => {
          dispatch(resetState());
          // navigate('/admin/product-list');
        }, 300);
      }
    },
  });

  const handleColors = (e) => {
    setColors(e);
    console.log(e);
  }

  return (
    <div>
        <h4 className="mb-4 title">{getProductId !== undefined ? "Edit" : "Add"} Product</h4>
        <div>
            <form action="" onSubmit={formik.handleSubmit} className='d-flex gap-3 flex-column'>
                <CustomInput name='title' 
                  type='text' 
                  label='Enter Product Title' 
                  onCh={formik.handleChange("title")} 
                  onBl={formik.handleBlur("title")}
                  val={formik.values.title}
                  />
                <div className="error">
                  { formik.touched.title && formik.errors.title }
                </div>

                <div className=''>
                    <ReactQuill 
                      theme="snow" 
                      name='description' 
                      onChange={formik.handleChange("description")} 
                      value={formik.values.description}
                    />
                </div>
                <div className="error ">
                  { formik.touched.description && formik.errors.description }
                </div>
                
                <CustomInput name='price' 
                  type='number' 
                  label='Enter Product Price'  
                  onCh={formik.handleChange("price")} 
                  onBl={formik.handleBlur("price")}
                  val={formik.values.price}  
                />
                <div className="error ">
                  { formik.touched.price && formik.errors.price }
                </div>

                <select name='brand' 
                  className='form-control py-3 mb-3' 
                  style={{"fontSize" : "14px"}} id="" 
                  onChange={formik.handleChange("brand")} 
                  onBlur={formik.handleBlur("brand")}
                  value={formik.values.brand} >
                    <option value="">Select Brand</option>
                    {brandState.map((i, j) => {
                      return <option key={j} value={i.title}>{i.title}</option>
                    })}
                </select>
                <div className="error ">
                  { formik.touched.brand && formik.errors.brand }
                </div>

                <select name='category' 
                  onChange={formik.handleChange("category")} 
                  onBlur={formik.handleBlur("category")}
                  value={formik.values.category} 
                  className='form-control py-3 mb-3' 
                  style={{"fontSize" : "14px"}} id="">
                    <option value="">Select Category</option>
                    {categoryState.map((i, j) => {
                      return (<option key={j} value={i.title}>{i.title}</option>)
                    })}
                </select>
                <div className="error ">
                  { formik.touched.category && formik.errors.category }
                </div>

                <select name='tags' 
                  onChange={formik.handleChange("tags")} 
                  onBlur={formik.handleBlur("tags")}
                  value={formik.values.tags} 
                  className='form-control py-3 mb-3' 
                  style={{"fontSize" : "14px"}} id="">
                    <option disabled value="">Select Tags</option>
                    <option value="features">Features Products</option>
                    <option value="popular">Popular Products</option>
                    <option value="special">Special Products</option>
                </select>
                <div className="error ">
                  { formik.touched.tags && formik.errors.tags }
                </div>

                <Select
                  mode="multiple"
                  allowClear
                  className="w-100"
                  placeholder="Select colors"
                  defaultValue={color}
                  onChange={(i) => handleColors(i)}
                  options={coloropt}
                />
                <div className="error">
                  {formik.touched.color && formik.errors.color}
                </div>

                <CustomInput name='quantity' 
                  type='number' 
                  label='Enter Product Quantity'  
                  onCh={formik.handleChange("quantity")} 
                  onBl={formik.handleBlur("quantity")}
                  val={formik.values.quantity}  
                />
                <div className="error ">
                  { formik.touched.quantity && formik.errors.quantity }
                </div>

                <div className='bg-white border-1 p-5 text-center form-control' >
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
                
                <div className="showimages d-flex flex-wrap gap-3">
                  {imgState?.map((i, j) => {
                    return (
                      <div key={j} className='position-relative'>
                        <button type='submit'  onClick={() => dispatch(deleteImg(i.public_id))} className="btn-close position-absolute" style={{"top" : "5px", "right" : "5px", "fontSize" : "10px"}}></button>
                        <img src={i.url} alt="" width="200px" />
                      </div>
                    );
                  })}
                </div>

                <button className="btn btn-success border-0 rounded-3 my-5" style={{"width" : "10rem"}} type='submit'> {getProductId !== undefined ? "Edit" : "Add"} Product </button>
            </form>
        </div>
    </div>
  )
}

export default AddProduct