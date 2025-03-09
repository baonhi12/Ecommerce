import React, {useEffect} from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { createColor , getAColor, resetState, updateAColor } from '../features/color/colorSlice';

let schema = yup.object().shape({
  title: yup.string().required('Color is required'),
});

const AddColor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const getColorId = location.pathname.split("/")[3];
  const newColor = useSelector((state) => state.color);
  const { isSuccess, isError, isLoading, createdColor, colorName, updatedColor } = newColor;
  
  useEffect(() => {
    if (getColorId !== undefined) {
      dispatch(getAColor(getColorId));
      // formik.values.title = brandName;
    } 
    else {
      dispatch(resetState())
    }
  }, [getColorId]);

  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success('New color added successfully!');
    }
    if (isSuccess && updatedColor ) {
      toast.success('Color updated successfully!');
      navigate('/admin/list-color');
    }
    if (isError) {
      toast.error('Failed to add new color!');
    }
  }, [isSuccess, isError, isLoading]);


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: colorName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getColorId !== undefined) {
        const data = {id: getColorId, colorData: values};
        dispatch(updateAColor(data));
        dispatch(resetState());
      } else {
        dispatch(createColor(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
          // navigate('/admin/list-color');
        }, 300);
      }
      
    },
  });

  return ( 
    <div>
        <h4 className="mb-4 title">{getColorId !== undefined ? "Edit" : "Add"} Color</h4>
        <div>
            <form action="" onSubmit={formik.handleSubmit} >
                <CustomInput 
                  name='title'
                  type='color' 
                  label='Enter Product Color'  
                  onCh={formik.handleChange("title")} 
                  onBl={formik.handleBlur("title")}
                  val={formik.values.title} 
                />

                <div className="error mt-3">
                  { formik.touched.title && formik.errors.title }
                </div>

                <button className="btn btn-success border-0 rounded-3 my-5" style={{width : "8rem"}} type='submit'> {getColorId !== undefined ? "Edit" : "Add"} Color </button>
            </form>
        </div>
    </div>
  )
}

export default AddColor