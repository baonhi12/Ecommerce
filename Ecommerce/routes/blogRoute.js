const express = require('express');
const { 
    createBlog, 
    updateBlog, 
    getBlog, 
    getAllBlogs,
    deleteBlog,
    likeBlog,
    dislikeBlog, 
    uploadImages, 
} = require('../controller/blogCtrl');

const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const { uploadPhoto, blogImgResize } = require('../middlewares/uploadImage');
const router = express.Router();

router.post('/', authMiddleware, isAdmin, createBlog);

router.put(
    '/upload/:id', 
    authMiddleware, 
    isAdmin, 
    uploadPhoto.array('images', 2), 
    // uploadPhoto.array('blogImage', 2), 
    blogImgResize, 
    uploadImages,
);

router.put('/:id', authMiddleware, isAdmin, updateBlog);
router.put('/likes/:id', authMiddleware, likeBlog);
router.put('/dislikes/:id', authMiddleware, dislikeBlog);

router.get('/:id', getBlog);
router.get('/', getAllBlogs);
router.delete('/:id', authMiddleware, isAdmin, deleteBlog);

module.exports = router;