export class ByteConverter {
  private static readonly MIN_ASCII = 32; // Código ASCII mínimo para caracteres imprimibles
  private static readonly MAX_ASCII = 126; // Código ASCII máximo para caracteres imprimibles

  private static isValidAscii(charCode: number): boolean {
    return (
      charCode >= ByteConverter.MIN_ASCII && charCode <= ByteConverter.MAX_ASCII
    );
  }

  private static readonly BYTE_SIZE = 8;

  static isValidBinaryString(binaryString: string): boolean {
    const isValidChar = (char: string) => char === '0' || char === '1';

    return (
      binaryString.length % ByteConverter.BYTE_SIZE === 0 &&
      [...binaryString].every(isValidChar)
    );
  }

  static letterToByte(letter: string): number | null {
    if (letter.length !== 1) {
      console.error('Input should be a single character.');
      return null;
    }

    const charCode = letter.charCodeAt(0);

    if (ByteConverter.isValidAscii(charCode)) {
      return charCode;
    } else {
      console.error('Input should be a printable ASCII character.');
      return null;
    }
  }

  static byteToLetter(byteValue: number): string | null {
    if (
      byteValue >= 0 &&
      byteValue <= 255 &&
      ByteConverter.isValidAscii(byteValue)
    ) {
      return String.fromCharCode(byteValue);
    } else {
      console.error(
        'Input should be a valid byte representing a printable ASCII character.',
      );
      return null;
    }
  }

  static letterToBits(letter: string): string | null {
    const byteValue = ByteConverter.letterToByte(letter);

    if (byteValue !== null) {
        return byteValue.toString(2).padStart(this.BYTE_SIZE, '0');
    } else {
        return null;
    }
}


  static bitsToLetter(bits: string): string | null {
    if (!ByteConverter.isValidBinaryString(bits)) {
      console.error('Input should be a valid binary string.');
      return null;
    }

    const bytes = ByteConverter.splitBinaryIntoBytes(bits);
    if (!bytes) {
      console.error('Error splitting binary string into bytes.');
      return null;
    }

    let result = '';
    for (const byte of bytes) {
      const intValue = parseInt(byte, 2);
      if (isNaN(intValue) || intValue < 0 || intValue > 255) {
        console.error('Invalid byte value:', byte);
        return null;
      }

      result += String.fromCharCode(intValue);
    }

    return result;
  }

  static splitBinaryIntoBytes(binaryString: string): string[] | null {
    if (!ByteConverter.isValidBinaryString(binaryString)) {
      console.error('Invalid binary string.');
      return null;
    }

    const bytes: string[] = [];

    for (let i = 0; i < binaryString.length; i += ByteConverter.BYTE_SIZE) {
      const byte = binaryString.slice(i, i + ByteConverter.BYTE_SIZE);
      bytes.push(byte);
    }

    return bytes;
  }
}
