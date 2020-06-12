import request from 'app/api/request';

const signin = (options) => {
  const { username, password } = { ...options };
  const payload = {
    username,
    password,
  };

  return request
    .post('/proxy/api/auth/login/v1.0')
    .send(payload)
    .then(res => {
      return Promise.resolve(res);
    });
};

export {
  signin,
};
