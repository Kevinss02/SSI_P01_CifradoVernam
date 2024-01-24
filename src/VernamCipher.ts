import { ByteConverter } from './ByteConverter.js';

export class VernamCipher {
  static encrypt(message: string, key: string): string | null {
    let messageBit: string = '';
    let keyBit: string = '';

    for (let i = 0; i < message.length; i++) {
      messageBit += ByteConverter.letterToBits(message[i]) || '';
    }

    if (!ByteConverter.isValidBinaryString(key)) {
      for (let i = 0; i < key.length; i++) {
        keyBit += ByteConverter.letterToBits(key[i]) || '';
      }
    } else {
      keyBit = key;
    }

    if (messageBit.length !== keyBit.length) {
      console.error('Message and key lengths must be the same.');
      return null;
    }

    let encryptedBinary = '';
    for (let i = 0; i < messageBit.length; i += 8) {
      const messageSegment = messageBit.slice(i, i + 8);
      const keySegment = keyBit.slice(i, i + 8);
      const encryptedSegment = (
        parseInt(messageSegment, 2) ^ parseInt(keySegment, 2)
      )
        .toString(2)
        .padStart(8, '0');
      encryptedBinary += encryptedSegment;
    }

    const encryptedBitVector = ByteConverter.splitBinaryIntoBytes(encryptedBinary);

    if (!encryptedBitVector) {
      return null;
    }

    let encryptedMessage = '';
    for (let i = 0; i < encryptedBitVector.length; i++) {
      encryptedMessage += ByteConverter.bitsToLetter(encryptedBitVector[i]);
    }

    return encryptedMessage;
  }

  static decrypt(encryptedMessage: string, key: string): string | null {
    return this.encrypt(encryptedMessage, key);
  }
}
