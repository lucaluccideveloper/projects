const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field) {
    this.field = field;

    // Posizionare il giocatore in una posizione casuale che non sia un buco né il cappello
    let startX, startY;
    do {
      startX = Math.floor(Math.random() * field[0].length);
      startY = Math.floor(Math.random() * field.length);
    } while (field[startY][startX] === hole || field[startY][startX] === hat);
    
    this.playerPosition = { x: startX, y: startY };
    this.field[startY][startX] = pathCharacter;
  }

  print() {
    let result = '';
    for (let i = 0; i < this.field.length; i++) {
      result += this.field[i].join('') + '\n';
    }
    console.log(result);
  }

  getUserInput() {
    return prompt('Which way would you like to move? (up, down, left, right): ');
  }

  // Aggiungi un carattere * alla posizione del giocatore e stampa il campo
  updateAndPrint() {
    this.field[this.playerPosition.y][this.playerPosition.x] = pathCharacter;
    this.print();
  }

  static generateField(height, width, percentage) {
    const field = []; // Creazione Campo Vuoto

    for (let y = 0; y < height; y++) {   // Creazione del campo vuoto 
      field[y] = [];
      for (let x = 0; x < width; x++) {
        field[y][x] = fieldCharacter;
      }
    }

    // Inserimento buchi 
    const totalCells = height * width;
    const holeCount = Math.floor(totalCells * percentage);

    for (let i = 0; i < holeCount; i++) {
      let holeX, holeY;
      do {
        holeX = Math.floor(Math.random() * width);
        holeY = Math.floor(Math.random() * height);
      } while (field[holeY][holeX] !== fieldCharacter);
      field[holeY][holeX] = hole;
    }

    // Posizionamento del cappello in una posizione casuale
    let hatX, hatY;
    do {
      hatX = Math.floor(Math.random() * width);
      hatY = Math.floor(Math.random() * height);
    } while (field[hatY][hatX] !== fieldCharacter);
    field[hatY][hatX] = hat;

    return field;
  }
}

// Inizializza il campo con la percentuale di buchi specificata dall'utente
const height = 5;
const width = 5;
const percentage = parseFloat(prompt('Enter the percentage of holes (e.g., 0.2 for 20%): '));
const generatedField = Field.generateField(height, width, percentage);
const myField = new Field(generatedField);

myField.print();

// Inizia il gioco
console.log('Welcome to the game!\n');
myField.updateAndPrint();

while (true) {
  const direction = myField.getUserInput().toLowerCase(); // Converte l'input dell'utente in minuscolo per evitare problemi di case sensitivity
  console.log('You chose to move', direction);

  // Determina la direzione del movimento del giocatore in base all'input dell'utente
  if (direction === 'up') {
    // Muovi il giocatore verso l'alto
    if (myField.playerPosition.y > 0 && myField.field[myField.playerPosition.y - 1][myField.playerPosition.x] !== hole) {
      myField.field[myField.playerPosition.y][myField.playerPosition.x] = fieldCharacter; // Rimuove il giocatore dalla posizione attuale
      myField.playerPosition.y--; // Aggiorna la posizione del giocatore
      myField.field[myField.playerPosition.y][myField.playerPosition.x] = pathCharacter; // Posiziona il giocatore nella nuova posizione
    }
  } else if (direction === 'down') {
    // Muovi il giocatore verso il basso
    if (myField.playerPosition.y < myField.field.length - 1 && myField.field[myField.playerPosition.y + 1][myField.playerPosition.x] !== hole) {
      myField.field[myField.playerPosition.y][myField.playerPosition.x] = fieldCharacter; // Rimuove il giocatore dalla posizione attuale
      myField.playerPosition.y++; // Aggiorna la posizione del giocatore
      myField.field[myField.playerPosition.y][myField.playerPosition.x] = pathCharacter; // Posiziona il giocatore nella nuova posizione
    }
  } else if (direction === 'left') {
    // Muovi il giocatore verso sinistra
    if (myField.playerPosition.x > 0 && myField.field[myField.playerPosition.y][myField.playerPosition.x - 1] !== hole) {
      myField.field[myField.playerPosition.y][myField.playerPosition.x] = fieldCharacter; // Rimuove il giocatore dalla posizione attuale
      myField.playerPosition.x--; // Aggiorna la posizione del giocatore
      myField.field[myField.playerPosition.y][myField.playerPosition.x] = pathCharacter; // Posiziona il giocatore nella nuova posizione
    }
  } else if (direction === 'right') {
    // Muovi il giocatore verso destra
    if (myField.playerPosition.x < myField.field[0].length - 1 && myField.field[myField.playerPosition.y][myField.playerPosition.x + 1] !== hole) {
      myField.field[myField.playerPosition.y][myField.playerPosition.x] = fieldCharacter; // Rimuove il giocatore dalla posizione attuale
      myField.playerPosition.x++; // Aggiorna la posizione del giocatore
      myField.field[myField.playerPosition.y][myField.playerPosition.x] = pathCharacter; // Posiziona il giocatore nella nuova posizione
    }
  } else {
    // Messaggio di errore per dire all'utente che l'input non è valido
    console.log('Invalid direction. Please enter up, down, left, or right.');
  }

  // Aggiorna e stampa il campo dopo ogni mossa
  myField.updateAndPrint();
}
