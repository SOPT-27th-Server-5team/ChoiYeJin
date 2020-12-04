const { Post, User, Like } = require('../models');
const ut = require('../modules/util');
const sc = require('../modules/statusCode');
const rm = require('../modules/responseMessage');
const { DELETE_LIKE_SUCCESS, DELETE_LIKE_FAIL } = require('../modules/responseMessage');

module.exports = {
    /* 
        body: title, contents, userId
    */
   createPost: async (req, res) => {
       const {title, contents, userId } = req.body;
       try {
           const user = await User.findOne({ where: {id: userId}});
            const post = await Post.create({title, contents});
            await user.addPost(post);
            return res.status(sc.OK).send(ut.success(sc.OK, rm.CREATE_POST_SUCCESS, post));
        } catch(err) {
            console.log(err);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.CREATE_POST_FAIL));
        }        
    },
    readAllPosts: async (req, res) => {
        try {
            const posts = await Post.findAll({})
            console.log(JSON.stringify(posts, null, 2));
            return res.status(sc.OK).send(ut.success(sc.OK, rm.READ_POST_ALL_SUCCESS, posts));
        }catch (err) {
            console.log(err);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.READ_POST_ALL_FAIL));
        }
    },

    readPosts: async (req, res) => {
        try{
            const posts = await Post.findAll({
                include: [{
                    model: User, //작성자
                    attributes: ['email', 'userName']
                }, {
                    model: User, //좋아요 누른 사람
                    as: 'Liker',
                    attributes: {exclude: ['password', 'salt']}
                }]
            });
            return res.status(sc.OK).send(ut.success(sc.OK, "전체 게시물 조회 성공", posts));
        } catch(err) {
            console.log(err);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(ut.fail, "전체 게시글 조회 실패"));
        }
    },

    createLike: async (req, res) => {
        const PostId = req.params.postId; 
        const UserId = req.body.userId;
        try {
            const like = await Like.create({ PostId, UserId });
            return res.status(sc.OK).send(ut.success(sc.OK, rm.CREATE_LIKE_SUCCESS, like));
        } catch(err) {
            console.log(err);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.CREATE_LIKE_FAIL));
        }

    },

    deleteLike: async (req, res) => {
        const PostId = req.params.postId;
        const UserId = req.body.userId;
        try {
            Like.destroy({ where: {
                postId: PostId,
                userId: UserId,
            }});
            return res.status(sc.OK).send(ut.success(sc.OK, rm.DELETE_LIKE_SUCCESS));
        } catch (err) {
            console.log(err);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.DELETE_LIKE_FAIL));
        }
    }
    
    // 좋아요 생성, 삭제 한개로 만들기
    // manageLike: async (req, res) => {
    //     const PostId = req.params.postId; 
    //     const UserId = req.body.userId;
    //     try {
    //         const like = await Like.findOne({PostId, UserId});
    //         if (like) {
    //             await like.destroy({ PostId, UserId });
    //             return res.status(sc.OK).send(ut.success(sc.OK, "좋아요 취소", like));
    //         } else {
    //             const new_like = await Like.create({ PostId, UserId });
    //             return res.status(sc.OK).send(ut.success(sc.OK, "좋아요 생성", new_like));
    //         }
    //     } catch(err) {
    //         console.log(err);
    //         return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, "좋아요 실패"));
    //     }
    // },
}