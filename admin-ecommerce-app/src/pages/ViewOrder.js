import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '../features/auth/authSlice';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete  } from "react-icons/md";
import { TiArrowBack } from "react-icons/ti";


const columns = [
    {
        title: 'No.',
        dataIndex: 'key',
    },
    {
        title: 'Product Name',
        dataIndex: 'name',
    },
    {
        title: 'Category',
        dataIndex: 'category',
    },
    {
        title: 'Brand',
        dataIndex: 'brand',
    },
    {
        title: 'Quantity',
        dataIndex: 'count',
    },
    {
        title: 'Color',
        dataIndex: 'color',
    },
    {
        title: 'Price',
        dataIndex: 'amount',
    },
    {
        title: 'Date',
        dataIndex: 'date',
    },
    // {
    //     title: 'Action',
    //     dataIndex: 'action',
    // },
];

const ViewOrder = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const orderId = location.pathname.split("/")[3];

    useEffect(() => {
      dispatch(getOrder(orderId));
    }, []); 

    const goBack = () => {
        navigate(-1);
    };
  
    const orderState = useSelector((state) => state?.auth?.singleorder?.orders);
    console.log(orderState);
    
    const data1 = [];
    for (let i = 0; i < orderState?.orderItems?.length; i++) {
      data1.push({
        key: i + 1,
        name: orderState?.orderItems[i]?.product.title,
        category: orderState?.orderItems[i]?.product.category,
        brand: orderState?.orderItems[i]?.product.brand,
        count: orderState?.orderItems[i]?.quantity, 
        amount: orderState?.orderItems[i]?.price,
        color: orderState?.orderItems[i]?.color?.title,
        date: new Date(orderState?.orderItems[i]?.product.createdAt).toLocaleString(),
        // action: 
        //     <>
        //         <Link className='fs-5 text-dark' to='/'><FaRegEdit/></Link>
        //         <Link className='ms-3 fs-5 text-dark' to='/'><MdOutlineDelete /></Link>
        //     </>
      });
    };
    
    /*
    const orderState = useSelector((state) => state?.auth?.singleorder);
    const products = orderState && orderState[0] ? orderState[0].products : [];

    console.log(products);

    const data1 = [];
    for (let i = 0; i < products?.length; i++) {
        data1.push({
            key: i + 1,
            name: products[i]?.product.title,
            brand: products[i]?.product.brand,
            count: products[i]?.count,
            amount: products[i]?.product.price,
            color: products[i]?.product.color,
            date: new Date(products[i]?.product.createdAt).toLocaleString(),
            action: 
                <>
                    <Link className='fs-5 text-dark' to='/'><FaRegEdit/></Link>
                    <Link className='ms-3 fs-5 text-dark' to='/'><MdOutlineDelete /></Link>
                </>
        });
    };
    */
  
    return (
      <div>
          <div className='d-flex justify-content-between align-items-center'>
            <h3 className="mb-4 title">Detail Order</h3>
            <button className='bg-transparent border-0 mb-0 d-flex align-items-center gap-2 text-secondary' style={{width : "10rem"}} onClick={goBack}><TiArrowBack className='fs-5'/> Back to List</button>
          </div>
          <div>
            <Table columns={columns} dataSource={data1} /> 
          </div>
      </div>
    )
}

export default ViewOrder