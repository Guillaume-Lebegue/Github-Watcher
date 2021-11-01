import express from 'express';

import config from './config';
import receivedPost from './receivedPost';

const app = express();
app.use(express.json());

app.post('/', receivedPost);

app.all('/*', (_, res) => {
  res.status(404).send('Not Found');
});

app.listen(config.port, () => {
  console.log(`Server is listening on port ${config.port}`);
});