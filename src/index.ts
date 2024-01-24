import { VernamCipher } from "./VernamCipher.js";
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

  private static encryptMessage() {
    const message = readlineSync.question("Ingrese el mensaje original: ");

    if (!message) {
      console.log("El mensaje no puede estar vacío.");
      return;
    }

    const key = readlineSync.question("Ingrese la clave: ");

    if (!key) {
      console.log("La clave no puede estar vacía");
      return;
    }

    const encryptedMessage = VernamCipher.encrypt(message, key);
    if (encryptedMessage) {
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

      console.log("\nSalida")
      console.log("Mensaje original: ", message)
      console.log("Mensaje original en binario:", messageBinary);
      console.log("Longitud del mensaje binario:", messageBinary?.length);
      console.log("\nClave: ", key);
      console.log("Longitud de la clave: ", key.length);

      const encryptedMessageBinary = encryptedMessage
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
      console.log(`\nMensaje cifrado: ${encryptedMessage}`);
      console.log(`Mensaje cifrado en binario: ${encryptedMessageBinary}`)
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
      console.log(`Mensaje descifrado: ${decryptedMessage}`);
    } else {
      console.log("Error al descifrar el mensaje.");
    }
  }
}

Index.run();