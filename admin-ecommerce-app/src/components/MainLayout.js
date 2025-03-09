import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Layout, Menu, theme } from 'antd';
import { LuLayoutDashboard } from "react-icons/lu";
import { BsCart4, BsJournalText, BsChatSquareText } from "react-icons/bs";
import { RiMenuUnfold3Line2, RiMenuUnfold4Line2  } from "react-icons/ri";
import { MdAddShoppingCart, MdOutlineCategory,  MdOutlinePlaylistPlay,  MdNotificationsActive } from "react-icons/md";
import { CgUserlane } from "react-icons/cg";
import { GoCodeReview } from "react-icons/go";
import { IoColorPaletteOutline, IoBagAddOutline, IoTicketOutline  } from "react-icons/io5";
import { TbBrandBootstrap, TbLogout2 } from "react-icons/tb";
import { HiOutlineClipboardDocumentList , HiOutlineTicket } from "react-icons/hi2";
import { useNavigate, Outlet, Link } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" >
          <h4 className='text-white fs-5 text-center py-3 mb-0'>
            <span className='sm-logo'>EC</span>
            <span className='lg-logo'>Ecommerce</span>
          </h4>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          onClick= {({ key }) => {
            if( key === 'signout' ) {
              localStorage.clear();
              window.location.reload();
              //navigate('/')
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: '',
              icon: <LuLayoutDashboard className='fs-5' />,
              label: 'Dashboard',
            },
            {
              key: 'customer',
              icon: <CgUserlane className='fs-5' />,
              label: 'Customers',
            },
            {
              key: 'catalog',
              icon: <BsCart4 className='fs-5' />,
              label: 'Catalog',
              children: [
                {
                  key: 'product',
                  icon: <MdAddShoppingCart  className='fs-5' />,
                  label: 'Add Product',
                },
                {
                  key: 'product-list',
                  icon: <MdOutlinePlaylistPlay  className='fs-5' />,
                  label: 'Product List',
                },
                {
                  key: 'brand',
                  icon: <TbBrandBootstrap  className='fs-5' />,
                  label: 'Brand',
                },
                {
                  key: 'list-brand',
                  icon: <MdOutlinePlaylistPlay  className='fs-5' />,
                  label: 'Brand List',
                },
                {
                  key: 'category',
                  icon: <MdOutlineCategory  className='fs-5' />,
                  label: 'Category',
                },
                {
                  key: 'list-category',
                  icon: <MdOutlinePlaylistPlay  className='fs-5' />,
                  label: 'Category List',
                },
                {
                  key: 'color',
                  icon: <IoColorPaletteOutline  className='fs-5' />,
                  label: 'Color',
                },
                {
                  key: 'list-color',
                  icon: <MdOutlinePlaylistPlay  className='fs-5' />,
                  label: 'Color List',
                },
              ]
            },
            {
              key: 'order',
              icon: <IoBagAddOutline className='fs-5' />,
              label: 'Orders',
            },
            {
              key: 'marketing',
              icon: <IoTicketOutline className='fs-5' />,
              label: 'Marketing',
              children: [
                {
                  key: 'coupon',
                  icon: <HiOutlineTicket className='fs-5' />,
                  label: 'Add Coupon',
                },
                {
                  key: 'coupon-list',
                  icon: <MdOutlinePlaylistPlay  className='fs-5' />,
                  label: 'Coupon List',
                },
              ]
            },
            {
              key: 'blog',
              icon: <BsJournalText className='fs-5' />,
              label: 'Blogs',
              children: [
                {
                  key: 'blogs',
                  icon: <BsChatSquareText  className='fs-5' />,
                  label: 'Add Blog',
                },
                {
                  key: 'blog-list',
                  icon: <HiOutlineClipboardDocumentList  className='fs-5' />,
                  label: 'Blog List',
                },
                {
                  key: 'blog-category',
                  icon: <BsChatSquareText  className='fs-5' />,
                  label: 'Add Blog Category',
                },
                {
                  key: 'blog-category-list',
                  icon: <HiOutlineClipboardDocumentList  className='fs-5' />,
                  label: 'Blog Category List',
                },
              ]
            },
            {
              key: 'enquiries',
              icon: <GoCodeReview className='fs-5' />,
              label: 'Enquiries',
            },
            {
              key: 'signout',
              icon: <TbLogout2 className='fs-5' />,
              label: 'Log out',
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header
          className='d-flex justify-content-between align-items-center ps-1 pe-5'
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <RiMenuUnfold3Line2 /> : <RiMenuUnfold4Line2 />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '22px',
              width: 64,
              height: 64,
            }} 
          /> 

          <div className="d-flex gap-5 align-items-center">
            <div className='position-relative'>
              <MdNotificationsActive className='fs-4' />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">3</span>  
            </div>
            <div className='d-flex gap-3 align-items-center' role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              <div>
                <img src="/images/admin.png" className='' alt="" width='40px' />
              </div>

              <div>
                <h5 className='text-dark mb-0'>Admin</h5>
                <p className='mb-0'>admin@gmail.com</p>
              </div>

              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                {/* <li><Link className="dropdown-item py-1 mb-1" style={{"height" : "auto", "lineHeight" : "20px"}} to=''>View Profile</Link></li>
                <li><Link className="dropdown-item py-1 mb-1" style={{"height" : "auto", "lineHeight" : "20px"}} to=''>Signout</Link></li> */}
              </div>
            </div>
          </div>
        </Header>

        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <ToastContainer 
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;