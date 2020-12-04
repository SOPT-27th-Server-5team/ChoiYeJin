const express = require('express');
const router = express.Router();
const postController = require('../../controller/postController');
const upload = require("../../modules/multer");

/* [POST] localhost:3000/posts */
router.post('/', upload.single("image"),postController.createPost);

/* [GET] localhost: 3000/posts */
router.get('/', postController.readPosts);

/* [POST] localhost:3000/posts/:postID/like */
router.post('/:postId/like', postController.manageLike);

module.exports = router;
