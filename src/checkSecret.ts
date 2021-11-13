import crypto from 'crypto';
import AppError from './appError';

import { WatchedConfig } from "./config";

export default function (repo: WatchedConfig, body: any, reqSignature: string): void {
  const secret = repo.secret;

  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(body.toString());

  const digest = 'sha256=' + hmac.digest('hex');

  if (digest !== reqSignature) {
    console.log('checkSecret: digest !== reqSignature');
    console.log('digest: ' + digest);
    console.log('reqSignature: ' + reqSignature);
    throw new AppError(`Webhook secret does not match.`, 401);
  }
}