import { RequestHandler } from 'express';
import AppError from './appError';
import checkSecret from './checkSecret';
import doUpdate from './doUpdate';
import GithuPayload from './githuPayload';
import isKnown from './isKnown';

const receivedPost: RequestHandler = async (req, res) => {
  try {
    const payload: GithuPayload = req.body;
    const signature = req.header('X-Hub-Signature-256');

    if (!signature) {
      throw new AppError('No signature', 400);
    }
    if (Array.isArray(signature)) {
      throw new AppError('Multiple signatures', 400);
    }

    const repo = isKnown(payload);
    checkSecret(repo, req.rawBody, signature);
    await doUpdate(repo);
    res.send('ok');
  } catch (e)
  {
    if (e instanceof AppError) {
      res.status(e.status).send(e.message);
      console.error(e);
    } else {
      console.log('not catched error: ', e);
      res.status(500).send('Internal server error');
    }
  }
};

export default receivedPost;