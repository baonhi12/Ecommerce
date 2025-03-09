import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAProduct, getProducts, resetState } from '../features/product/productSlice';
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
      title: 'Brand',
      dataIndex: 'brand',
      sorter: (a, b) => a.brand.length - b.brand.length,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      sorter: (a, b) => a.category.length - b.category.length,
    },
    // {
    //   title: 'Color',
    //   dataIndex: 'color',
    //   render: (colors) => (
    //     <>
    //       {colors.map((col, index) => (
    //         <span
    //           key={index}
    //           style={{
    //             display: 'inline-block',
    //             width: '20px',
    //             height: '20px',
    //             backgroundColor: col, // Make sure `col` is a valid color
    //             marginRight: '5px',
    //             borderRadius: '50%',
    //             border: 'none',
    //           }}
    //         ></span>
    //       ))}
    //     </>
    //   ),
    // },    
    {
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Price ($)',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
    
  ];

const ProductList = () => {
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setProductId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getProducts());
  }, []); 

  const productState = useSelector((state) => state.product.products);
  console.log(productState);
  
  const data1 = [];
  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: i + 1,
      title: productState[i].title,
      description: productState[i].description,
      brand: productState[i].brand,
      category: productState[i].category,
      color: productState[i].color,
      price: `${productState[i].price}`,
      quantity: productState[i].quantity,
      tags: productState[i].tags,
      action: <>
        <Link className='fs-5 text-dark' to={`/admin/product/${productState[i]._id}`} ><FaRegEdit/></Link>
        <button className='ms-3 fs-5 text-dark bg-transparent border-0' onClick={() => showModal(productState[i]._id)} ><MdOutlineDelete /></button>
      </>
    });
  }

  const deleteProduct = (e) => {
    dispatch(deleteAProduct(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getProducts());
    }, 100)
  };

  return (
    <div>
        <h3 className="mb-4 title">Products List</h3>
        <div>
          <Table  columns={columns} dataSource={data1} />
        </div>

        <CustomModal 
          hideModal={hideModal} 
          open={open}
          performAction={() => {
            deleteProduct(productId);
          }}
          title="Are you sure you want to delete this product???" 
        />
    </div>
  )
}

export default ProductList