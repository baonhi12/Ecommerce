const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Đảm bảo thư mục tồn tại
const ensureDirectoryExistence = (filePath) => {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    fs.mkdirSync(dirname, { recursive: true });
};

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        // let folder = 'images'; // Default folder
        // if (file.fieldname === 'productImage') {
        //     folder = 'products';
        // } else if (file.fieldname === 'blogImage') {
        //     folder = 'blogs';
        // }
        // cb(null, path.join(__dirname, `../public/images/${folder}/`));

        cb(null, path.join(__dirname, "../public/images"));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + ".jpeg");
    }
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    }
    else {
        cb({
            message: "Unsupported file format"
        }, false)
    }
}

const uploadPhoto = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: { fieldSize: 2000000 },
});

const productImgResize = async (req, res, next) => {
    if (!req.files) return next();
    req.body.images = [];
    await Promise.all(
        req.files.map(async file => {
            // if (file.fieldname !== 'productImage') return;

            const ext = file.mimetype.split('/')[1]; // Đảm bảo phần mở rộng được lấy chính xác
            const filename = `product-${Date.now()}.${ext}`;
            const filePath = path.join(`public/images/products/${file.filename}`);
            
            // Đảm bảo thư mục tồn tại
            ensureDirectoryExistence(filePath);
            
            await sharp(file.path)
                .resize(500, 500)
                .toFormat('jpeg')
                .jpeg({ quality: 90 })
                .toFile(filePath);

            req.body.images.push(filename);
            // fs.unlinkSync(`public/images/products/${file.filename}`);
        })
    );
    next();
};

const blogImgResize = async (req, res, next) => {
    if (!req.files) return next();

    req.body.images = [];
    await Promise.all(
        req.files.map(async file => {
            // if (file.fieldname !== 'blogImage') return;

            const ext = file.mimetype.split('/')[1]; // Đảm bảo phần mở rộng được lấy chính xác
            const filename = `blog-${Date.now()}.${ext}`;
            const filePath = path.join(`public/images/blogs/${file.filename}`);
            
            // Đảm bảo thư mục tồn tại
            ensureDirectoryExistence(filePath);
            
            await sharp(file.path)
                .resize(500, 500)
                .toFormat('jpeg')
                .jpeg({ quality: 90 })
                .toFile(filePath);

            req.body.images.push(filename);
        })
    );
    next();
};

// const productImgResize = async (req, res, next) => {
//     if (!req.files) return next();    
//     await Promise.all(
//         req.files.map(async (file) => {
//             await sharp(file.path)
//             .resize(300, 300)
//             .toFormat("jpeg")
//             .jpeg({ quality: 90 })
//             .toFile(`/public/images/products/${file.filename}`);
//             fs.unlinkSync(`/public/images/products/${file.filename}`);
//         })
//     );
//     next();
// };
  
// const blogImgResize = async (req, res, next) => {
//     if (!req.files) return next();
//     await Promise.all(
//         req.files.map(async (file) => {
//             await sharp(file.path)
//             .resize(300, 300)
//             .toFormat("jpeg")
//             .jpeg({ quality: 90 })
//             .toFile(`/public/images/blogs/${file.filename}`);
//             fs.unlinkSync(`/public/images/blogs/${file.filename}`);
//         })
//     );
//     next();
// };

module.exports = { 
    uploadPhoto ,  
    productImgResize ,
    blogImgResize,
};