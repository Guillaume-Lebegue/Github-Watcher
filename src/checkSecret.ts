import crypto from 'crypto';
import AppError from './appError';

import { WatchedConfig } from "./config";

export default function (repo: WatchedConfig, body: any, reqSignature: string): void {
  const secret = repo.secret;

  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(body.toString('utf8'));

  const digest = Buffer.from('sha256=' + hmac.digest('hex'), 'utf8');
  const signature = Buffer.from(reqSignature, 'utf8');

  if (digest.length !== signature.length || !crypto.timingSafeEqual(digest, signature)) {
    console.log('checkSecret: digest !== signature');
    console.log('digest: ' + digest);
    console.log('Signat: ' + signature);
    throw new AppError(`Webhook secret does not match.`, 401);
  }
}