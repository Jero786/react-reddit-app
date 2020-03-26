const snoowrap = require('../lib/snoowrap');
const {getTopPost} = require('./index');
const {buildReq, buildRes} = require('../test/utils/generate');

jest.mock('../lib/snoowrap');
jest.mock('snoowrap');

beforeEach(() => {
  jest.clearAllMocks();
});

test('Reddit API should response properly without pagination', async () => {
  const send = jest.fn();
  const postResult = [{name: 'brisa'}];
  const req = buildReq();
  const res = buildRes({send});
  snoowrap.getTop.mockResolvedValueOnce(postResult);
  
  await getTopPost(req, res);
  
  expect(res.send).toHaveBeenCalledWith(JSON.stringify(postResult));
});

test('Reddit API should response properly with pagination', async () => {
  const send = jest.fn();
  const postResult = [{name: 'brisa'}];
  const req = buildReq({query: {after: '123'}});
  const res = buildRes({send});
  snoowrap.getTop.mockResolvedValueOnce(postResult);
  
  await getTopPost(req, res);
  
  expect(res.send).toHaveBeenCalledWith(JSON.stringify(postResult));
});