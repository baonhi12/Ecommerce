import React, { useEffect, useState } from 'react'
import { Column } from '@ant-design/plots';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { PiArrowLineDownRightLight, PiArrowLineUpRightLight } from "react-icons/pi";
import { getMonthlyData, getOrders, getYearlyData } from '../features/auth/authSlice';

/* const data = [
  { type: 'Jan', value: 16 },
  { type: 'Feb', value: 30 },
  { type: 'Mar', value: 24 },
  { type: 'Apr', value: 19 },
  { type: 'May', value: 22 },
  { type: 'Jun', value: 5 },
  { type: 'Jul', value: 5 },
  { type: 'Aug', value: 1 },
  { type: 'Sep', value: 15 },
  { type: 'Oct', value: 25 },
  { type: 'Nov', value: 15 },
  { type: 'Dec', value: 38 },
]; */

const columns = [
  {
    title: 'No.',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Product Count',
    dataIndex: 'product',
  },
  {
    title: 'Price',
    dataIndex: 'price',
  },
  {
    title: 'Total Price',
    dataIndex: 'discountprice',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
];


const Dashboard = () => {
  const dispatch = useDispatch();
  const monthlyDataState = useSelector((state) => state?.auth?.monthlyData);
  const yearlyDataState = useSelector((state) => state?.auth?.yearlyData);
  const orderState = useSelector((state) => state?.auth?.orders?.orders);
  console.log(orderState);
  const [ dataMonthly, setDataMonthly ] = useState([]);
  const [ dataMonthlySales, setDataMonthlySales ] = useState([]);
  const [ orderData, setOrderData ] = useState([]);

  const getTokenFromLocalStorage = localStorage.getItem("user") 
    ? JSON.parse(localStorage.getItem("user")) 
    : null;

  const config3 = {
    headers: {
      Authorization: `Bearer ${
        getTokenFromLocalStorage !== null 
        ? getTokenFromLocalStorage.token : "" 
      }`,
      Accept: 'application/json',
    }
  };

  useEffect(() => {
    dispatch(getMonthlyData(config3));
    dispatch(getYearlyData(config3));
    dispatch(getOrders(config3));
  }, []);

  console.log(monthlyDataState);
  useEffect(() => {
    let monthNames= ["January","February","March","April","May","June","July",
      "August","September","October","November","December"];

    let data = [];
    let monthlyOrderCount = [];
    for (let i = 0; i < monthlyDataState?.length; i++) {
      const element = monthlyDataState[i];
      data.push({
        type: monthNames[element?._id?.month],
        income: element?.amount,
      });
      monthlyOrderCount.push({
        type: monthNames[element?._id?.month],
        sales: element?.count,
      });
    }
    setDataMonthly(data);
    setDataMonthlySales(monthlyOrderCount);

    const data1 = [];
    for (let i = 0; i < orderState?.length; i++) {
      data1.push({
        key: i,
        name: orderState[i]?.user?.firstname + ' ' + orderState[i]?.user?.lastname,
        product: orderState[i]?.orderItems?.length,
        price: orderState[i]?.totalPrice,
        discountprice: orderState[i]?.totalPriceAfterDiscount,
        status: orderState[i]?.orderStatus,
      });
    }
    setOrderData(data1);

  }, [orderState]);

  const config = {
    data : dataMonthly,
    xField: 'type',
    yField: 'income',
    shapeField: 'column25D',
    style: {
      fill: 'rgba(126, 212, 236, 0.8)',
    },
  };

  const config2 = {
    data : dataMonthlySales,
    xField: 'type',
    yField: 'sales',
    shapeField: 'column25D',
    style: {
      fill: 'rgba(126, 212, 236, 0.8)',
    },
  };

  return (
    <div>
      <h4 className='mb-4 fs-3 title'>Dashboard</h4>

      <div className='d-flex justify-content-between align-items-center gap-3'>
        <div className='d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3'>
          <div>
            <p className='desc'>Total Income</p>
            <h4 className='mb-0 sub-title'>$ {yearlyDataState && yearlyDataState[0]?.amount}</h4>
          </div>

          <div className='d-flex flex-column align-items-end'>
            <h6 className='green'> <PiArrowLineUpRightLight /></h6>
            <p className='mb-0 desc'>Income in last year</p>
          </div>
        </div>

        <div className='d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3'>
          <div>
            <p className='desc'>Total Sales</p>
            <h4 className='mb-0 sub-title'>{yearlyDataState && yearlyDataState[0]?.count}</h4>
          </div>

          <div className='d-flex flex-column align-items-end'>
            <h6 className='red'> <PiArrowLineDownRightLight /></h6>
            <p className='mb-0 desc'>Sales in last year from today</p>
          </div>
        </div>

        {/* <div className='d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3'>
          <div>
            <p className='desc'>Total orders</p>
            <h4 className='mb-0 sub-title'>2100</h4>
          </div>

          <div className='d-flex flex-column align-items-end'>
            <h6 className='green'> <PiArrowLineUpRightLight /> 30%</h6>
            <p className='mb-0 desc'>Compared to June 2024</p>
          </div>
        </div> */}
      </div>

      <div className='d-flex justify-content-between gap-3'>
        <div className="mt-4 flex-grow-1 w-50">
          <h5 className='mb-5 sub-title'>Income Statics</h5>
          <div>
            <Column {...config} />
          </div>
        </div>

        <div className="mt-4 flex-grow-1 w-50">
          <h5 className='mb-5 sub-title'>Sales Statics</h5>
          <div>
            <Column {...config2} />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h5 className="mb-5 sub-title">Recent Orders</h5>
        <div>
          <Table  columns={columns} dataSource={orderData} />
        </div>
      </div>

    </div>
  )
}

export default Dashboard