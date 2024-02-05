import { VernamCipher } from "./VernamCipherModif.js";
import { ByteConverter } from "./ByteConverter.js";
import * as readlineSync from 'readline-sync';

enum Operation {
  Encrypt = "1",
  Decrypt = "2",
  Exit = "3"
}

class Index {
  static run() {
    let continueLoop = true;

    while (continueLoop) {
      console.log("\nMenú:");
      console.log("1. Cifrar mensaje");
      console.log("2. Descifrar mensaje");
      console.log("3. Salir");

      const choice = readlineSync.question("\nIngrese su opción: ");

      switch (choice) {
        case Operation.Encrypt:
          this.encryptMessage();
          break;
        case Operation.Decrypt:
          this.decryptMessage();
          break;
        case Operation.Exit:
          continueLoop = false;
          console.log("Saliendo del programa...");
          break;
        default:
          console.log("Opción no válida. Por favor, ingrese 1, 2 o 3.");
          break;
      }
    }
  }

  private static generateRandomBinaryKey(length: number) {
    let binaryKey = '';
    for (let i = 0; i < length; i++) {
      // Generar un número aleatorio en el rango de los caracteres ASCII imprimibles (32-126)
      const randomByte = Math.floor(Math.random() * (126 - 32 + 1)) + 32;
      console.log(randomByte)
      binaryKey += randomByte.toString(2).padStart(8, '0'); // Convierte el número aleatorio a binario y lo agrega a la clave binaria
    }
    return binaryKey;
  }
  

  private static convertBinaryToPrintableAscii(binaryKey: string) {
    let printableAsciiKey = '';
    for (let i = 0; i < binaryKey.length; i += 8) {
      const byte = binaryKey.slice(i, i + 8);
      printableAsciiKey += String.fromCharCode(parseInt(byte, 2));
    }
    return printableAsciiKey;
  }  

  private static encryptMessage() {
    const message = readlineSync.question("Ingrese el mensaje original: ");

    if (!message) {
      console.log("El mensaje no puede estar vacío.");
      return;
    }

    const messageBinary = message
      .split('')
      .map(char => {
        const charBinary = ByteConverter.letterToBits(char);
        if (!charBinary) {
          console.log(`Error al convertir el carácter '${char}' a su representación binaria.`);
          process.exit(1);
        }
        return charBinary;
      })
      .join('');

    // Generar una clave aleatoria en binario
    const key = this.generateRandomBinaryKey(messageBinary.length / 8);

    // Convertir la clave a caracteres ASCII imprimibles
    const printableAsciiKey = this.convertBinaryToPrintableAscii(key);

    const encryptedMessage = VernamCipher.encrypt(message, printableAsciiKey);
    if (encryptedMessage) {
      console.log("\nSalida")
      console.log("Mensaje original: ", message)
      console.log("Mensaje original en binario:", messageBinary);
      console.log("Longitud del mensaje binario:", messageBinary?.length);
      console.log("\nClave en binario: ", key);
      console.log("Longitud de la clave en binario: ", key.length);
      console.log("\nClave en ASCII imprimible: ", printableAsciiKey);
      console.log("Longitud de la clave en ASCII imprimible: ", printableAsciiKey.length);


      console.log(`\nMensaje cifrado: ${encryptedMessage}`);
      console.log(`Mensaje cifrado en binario: ${this.convertBinaryToPrintableAscii(encryptedMessage)}`)
    } else {
      console.log("Error al cifrar el mensaje.");
    }
  }

  private static decryptMessage() {
    const encryptedMessage = readlineSync.question("Ingrese el mensaje cifrado: ");

    if (!encryptedMessage) {
      console.log("El mensaje cifrado no puede estar vacío.");
      return;
    }

    const key = readlineSync.question("Ingrese la clave: ");

    if (!key) {
      console.log("La clave no puede estar vacía");
      return;
    }

    const decryptedMessage = VernamCipher.decrypt(encryptedMessage, key);
    if (decryptedMessage) {
      console.log("\nMensaje descifrado:");
      console.log('Mensaje descifrado: ', this.convertBinaryToPrintableAscii(decryptedMessage))
      console.log(`Mensaje descifrado en binario: ${decryptedMessage}`);
    } else {
      console.log("Error al descifrar el mensaje.");
    }
  }
}

Index.run();
