import crypto from 'crypto';
import config from '@config/index';
import { IEncrypt } from '@interfaces/IEncrypt';

export const encrypt = (text: string): string => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    config.crypto.algorithm,
    config.crypto.secretKey,
    iv,
  );
  const encrypted = Buffer.concat([ cipher.update(text), cipher.final() ]);
  const data: IEncrypt = {
    iv      : iv.toString('hex'),
    content : encrypted.toString('hex'),
  };
  const encryptToBase64 = Buffer.from(JSON.stringify(data)).toString('base64');
  return encryptToBase64;
};

export const decrypt = (hash: string): string => {
  const base64ToString = Buffer.from(hash, 'base64').toString('ascii');
  const data: IEncrypt = JSON.parse(base64ToString);
  const decipher = crypto.createDecipheriv(
    config.crypto.algorithm,
    config.crypto.secretKey,
    Buffer.from(data.iv, 'hex'),
  );
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(data.content, 'hex')),
    decipher.final(),
  ]);
  return decrypted.toString();
};
