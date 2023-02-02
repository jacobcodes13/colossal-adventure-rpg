// Install readline-sync
const readline = require("readline-sync");

// Greeting the player and storing their name
const name = readline.question("Greetings traveler, what's your name? \n");
console.log("Welcome " + name + "!");

// Asking the player if they want to play the game
if (readline.keyInYN("Do you want to play this game?")) {
  console.log(name + " begins their journey!");
} else {
  console.log("Come back next time!");
}

// Defining variables
const enemies = ["Hob Goblin", "Green Goblin", "Demo Goblin"];
const items = ["Potion", "Critical Attack", "Poison"];
const options = ["Sword", "Run", "Use Item", "Interface"];
let inventory = [];
let playerHP = 50; // Enemy HP is 50
let enemyHP = 5;

// Player starts walking
gameStart = readline.keyIn("Press 'w' to start walking \n", { limit: "$<w>" });
walk();

// Walk function that runs the rest of the code in between actions
// Walk allows you to choose to walk (1/4 chance of running into enemy)
// If you choose to walk player is directed to Monster generator function
function walk() {
  if (Math.random() > 0.25) {
    console.log(name + " finds an enemy and has to FIGHT!");
    allEnemies();
  } else {
    console.log(name + " keeps on walking");
  }
}

// List of all enemies
function allEnemies() {
  // Generator function does a dice role to determine monster that will do combat
  let randomEnemy = Math.floor(Math.random() * enemies.length);

  // Once monster is selected it will be assigned in the combat loop
  if (randomEnemy === 0) {
    console.log(name + " is fighting the Hob Goblin!");
    fight();
  } else if (randomEnemy === 1) {
    console.log(name + " is fighting the Green Goblin!");
    fight();
  } else if (randomEnemy === 2) {
    console.log(name + " is fighting the Demo Goblin!");
    fight();
  }
}

// Player will do battle with assigned monster
function fight() {
  fighting = readline.keyInSelect(options, "What would you like to do?");

  while (playerHP > 0 && enemyHP > 0) {
    // Player chooses sword, then we move them to the sword function
    if (options[fighting] === "Sword") {
      console.log(name + " decides to swing his sword!");
      sword();
      // PLayer can run but will have the chance to take some damage or not run and take full damage
    } else if (options[fighting] === "Run") {
      console.log(name + " decides to run!");
      run();
      // Player can use a item (Potion, Crit Att, or Poison)
    } else if (options[fighting] === "Use Item") {
      console.log(name + " decides to use a item!");
      useItem();
      // Player can check their stats
    } else if (options[fighting] === "Interface") {
      console.log(name + " decides to check their stats!");
      interface();
    }
  }
}

// Sword function to show how much damage a player hits
function sword() {
  let playerDamage = Math.floor(Math.random() * 10);
  let enemyDamage = Math.floor(Math.random() * 10);
  playerHP -= enemyDamage;
  enemyHP -= playerDamage;
  console.log(
    name +
    " hit: " +
    playerDamage +
    "\n" +
    name +
    " HP: " +
    playerHP +
    "\nEnemy hit: " +
    enemyDamage +
    "\nEnemy HP: " +
    enemyHP
  );
}

// Prompt can be accessed in between fights
// Prompt is function that shows player health and items
