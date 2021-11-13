import express from 'express';

import config from './config';
import receivedPost from './receivedPost';

const app = express();
app.use(express.json({ verify: (req, _, buf, encoding) => {
    if (buf && buf.length) {
      req.rawBody = buf.toString(encoding as BufferEncoding || 'utf8');
    }
  },}));

app.post('/', receivedPost);

app.all('/*', (_, res) => {
  res.status(404).send('Not Found');
});

app.listen(config.port, () => {
  console.log(`Server is listening on port ${config.port}`);
});