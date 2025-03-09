import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../features/category/categorySlice';
import { Link } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete  } from "react-icons/md";
import { deleteACategory, resetState } from '../features/category/categorySlice';
import CustomModal from '../components/CustomModal';

const columns = [
    {
      title: 'No.',
      dataIndex: 'key',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      sorter: (a, b) => a.title.length - b.title.length,
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];


const CategoryList = () => {
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setCategoryId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, []); 

  const categoryState = useSelector((state) => state.category.categories);
  const data1 = [];
  for (let i = 0; i < categoryState.length; i++) {
    data1.push({
      key: i + 1,
      title: categoryState[i].title,
      
      action: <>
        <Link className='fs-5 text-dark' to={`/admin/category/${categoryState[i]._id}`} ><FaRegEdit/></Link>
        <button className='ms-3 fs-5 text-dark bg-transparent border-0' onClick={() => showModal(categoryState[i]._id)} ><MdOutlineDelete /></button>
      </>
    });
  }
  
  const deleteCategory = (e) => {
    dispatch(deleteACategory(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCategories());
    }, 100)
  };

  return (
    <div>
        <h3 className="mb-4 title">Categories List</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>

        <CustomModal 
          hideModal={hideModal} 
          open={open}
          performAction={() => {
            deleteCategory(categoryId);
          }}
          title="Are you sure you want to delete this product category???" 
        />
    </div>
  )
}

export default CategoryList