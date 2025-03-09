import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import MainLayout from './components/MainLayout';

import Enquiries from './pages/Enquiries';
import BlogList from './pages/BlogList';
import BlogCateList from './pages/BlogCateList';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import ProductList from './pages/ProductList';
import BrandList from './pages/BrandList';
import CategoryList from './pages/CategoryList';
import ColorList from './pages/ColorList';
import CouponList from './pages/CouponList';
import ViewEnquiry from './pages/ViewEnquiry';
import ViewOrder from './pages/ViewOrder';

import AddBlog from './pages/AddBlog';
import AddBlogCate from './pages/AddBlogCate';
import AddColor from './pages/AddColor';
import AddProduct from './pages/AddProduct';
import AddBrand from './pages/AddBrand';
import AddCategory from './pages/AddCategory';
import AddCoupon from './pages/AddCoupon';
import { PrivateRoutes } from './routing/PrivateRoutes';
import { OpenRoutes } from './routing/OpenRoutes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<OpenRoutes><Login /></OpenRoutes>} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/admin' element={<PrivateRoutes><MainLayout /></PrivateRoutes>} >
          <Route index element={<Dashboard />} />
          <Route path='enquiries' element={<Enquiries />} />
          <Route path='enquiries/:id' element={<ViewEnquiry />} />

          <Route path='order' element={<Orders />} />
          <Route path='order/:id' element={<ViewOrder />} />

          <Route path='customer' element={<Customers />} />

          <Route path='blogs' element={<AddBlog />} />
          <Route path='blog/:id' element={<AddBlog />} />
          <Route path='blog-list' element={<BlogList />} />
          <Route path='blog-category' element={<AddBlogCate />} />
          <Route path='blog-category/:id' element={<AddBlogCate />} />
          <Route path='blog-category-list' element={<BlogCateList />} />

          <Route path='product' element={<AddProduct />} />
          <Route path='product/:id' element={<AddProduct />} />
          <Route path='product-list' element={<ProductList />} />

          <Route path='brand' element={<AddBrand />} />
          <Route path='brand/:id' element={<AddBrand />} />
          <Route path='list-brand' element={<BrandList />} />

          <Route path='category' element={<AddCategory />} />
          <Route path='category/:id' element={<AddCategory />} />
          <Route path='list-category' element={<CategoryList />} />

          <Route path='color' element={<AddColor />} />
          <Route path='color/:id' element={<AddColor />} />
          <Route path='list-color' element={<ColorList />} />

          <Route path='coupon' element={<AddCoupon />} />
          <Route path='coupon/:id' element={<AddCoupon />} />
          <Route path='coupon-list' element={<CouponList />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
