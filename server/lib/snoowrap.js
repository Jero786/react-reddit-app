const snoowrap = require('snoowrap');

const singleton = new snoowrap({
  userAgent: process.env.SNOOWRAP_USER_AGEN,
  clientId: process.env.SNOOWRAP_CLIENT_ID,
  clientSecret: process.env.SNOOWRAP_CLIENT_SECRET,
  username: process.env.SNOOWRAP_USERNAME,
  password: process.env.SNOOWRAP_PASSWORD,
});

module.exports = singleton;
