const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Post model
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

//Validation
const validatePostInput = require('../../validation/post');

//@route GET api/posts
//@desc Get Posts
//@access Public
router.get('/', (req, res) => {
	Post.find()
		.sort({ date: -1 })
		.then((posts) => res.json(posts))
		.catch((err) => res.status(404).json({ NoPostFound: 'No posts found' }));
});

//@route GET api/posts/:id
//@desc Get Post by ID
//@access Public
router.get('/:id', (req, res) => {
	Post.findById(req.params.id)
		.then((post) => res.json(post))
		.catch((err) => res.status(404).json({ NoPostFound: 'No post found with that ID' }));
});

//@route POST api/posts
//@desc Create Post
//@access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validatePostInput(req.body);
	//check Validation
	if (!isValid) {
		//Return any errors with 400 status
		return res.status(400).json(errors);
	}

	const newPost = new Post({
		text: req.body.text,
		name: req.body.name,
		avatar: req.body.avatar,
		user: req.user.id
	});

	newPost.save().then((post) => res.json(post));
});

//@route DELETE api/posts/:id
//@desc Delete Post
//@access Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
	try {
		const { id } = req.params;
		const user = req.user.id;

		const post = await Post.findById(id);

		if (post.user.toString() !== user) {
			return res.status(401).json({ notAuthorized: 'User not Authorized' });
		} else {
			await Post.findByIdAndDelete(id, () => {
				res.status(200).json({ msg: 'Post Deleted!' });
			});
		}
	} catch (error) {
		res.status(500).json({ error: error.toString() });
	}
});

//@route POST api/posts/like/:id
//@desc Like Post
//@access Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Profile.findOne({ user: req.user.id }).then((profile) => {
		Post.findById(req.params.id)
			.then((post) => {
				if (post.likes.filter((like) => like.user.toString() === req.user.id).length > 0) {
					return res.status(400).json({ alreadyLiked: 'User already liked this post' });
				}

				//Add user ID to the likes array
				post.likes.unshift({ user: req.user.id });

				post.save().then((post) => res.json(post));
			})
			.catch((err) => res.status(404).json({ postNotFound: 'No post found' }));
	});
});

//@route POST api/posts/unlike/:id
//@desc Unlike Post
//@access Private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Profile.findOne({ user: req.user.id }).then((profile) => {
		Post.findById(req.params.id)
			.then((post) => {
				if (post.likes.filter((like) => like.user.toString() === req.user.id).length === 0) {
					return res.status(400).json({ NotLiked: 'you have not liked this post' });
				}

				//Get remove index
				const removeIndex = post.likes.map((item) => item.user.toString()).indexOf(req.user.id);

				//Splice out of array
				post.likes.splice(removeIndex, 1);

				//Save
				post.save().then((post) => res.json(post));
			})
			.catch((err) => res.status(404).json({ postNotFound: 'No post found' }));
	});
});

//@route POST api/posts/comment/:id
//@desc Add Comment to post
//@access Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validatePostInput(req.body);
	//check Validation
	if (!isValid) {
		//Return any errors with 400 status
		return res.status(400).json(errors);
	}

	Post.findById(req.params.id)
		.then((post) => {
			const newComment = {
				text: req.body.text,
				name: req.body.name,
				avatar: req.body.avatar,
				user: req.user.id
			};

			// Add to comments array
			post.comments.unshift(newComment);

			//Save
			post.save().then((post) => res.json(post));
		})
		.catch((err) => res.status(404).json({ postNotFound: 'No Post Found' }));
});

//@route POST api/posts/comment/:id/:comment_id
//@desc Remove comment from post
//@access Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Post.findById(req.params.id)
		.then((post) => {
			//Check if comment exist
			if (post.comments.filter((comment) => comment._id.toString() === req.params.comment_id).length === 0) {
				return res.status(404).json({ commentNotExists: 'Comment does not Exist' });
			}

			//Get Remove index
			const removeIndex = post.comments.map((item) => item._id.toString()).indexOf(req.params.comment_id);
			//Splice comment out of array
			post.comments.splice(removeIndex, 1);

			post.save().then((post) => res.json(post));
		})
		.catch((err) => res.status(404).json({ postNotFound: 'No Post Found' }));
});

module.exports = router;
