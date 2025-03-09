import React, { useEffect , useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete  } from "react-icons/md";
import { deleteACoupon, getAllCoupon , resetState } from '../features/coupon/couponSlice';
import CustomModal from '../components/CustomModal';


const columns = [
    {
      title: 'No.',
      dataIndex: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Expiry',
      dataIndex: 'expiry',
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      sorter: (a, b) => a.discount - b.discount,
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];

const CouponList = () => {
  const [open, setOpen] = useState(false);
  const [couponId, setCouponId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setCouponId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getAllCoupon());
  }, []); 

  const couponState = useSelector((state) => state.coupon.coupons);
  const data1 = [];
  for (let i = 0; i < couponState.length; i++) {
    data1.push({
      key: i + 1,
      name: couponState[i].name,
      expiry: new Date(couponState[i].expiry).toLocaleString(),
      discount: couponState[i].discount,
      
      action: <>
        <Link className='fs-5 text-dark' to={`/admin/coupon/${couponState[i]._id}`} ><FaRegEdit/></Link>
        <button className='ms-3 fs-5 text-dark bg-transparent border-0' onClick={() => showModal(couponState[i]._id)}><MdOutlineDelete /></button>
      </>
    });
  }

  const deleteCoupon = (e) => {
    dispatch(deleteACoupon(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getAllCoupon());
    }, 100)
  };

  return (
    <div>
        <h3 className="mb-4 title">Coupons List</h3>
        <div>
          <Table  columns={columns} dataSource={data1} />
        </div>

        <CustomModal 
          hideModal={hideModal} 
          open={open}
          performAction={() => {
            deleteCoupon(couponId);
          }}
          title="Are you sure you want to delete this coupon???" 
        />
    </div>
  )
}

export default CouponList