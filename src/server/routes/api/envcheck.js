import store from '../../store';

const envcheck = (req, res) => {
  const data = {
    remoteAddress: req.connection.remoteAddress,
    version: store.get('env.version'),
    environment: store.get('env.environment'),
  };

  res.send(data);
};

export default envcheck;
