import crypto from 'crypto';

export default (length = 48) => {
    return crypto.randomBytes(length).toString("hex");
}