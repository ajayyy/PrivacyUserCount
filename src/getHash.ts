import crypto from 'crypto';

export default (value: any) => {
  let hashCreator = crypto.createHash('sha256');
  return hashCreator.update(value).digest('hex');
}
