const {Router} = require('express');
const router = Router();
const snoowrap = require('../lib/snoowrap');

const DEFAULT_SUBREDDIT_NAME = 'popular';

/**
 * Retrieve the top 50 Post from Reddit.
 */
const getTopPost = async (req, res) => {
  const query = {time: 'all', limit: 50};
  if (req.query && req.query.after) {
    query.after = `${req.query.after}`;
  }
  const response = await snoowrap.getTop(DEFAULT_SUBREDDIT_NAME, query);
  res.send(JSON.stringify(response));
};

router.get('/top', getTopPost);

module.exports = {
  router,
  getTopPost
};
