import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteABlogCategory, getBlogsCate, resetState } from '../features/blogCate/blogCateSlice';
import { Link } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete  } from "react-icons/md";
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

const BlogCateList = () => {
  const [open, setOpen] = useState(false);
  const [blogCateId, setBlogCateId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setBlogCateId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogsCate());
  }, []); 

  const blogCateState = useSelector((state) => state.blogCate.blogsCate);
  const data1 = [];
  for (let i = 0; i < blogCateState.length; i++) {
    data1.push({
      key: i + 1,
      title: blogCateState[i].title,
      
      action: <>
        <Link className='fs-5 text-dark' to={`/admin/blog-category/${blogCateState[i]._id}`} ><FaRegEdit/></Link>
        <button className='ms-3 fs-5 text-dark bg-transparent border-0' onClick={() => showModal(blogCateState[i]._id)} ><MdOutlineDelete /></button>
      </>
    });
  }

  const deleteBlogCate = (e) => {
    dispatch(deleteABlogCategory(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogsCate());
    }, 100)
  };

  return (
    <div>
        <h3 className="mb-4 title">Blog Categories</h3>
        <div>
          <Table  columns={columns} dataSource={data1} />
        </div>

        <CustomModal 
          hideModal={hideModal} 
          open={open}
          performAction={() => {
            deleteBlogCate(blogCateId);
          }}
          title="Are you sure you want to delete this blog category???" 
        />
    </div>
  )
}

export default BlogCateList