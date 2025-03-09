const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;

const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute");
const blogRoute = require("./routes/blogRoute");
const categoryRoute = require("./routes/categoryRoute");
const blogCategoryRoute = require("./routes/blogCateRoute");
const brandRoute = require("./routes/brandRoute");
const couponRoute = require("./routes/couponRoute");
const colorRoute = require("./routes/colorRoute");
const enquiryRoute = require("./routes/enquiryRoute");
const uploadRoute = require("./routes/uploadRoute");
const paymentRoute = require("./routes/paymentRoute");


const bodyParser = require('body-parser');
const { notFound , errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require('cors');

dbConnect();

app.use(morgan('dev'));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser());

app.use('/api/user', authRoute);
app.use('/api/product', productRoute);
app.use('/api/blog', blogRoute);
app.use('/api/category', categoryRoute);
app.use('/api/blogCategory', blogCategoryRoute);
app.use('/api/brand', brandRoute);
app.use('/api/coupon', couponRoute);
app.use('/api/color', colorRoute);
app.use('/api/enquiry', enquiryRoute);
app.use('/api/upload', uploadRoute);
app.use('/api/payment', paymentRoute); 


app.use(notFound);
app.use(errorHandler);

// console.log('Client ID: ', process.env.CLIENT_ID); 


app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
}); 

