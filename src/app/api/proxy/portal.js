import request from 'app/api/request';

const fetchMetadata = (options) => {
  return request
    .post('/proxy/api/portal/metadata/v1.0')
    .send()
    .then(res => {
      return Promise.resolve(res);
    });
};

export {
  fetchMetadata,
};
