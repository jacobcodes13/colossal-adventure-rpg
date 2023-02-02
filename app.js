// Install readline-sync
const readline = require("readline-sync");

// Greeting the player and storing their name
const name = readline.question("Greetings traveler, what's your name? \n");
console.log("Welcome " + name + "!");

// Asking the player if they want to play the game
if (readline.keyInYN("Do you want to play this game?")) {
  console.log(`\n${name} begins their journey!`);
} else {
  console.log("Come back next time!");
}


// Defining variables
const enemies = ["Hob Goblin", "Green Goblin", "Demo Goblin"];
const items = ["Potion", "Damage By Poison"]
let inventory = [];
let playerHP = 50; // Enemy HP is 50
let enemyHP = 20;


// All players and enemies defined
function Player(name) {
  this.name = name
  this.hp = playerHP
  this.items = inventory
}
let playerStats = new Player(name);


// While player is alive press "w" to walk or "i" to check stats
while (playerStats.hp > 0) {
  const walkOption = readline.keyIn("Would you like to 'w'alk or 'c'heck stats?\n", {limit: '$<wc>'});
  enemyHP = 20;

  if (walkOption === "w") {
    walk();

  } else if (walkOption === "c") {
    interface();
  }

  if (playerStats.hp <= 0) {
    console.log(name + " is DEAD!");
  }
}


// Create an interface that shows the players stats (Name, HP, and items)
function interface() {
  console.log(`\nName: ${playerStats.name} \nHP: ${playerStats.hp} \nInventory: ${playerStats.items}\n`);
}

function walk() {
  let enemyChance = Math.floor((Math.random() * 4) + 1) ;

  console.log("\nIf enemy chance equals 4 then you find an enemy!");
  console.log(`Chance: ${enemyChance}\n`);

  // Player walks and has a 1/4 chance of running into a enemy
  if (enemyChance === 4) {
    console.log(name + " finds an enemy and has to FIGHT!");
    allEnemies();
  }
}


// List of all enemies
function allEnemies() {
  // Generator function does a dice role to determine monster that will do combat
  const randomEnemy = enemies[Math.floor(Math.random() * (enemies.length))];
  // Once monster is selected it will be assigned in the combat loop
  console.log(`\n${name} ran into a ${randomEnemy}, what do you want to do?`);
  // Chance to fight or run
  let fightOption = readline.keyIn("\nWould you like to 'f'ight, or 'r'un?\n", {limit: '$<fr>'})

  if (fightOption === "f") {
    fight();

  } else if (fightOption === "r") {
    run();
  }
}


// Player will do battle with assigned monster
function fight() {
  // let enemyHP = 5;

  console.log(`${name} chooses to fight!`)

  while (enemyHP > 0 && playerStats.hp > 0) {
    let index = readline.keyIn("\nWould you like to use your 's'word, 'r'un away or 'u'se an item?\n", {limit: '$<sruc>'});
    // console.log('enemyHP at top of while loop', enemyHP)

    // Player chooses sword, then we move them to the sword function
    if (index === "s") {
      console.log(name + " decides to swing his sword!");
      sword();

      // PLayer can run but will have the chance to take some damage or not run and take full damage
    } else if (index === "r") {
      console.log(name + " decides to run!");
      run();

      // Player can use a item (Potion, Crit Att, or Poison)
    } else if (index === "u") {

      if (playerHP.items === []) {
        console.log(`${playerStats.name} doesn't have any items...`)

      } else {
        console.log(name + " decides to use a item!");
        useItem();
      }

    }
  }
}


// Sword function to show how much damage a player hits
function sword() {
  // Calculation of damage from the player and enemy
  let playerDamage = Math.floor(Math.random() * 10);
  let enemyDamage = Math.floor(Math.random() * 10);

  playerStats.hp -= enemyDamage;
  enemyHP -= playerDamage;

  // Logs their stats after each hit
  console.log(`\n${playerStats.name} has ${playerStats.hp} HP and did ${playerDamage} damage!\nEnemy has ${enemyHP} HP and did ${enemyDamage} damage!`);
  
  if (enemyHP <= 0) {
    console.log("Enemy is DEAD!\n");
    reward();
  }
}


// Choose a reward (Potion, Crit Attack or Damage by poison)
function reward() {
  const getReward = readline.keyIn("Would you like 'p'otion or 'd'amage by poison?\n", {limit: '$<pd>'});

  if (getReward === "p") {
    console.log(`${playerStats.name} chooses Potion\n`);

    inventory.push("Potion");

  } else if (getReward === "d") {
    console.log(`${playerStats.name} chooses Damage By Poison`);
    console.log(`Enemy has ${enemyHP} HP left!`)

    inventory.push("Damage By Poison");
  }
}


// Option to run from a fight when you are seriously hurt
function run() {
  if (Math.random() >= 0.5) {
    let runDamage = Math.floor(Math.random() * 5);
    // let runHP = playerStats.hp - runDamage;
    console.log(`\n${playerStats.name} decides to run and takes ${runDamage} damage!\n`);
    walk();

    if (playerStats.hp <= 0) {
      console.log(playerStats.name + " is DEAD!");
    }

  } else {
    let enemyDamage = Math.floor(Math.random() * 10);
    console.log(playerStats.name + " can't run and takes " + enemyDamage + " damage!");
    fight();

    if (playerStats.hp <= 0) {
      console.log(playerStats.name + " is DEAD!");
    }
  }
}


// Need to give the player HP and an item if they kill the enemy / After they will continue walking
function useItem() {
  let useReward = readline.keyIn("\nUse 'p'otion or 'd'amage by poison\n", {limit: '$<pd>'});

  if (useReward === "p") {
    let itemPotion = items[0]
    console.log(itemPotion)
    potion();

  } else if (useReward === "d") {
    let itemPoison = items[1]
    console.log(itemPoison)
    poison();
  }
}

// Allows 5 HP to be added to your health
function potion() {
  let bonusHealth = 5;
  playerStats.hp += bonusHealth;

  console.log(`\n${playerStats.name} uses Potion and is awarded 5 HP!\n${playerStats.name} has ${playerStats.hp} HP!`);
}


// Enemy takes 5 damage
function poison() {
  let poison = 5;
  enemyHP -= poison; // Also need to get the current HP of the enemy

  console.log(playerStats.name + " uses Damage By Poison on the enemy, they take 5 damage!");
}