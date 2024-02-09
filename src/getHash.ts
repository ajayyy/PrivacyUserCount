import crypto from 'crypto';

export default (value: any) => {
  let hashCreator = crypto.createHash('md5');
  return hashCreator.update(value).digest('hex');
}
