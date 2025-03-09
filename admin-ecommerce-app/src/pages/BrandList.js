import React, { useEffect , useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../features/brand/brandSlice';
import { Link } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete  } from "react-icons/md";
import CustomModal from '../components/CustomModal';
import { deleteABrand , resetState } from '../features/brand/brandSlice';

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

const BrandList = () => {
  const [open, setOpen] = useState(false);
  const [brandId, setBrandId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setBrandId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getBrands());
  }, []); 

  const brandState = useSelector((state) => state.brand.brands);
  const data1 = [];
  for (let i = 0; i < brandState.length; i++) {
    data1.push({
      key: i + 1,
      title: brandState[i].title,
      
      action: <>
        <Link className='fs-5 text-dark' to={`/admin/brand/${brandState[i]._id}`} ><FaRegEdit/></Link>
        <button className='ms-3 fs-5 text-dark bg-transparent border-0' onClick={() => showModal(brandState[i]._id)} ><MdOutlineDelete /></button>
      </>
    });
  }

  const deleteBrand = (e) => {
    dispatch(deleteABrand(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBrands());
    }, 100)
  };

  return (
    <div>
        <h3 className="mb-4 title">Brands List</h3>
        <div>
          <Table  columns={columns} dataSource={data1} />
        </div>

        <CustomModal 
          hideModal={hideModal} 
          open={open}
          performAction={() => {
            deleteBrand(brandId);
          }}
          title="Are you sure you want to delete this brand???" 
        />
    </div>
  )
}

export default BrandList