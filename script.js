let xp = 0; //Experience points start at 0(open var can change in a function)
let health = 100; //Health start at 100(open var can change in a function)
let gold = 50; //Gold money starts at 50(open var can change in a function)
let currentWeapon = 0; //currentWeapon is a open var that starts at first weapon in array which is a stick lol
let fighting; //Open var for fighting function
let monsterHealth; //The monster your fighting health
let inventory = ["stick"];//The "currentWeapon" that starts at 0 and inventory holder. Have to push more weapons into it at some point

const button1 = document.querySelector('#button1'); //A var that selects id of button1 element
const button2 = document.querySelector("#button2");//A var that selects id of button2 element
const button3 = document.querySelector("#button3");//A var that selects id of button3 element
const text = document.querySelector("#text");//A var that selects body text for the game
const xpText = document.querySelector("#xpText");//A var that selects experience points Text thats tied to the open var xp***
const healthText = document.querySelector("#healthText");//A var that selects health text thats tied to the open var health***
const goldText = document.querySelector("#goldText");//A var that selects gold text thats tied to the open var gold***
const monsterStats = document.querySelector("#monsterStats");//A var that selects monsterstats id***
const monsterName = document.querySelector("#monsterName");//A var that selects monstername id***
const monsterHealthText = document.querySelector("#monsterHealth");//A var that selects monsterHealth text id***

//weapons is an object that holds in arrays: weapon name and power
const weapons = [
    { name: 'stick', power: 5 },
    { name: 'dagger', power: 30 },
    { name: 'claw hammer', power: 50 },
    { name: 'sword', power: 100 }
];
//monsters is an array that holds info in objects: monster name, attack power level and the monsters' health
const monsters = [
    {
        name: "slime",
        level: 2,
        health: 15
    },
    {
        name: "fanged beast",
        level: 8,
        health: 60
    },
    {
        name: "dragon",
        level: 20,
        health: 300
    }
]
//locations is an array that holds info in objects: location name, button functions with corresponding text and what to change the body text
const locations = [
    {
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the town square. You see a sign that says \"Store\"."
    },
    {
        name: "store",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You enter the store."
    },
    {
        name: "cave",
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "You enter the cave. You see some monsters."
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting a monster."
    },
    {
        name: "kill monster",
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        "button functions": [goTown, goTown, goTown],
        text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
    },
    {
        name: "lose",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You die. ☠️"
    },
    {
        name: "win",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You defeat the dragon! YOU WIN THE GAME! 🎉"
    },
    {
        name: "easter egg",
        "button text": ["2", "8", "Go to town square?"],
        "button functions": [pickTwo, pickEight, goTown],
        text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
    }
];

// initialize buttons activtes the beginning of functions below to either go to the store, cave and or Fight the Dragon out the town
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

//Update function allows the locations to select the right object key depending on what button you press. ex. button1.innertext and click selects first item in array
function update(location) {
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;
}

//goTown runs the update function to select the first object in the array for the corresponding button functions, text and location name.(Button go to Town Square is clicked)
function goTown() {
    update(locations[0]);
}

//goStore runs the update function to select the second object in the array for the corresponding button functions, text and location name.(Button go to Store is clicked)
function goStore() {
    update(locations[1]);
}

//goCave runs the update function to select the third object in the array for the corresponding button functions, text and location name.(Button go to Cave is clicked)
function goCave() {
    update(locations[2]);
}

//buyHealth function lets you purchase extra health. If you have at least 10 pieces of gold, you can take away 10 gold-your health goes up by 10 and the text updates. Else you don't have enough gold
function buyHealth() {
    if (gold >= 10) {
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
    } else {
        text.innerText = "You do not have enough gold to buy health.";
    }
}

//buyWeapon function: lets you buy weapon with 30 pieces of gold.
function buyWeapon() {
    //If currentWeapon is less than length of weapons array minus 1(which is 0)
    if (currentWeapon < weapons.length - 1) {
        //double if*** First if is if gold is greater than 30
        if (gold >= 30) {
            gold -= 30; //Take away 30 pieces
            currentWeapon++; // increment currentWeapon by 1
            goldText.innerText = gold; //Update gold text
            let newWeapon = weapons[currentWeapon].name; //Call new variable newWeapon that calls weapon name from currentWeapon #!
            console.log(newWeapon); //prints in the log, newWeapon string
            text.innerText = "You now have a " + newWeapon + "."; //Update text that you have a new weapon with concantenation
            inventory.push(newWeapon);// Push newWeapon string into inventory
            text.innerText += " In your inventory you have: " + inventory;//Update big text
        } else {
            text.innerText = "You do not have enough gold to buy a weapon.";//If there isn't enough money, you can't make a purchase
        }
    } else {//Else you have enough money and your inventory is full***
        text.innerText = "You already have the most powerful weapon!";//Else if you can't add any more weapons
        button2.innerText = "Sell weapon for 15 gold";//Changes button text to sell weapon for gold
        button2.onclick = sellWeapon; //Activate sellWeapon function when it's clicked
    }
}

function sellWeapon() {
    //Selling weapons function: if thhere is more than one item in your inventory
    if (inventory.length > 1) {
        //Add 15 gold
        gold += 15;
        goldText.innerText = gold;//Update gold text to new value
        let currentWeapon = inventory.shift();//remove first element of array in inventory as currentWeapon(the new weapon will be removed***)
        text.innerText = "You sold a " + currentWeapon + ".";//Update text with currentWeapon you just sold
        text.innerText += " In your inventory you have: " + inventory;//List what you have in your inventory after you sold your weapon
    } else {
        text.innerText = "Don't sell your only weapon!";//Can't sell one weapon
    }
}

