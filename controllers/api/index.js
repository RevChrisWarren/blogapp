const router = require('express').Router();

const userRoutes = require('./user-routes.js');

const postRoutes = require('./post-routes.js');

const commentRoutes = require('./comment-routes.js');

const withAuth = require('../../utils/auth');


router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;