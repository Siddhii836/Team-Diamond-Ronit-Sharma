import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'default_key_must_be_32_characters_';
const HMAC_SECRET = process.env.HMAC_SECRET || 'default_hmac_secret';
const IV_LENGTH = 16;

export const encrypt = (text: string): string => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
};

export const decrypt = (text: string): string => {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift()!, 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

export const signTransaction = (data: any): string => {
  return crypto.createHmac('sha256', HMAC_SECRET)
    .update(JSON.stringify(data))
    .digest('hex');
};

export const hashKYC = (id: string, salt: string): string => {
  return crypto.createHash('sha256')
    .update(id + salt)
    .digest('hex');
};