function fightSlime() { //Fight Slime function
    fighting = 0; //Fighting var equals 0 for a later function*
    goFight(); //Activate go fight function
}

function fightBeast() { //Fight Fanged Beast function
    fighting = 1;//Fighting var equals 1 for a later function*
    goFight();//Activate go fight function
}

function fightDragon() { //Fight Dragon function
    fighting = 2;//Fighting var equals 2 for a later function*
    goFight();//Activate go fight function
}

function goFight() { //Go Fight function activated in beast fights
    update(locations[3]); //Update function runs through locations array to select object***
    monsterHealth = monsters[fighting].health; //Calls open var monsters health, and it equals monsters using fighting "number" to call respective monsters health
    monsterStats.style.display = "block"; //Reveals hidden display of monster text
    monsterName.innerText = monsters[fighting].name; //Updates monster name text to respective monster from monsters array
    monsterHealthText.innerText = monsterHealth; //Updates monster health
}

function attack() { //attack function during monster fight. think hit/miss algorithm
    text.innerText = "The " + monsters[fighting].name + " attacks.";//Recalls monster name for attacks and displays text
    text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";//Recalls weapon name and displays text with new text above***
    health -= getMonsterAttackValue(monsters[fighting].level);//health is health minus Monster Attack Power level(gets recalled from monsters array) go to attackvalue function
    if (isMonsterHit()) { //if MonsterHit function is triggered read function ***
        monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;//monster health is monster health minus currentWeapon power + rounded random number based on experience points + 1;
    } else {
        text.innerText += " You miss.";//Else your attack missed
    }
    healthText.innerText = health; //Update your health(you got hit)
    monsterHealthText.innerText = monsterHealth; //Update monster health(you hit them)
    if (health <= 0) { //if health is less than or equal to 0
        lose(); //trigger lose function
    } else if (monsterHealth <= 0) { // if monsterHealth is less than or equal to 0
        fighting === 2 ? winGame() : defeatMonster(); //If you are fighting the Dragon, trigger winGame function if not dragon, trigger defeatMonster function;
    }
    if (Math.random() <= .1 && inventory.length !== 1) { //Another weapon algorithm, if random # is less than or equal to .1, and inventory doesn't have only 1 weapon***
        text.innerText += " Your " + inventory.pop() + " breaks."; //Reomve current weapon using pop and update text
        currentWeapon--; //decrement to previous weapon
    }
}

function getMonsterAttackValue(level) { //Monster attack value with parameter Level
    const hit = (level * 5) - (Math.floor(Math.random() * xp)); //Var hit is monster attack value * 5 minus random # times my experience points
    console.log(hit); //Print in the console***
    return hit > 0 ? hit : 0; //If hit is greater than zero, use hit if not use 0.
}

function isMonsterHit() { //Decides whether hit actually hit or not lmao
    return Math.random() > .2 || health < 20; //If health is less than 20 we ALWAYS HIT
    //If the random number is greater than .2 we hit, if not we don't
}

function dodge() { //Display dogde monster when dodge is pressed
    text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

function defeatMonster() { //Monster defeated function
    gold += Math.floor(monsters[fighting].level * 6.7); //gold plus monsters attack level times 6.7 gives you THAT amount of gold
    xp += monsters[fighting].level; //Experience points equals experience points + monsters attack level
    goldText.innerText = gold;//Update gold text
    xpText.innerText = xp;//Update experience points
    update(locations[4]);//Run update function and go through 5th object***
}

function lose() { //Run update function and use locations array with 6th object***
    update(locations[5]);
}

function winGame() { //Run update function and use locations array with 7th object***
    update(locations[6]);
}

function restart() { //Restarts total game to original
    xp = 0; //Experience points 
    health = 100; // Health is reset
    gold = 50; //Gold is reset
    currentWeapon = 0; //currentWeapon is 1st weapon(stick)
    inventory = ["stick"]; //Inventory reset
    goldText.innerText = gold;//Update gold text
    healthText.innerText = health;//Update health text
    xpText.innerText = xp;//Update experience text
    goTown();//Trigger goTown function
}

function easterEgg() { //Easteregg function
    update(locations[7]);//Run update function with locations array using the 8th object
}

function pickTwo() { //Pick #2 function
    pick(2);//Run through pick function with 2 chosen
}

function pickEight() {//Pick #8 function
    pick(8);//Run through pick function with 8 chosen
}

function pick(guess) {//The pick a number function
    const numbers = []; //Var numbers with an empty array
    while (numbers.length < 10) { //If the number is less than 10 run while loop of random numbers between 1-10 and push the numbers into number array
        numbers.push(Math.floor(Math.random() * 11));
    }
    text.innerText = "You picked " + guess + ". Here are the random numbers:\n";//Update text with the guess you picked through your parameter
    for (let i = 0; i < 10; i++) {
        text.innerText += numbers[i] + "\n";
    } //for loop starting at the first part of array and ends at the tenth spot, update the inner text with the numbers and a line break. COntinues until 10 entries are slotted
    if (numbers.includes(guess)) { //If the numbers array includes the guess #
        text.innerText += "Right! You win 20 gold!";//Update the text with 
        gold += 20; //Add 20 pieces of gold
        goldText.innerText = gold;//Update the gold text
    } else { //Else 
        text.innerText += "Wrong! You lose 10 health!"; //Lose 10 health
        health -= 10; //Subtract health by 10
        healthText.innerText = health; //Update health text
        if (health <= 0) {//if health is less than or equal to 0
            lose(); //Trigger the lose function
        }
    }
}