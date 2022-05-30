"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exitGame = exports.goDungeon = exports.visitTown = exports.fight = exports.lootChest = exports.askQuestion = exports.line = void 0;
//imports -----------------------------------------------------------------------------------------------------------------------------
const classes = __importStar(require("./classes"));
//inits -----------------------------------------------------------------------------------------------------------------------------
var weapons = [new classes.Weapon("rusty knife", 5, 1, 15), new classes.Weapon("old longsword", 3, 1, 15), new classes.Weapon("broken bow", 2, 1, 15)];
var armors = [new classes.Armor("leather armor", 3, 1, 10)];
var towns = ["Brandenburg an der Havel", "Gotham", "Metropolis", "München", "Berlin", "New York", "Rifton", "Weisslauf"];
var dungeons = ["cave of fear", "spidernest", "forest of darkness", "Bandit - assemblypoint", "Warped Forest", "slime's home", "beast forest"];
var enemies = [new classes.Enemy("slime", 2, 5, 25, 3), new classes.Enemy("bandit", 3, 7, 30, 5),
    new classes.Enemy("guard", 3, 10, 50, 10), new classes.Enemy("Jagras", 5, 25, 70, 15), new classes.Enemy("zombie", 5, 7, 30, 5),
    new classes.Enemy("skeleton", 5, 7, 30, 5), new classes.Enemy("Creeper", 9, 8, 50, 7), new classes.Enemy("spider", 3, 4, 20, 3),
    new classes.Enemy("bat", 1, 3, 15, 2), new classes.Enemy("swordsman", 4, 7, 30, 7), new classes.Enemy("archer", 4, 5, 30, 5),
    new classes.Enemy("assassian", 10, 5, 30, 5), new classes.Enemy("gunsman", 3, 7, 30, 5), new classes.Enemy("beast", 7, 15, 50, 15),
    new classes.Enemy("samurai", 8, 12, 75, 25), new classes.Enemy("hunter", 6, 7, 30, 5), new classes.Enemy("dog", 2, 3, 15, 3),];
var bosses = [new classes.Enemy("King", 12, 25, 150, 75), new classes.Enemy("Prince", 15, 20, 125, 50),
    new classes.Enemy("Kirin", 20, 50, 150, 75), new classes.Enemy("Legiana", 4, 20, 75, 40), new classes.Enemy("Beastmaster", 9, 16, 90, 50),];
var difficulty;
(function (difficulty) {
    difficulty[difficulty["easy"] = 3] = "easy";
    difficulty[difficulty["normal"] = 4] = "normal";
    difficulty[difficulty["hard"] = 5] = "hard";
})(difficulty || (difficulty = {}));
//general overall methods -----------------------------------------------------------------------------------------------------------------------------
function line() {
    console.log("---------------------------------------------------------------------------------------------------------------------------");
    console.log("");
}
exports.line = line;
function randFromIntervall(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
const readline = require('readline');
function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });
    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }));
}
exports.askQuestion = askQuestion;
//general game methods -----------------------------------------------------------------------------------------------------------------------------
function buy(player, price) {
    if (player.gold >= price) {
        player.gold = player.gold - price;
        return 1;
    }
    else {
        console.log("You can't afford it, sorry.\n");
        return 0;
    }
}
function healPot(player) {
    let heal = player.hp / 2;
    player.currentHp = player.currentHp + heal;
    player.potNum--;
    if (player.currentHp > player.hp)
        player.currentHp = player.hp;
    console.log("You've healed! Your HP are now " + player.currentHp + "/" + player.hp + ".\n");
}
//Dungeon methods -----------------------------------------------------------------------------------------------------------------------------
function lootChest(player, gold, potNum, loot) {
    let lootname;
    if (loot instanceof classes.Armor)
        lootname = 'armor';
    if (loot instanceof classes.Weapon)
        lootname = 'weapon';
    line();
    console.log(`You're lucky! You've found a chest with a ${lootname} and ${gold} coins inside.`);
    console.log("");
    player.gold = player.gold + gold;
    if (potNum > 0) {
        if (potNum == 1)
            console.log("Addionally there was " + potNum + " Healpotion\n");
        else {
            console.log("Addionally there were " + potNum + " Healpotions\n");
        }
        player.potNum = player.potNum + potNum;
    }
    if (lootname == 'armor')
        lootArmor(player, loot);
    if (lootname == 'weapon')
        lootWeapon(player, loot);
}
exports.lootChest = lootChest;
async function lootArmor(p, a) {
    console.log("What do you want to do?");
    console.log("");
    a.info();
    console.log("1: Take it as your new armor. Your armor's AP: " + p.currentArmor.ap + "   New armor's AP: " + a.ap);
    console.log("2: Sell for " + a.value + " coins. They will be added immediately to your purse.");
    console.log("");
    line();
    let valid = false;
    let answer;
    let valid2 = false;
    let answer2;
    do {
        answer = await askQuestion('Enter your choice: ');
        switch (String(answer).toLowerCase()) {
            case '1':
                line();
                console.log("So you want to change your armor?");
                console.log("");
                console.log("1: Yes!");
                console.log("2: No, I want to do something else.");
                console.log("");
                line();
                do {
                    answer2 = await askQuestion('Enter your choice: ');
                    switch (String(answer2).toLowerCase()) {
                        case '1':
                            console.log("You've received the '" + a.name + "'!");
                            console.log("Your old armor was sold for " + p.currentArmor.value + " coins.\n");
                            p.gold = p.gold + p.currentArmor.value;
                            p.currentArmor = a;
                            valid = true;
                            valid2 = true;
                            break;
                        case '2':
                            valid = false;
                            valid2 = true;
                            break;
                        default:
                            console.log('Invalid answer!');
                    }
                } while (valid2 === false);
                break;
            case '2':
                line();
                console.log("So you want to sell your loot?");
                console.log("");
                console.log("1: Yes!");
                console.log("2: No, I want to do something else.");
                console.log("");
                line();
                do {
                    answer2 = await askQuestion('Enter your choice: ');
                    switch (String(answer2).toLowerCase()) {
                        case '1':
                            console.log("You've received " + a.value + " coins!\n");
                            p.gold = p.gold + a.value;
                            valid = true;
                            valid2 = true;
                            break;
                        case '2':
                            valid = false;
                            valid2 = true;
                            break;
                        default:
                            console.log('Invalid answer!');
                    }
                } while (valid2 === false);
                break;
            default:
                console.log('Invalid answer!');
        }
    } while (valid === false);
}
async function lootWeapon(p, w) {
    console.log("What do you want to do?");
    console.log("");
    w.info();
    console.log("1: Take it as your new weapon. Your weapon's damage: " + p.currentWeapon.damage + "   weapon's damage: " + w.damage);
    console.log("2: Sell for " + w.value + " coins. They will be added immediately to your purse.");
    console.log("");
    line();
    let valid = false;
    let answer;
    let valid2 = false;
    let answer2;
    do {
        answer = await askQuestion('Enter your choice: ');
        switch (String(answer).toLowerCase()) {
            case '1':
                line();
                console.log("So you want to change your weapon?");
                console.log("");
                console.log("1: Yes!");
                console.log("2: No, I want to do something else.");
                console.log("");
                line();
                do {
                    answer2 = await askQuestion('Enter your choice: ');
                    switch (String(answer2).toLowerCase()) {
                        case '1':
                            console.log("You've received the '" + w.name + "'!");
                            console.log("Your old weapon was sold for " + p.currentWeapon.value + " coins.\n");
                            p.gold = p.gold + p.currentWeapon.value;
                            p.currentWeapon = w;
                            valid = true;
                            valid2 = true;
                            break;
                        case '2':
                            valid = false;
                            valid2 = true;
                            break;
                        default:
                            console.log('Invalid answer!');
                    }
                } while (valid2 === false);
                break;
            case '2':
                line();
                console.log("So you want to sell your loot?");
                console.log("");
                console.log("1: Yes!");
                console.log("2: No, I want to do something else.");
                console.log("");
                line();
                do {
                    answer2 = await askQuestion('Enter your choice: ');
                    switch (String(answer2).toLowerCase()) {
                        case '1':
                            console.log("You've received " + w.value + " coins!\n");
                            p.gold = p.gold + w.value;
                            valid = true;
                            valid2 = true;
                            break;
                        case '2':
                            valid = false;
                            valid2 = true;
                            break;
                        default:
                            console.log('Invalid answer!');
                    }
                } while (valid2 === false);
                break;
            default:
                console.log('Invalid answer!');
        }
    } while (valid === false);
}
async function fight(player, enemy) {
    let enemyhp = enemy.hp;
    let playerhp = player.hp;
    let escaped = 0;
    let damage = player.currentWeapon.damage + player.baseDmg;
    let ap = player.currentArmor.ap + player.baseAp;
    let answer;
    line();
    console.log("You come into a fight against '" + enemy.name + "'\n");
    while (player.currentHp > 0 && enemy.hp > 0 && escaped != 1) {
        console.log("Your current HP: " + player.currentHp + "   Your ArmorPoints: " + ap + "   Your damage: " + damage + "   Your Potions: " + player.potNum + "   Enemy's current HP: " + enemy.hp + "   Enemy's damage: " + enemy.damage);
        console.log('');
        line();
        console.log("What will you do?");
        console.log("");
        console.log("1: Attack");
        console.log("2: Heal up");
        console.log("3: Try to run");
        console.log("");
        line();
        //Players turn
        let valid = false;
        do {
            answer = await askQuestion('Enter your choice: ');
            switch (String(answer).toLowerCase()) {
                case '1':
                    enemy.hp = enemy.hp - damage;
                    if (enemy.hp < 0)
                        enemy.hp = 0;
                    console.log("You dealt " + damage + " damage. Your enemy has " + enemy.hp + " HP left.\n");
                    valid = true;
                    break;
                case '2':
                    await healPot(player);
                    valid = true;
                    break;
                case '3':
                    let chance = Math.random() * 100;
                    if (chance < 75) {
                        escaped = 0;
                        console.log("Your try to escape failed.\n");
                    }
                    else {
                        escaped = 1;
                        console.log("You got away safely.\n");
                    }
                    valid = true;
                    break;
                default:
                    console.log('Invalid answer!');
            }
        } while (valid === false);
        //Enemy's turn
        if (escaped != 1 && enemy.hp > 0) {
            if (ap > 0) {
                ap = ap - enemy.damage;
                console.log("The enemy hit your armor. He dealt " + enemy.damage + " damage to it.\n");
                if (ap < 0) {
                    player.currentHp = player.currentHp + ap;
                    console.log("The enemy hit a bit through your armor. He dealt " + (ap * -1) + " damage to you.\n");
                    ap = 0;
                }
            }
            else {
                player.currentHp = player.currentHp - enemy.damage;
                console.log("The enemy hit you. He dealt " + enemy.damage + " damage.\n");
            }
        }
    }
    //one option is fulfilled
    if (player.currentHp <= 0) {
        player.gold = player.gold / 2;
        console.log("Seems like you've fainted. But don't worry, you've 'just' lost the half of your money, but somebody saved you.");
        console.log("Now you've " + player.gold + " coins left.\n");
        enemy.hp = enemyhp;
        player.currentHp = playerhp;
        return 0;
    }
    if (enemy.hp <= 0) {
        console.log("You've successfully killed the enemy. He dropped XP and gold.\n");
        player.receiveXP(enemy.xpdrop);
        player.receiveGold(enemy.golddrop);
        enemy.hp = enemyhp;
        return 1;
    }
    if (escaped == 1) {
        console.log("You've escaped but don't get any loot.\n");
        enemy.hp = enemyhp;
        return 0;
    }
    enemy.hp = enemyhp;
    return 0;
}
exports.fight = fight;
async function healUp(player) {
    line();
    console.log("You've the chance to heal up, will you take it?");
    console.log("Your HP: " + player.currentHp + "/" + player.hp + ".");
    console.log("");
    console.log("1: Yes!");
    console.log("2: No, I want to safe my Potions.");
    console.log("");
    line();
    console.log("");
    let valid;
    let answer;
    do {
        answer = await askQuestion('Enter your choice: ');
        switch (String(answer).toLowerCase()) {
            case '1':
                await healPot(player);
                valid = true;
                break;
            case '2':
                console.log("Alright so you don't need to heal, I see.");
                console.log("");
                valid = true;
                break;
            default:
                console.log('Invalid answer!');
        }
    } while (valid === false);
}
async function leave() {
    line();
    console.log("You've the chance to leave, will you take it?");
    console.log("");
    console.log("1: Yes!");
    console.log("2: No, I want fight more.");
    console.log("");
    line();
    console.log("");
    let answer;
    let valid;
    do {
        answer = await askQuestion('Enter your choice: ');
        switch (String(answer).toLowerCase()) {
            case '1':
                console.log("You left!\n");
                valid = true;
                return 0;
            case '2':
                console.log("Alright, keep going my friend.");
                console.log("");
                valid = true;
                return 1;
            default:
                console.log('Invalid answer!');
        }
    } while (valid === false);
    return 1;
}
function dungeonEntry(name) {
    line();
    console.log("Welcome to '" + name + "'. You'll encounter a few enemys and maybe you'll find a chest.");
    console.log("You can heal yourself after every enemy and the last one will be a boss. Good Luck and have fun!\n");
    line();
}
function dungeonExit(name) {
    line();
    console.log("You completed '" + name + "'. I hope the chest was full of tresure.");
    console.log("Thanks for visiting!\n");
    line();
}
function dungeonDeafetedBoss(enemy) {
    line();
    console.log("You defeated '" + enemy.name + "'. This was the boss.");
    console.log("Nice fight! You're very skillful.\n");
    line();
}
function dungeonDeafetedEnemy(enemy) {
    line();
    console.log("You defeated '" + enemy.name + "'.");
    console.log("Nice fight!\n");
    line();
}
function dungeonGotDefeated(name) {
    line();
    console.log("You couldn't complete '" + name + "'. I hope it wasn't too hurtful.");
    console.log("Thanks for visiting!\n");
    line();
}
//Gameloop methods -----------------------------------------------------------------------------------------------------------------------------
async function visitTown(p) {
    let index = randFromIntervall(0, towns.length - 1);
    let townname = towns[index];
    let answer;
    do {
        line();
        console.log(`Welcome to ${townname}! What do you want to do?`);
        console.log("");
        console.log("1: Go to the local shop.");
        console.log("2: Visit the forge.");
        console.log("3: Search for a place to sleeping.");
        console.log(`4: Exit ${townname}.`);
        console.log("");
        line();
        let valid = false;
        do {
            answer = await askQuestion('Enter your choice: ');
            console.log('\n');
            switch (String(answer).toLowerCase()) {
                case '1':
                    await visitShop(p);
                    valid = true;
                    break;
                case '2':
                    await visitForge(p);
                    valid = true;
                    break;
                case '3':
                    await visitHotel(p);
                    valid = true;
                    break;
                case '4':
                    console.log("Have a great day traveler and visit us again soon!");
                    valid = true;
                    break;
                default:
                    console.log('Invalid answer!');
            }
        } while (valid === false);
    } while (answer != '4');
}
exports.visitTown = visitTown;
async function goDungeon(p) {
    let index = randFromIntervall(0, dungeons.length - 1);
    let lvls = [p.lvl - 2, p.lvl - 1, p.lvl, p.lvl + 1, p.lvl + 2];
    let name = dungeons[index];
    let dif;
    let win;
    if (p.lvl < 10)
        dif = difficulty.easy;
    else if (p.lvl >= 20)
        dif = difficulty.hard;
    else
        dif = difficulty.normal;
    dungeonEntry(name);
    for (let i = 0; i < dif; i++) {
        index = randFromIntervall(0, enemies.length - 1);
        let enemy = enemies[index];
        index = randFromIntervall(0, lvls.length - 1);
        enemy.lvl = lvls[index];
        win = await fight(p, enemy);
        if (win == 1) {
            dungeonDeafetedEnemy(enemy);
            win = await leave();
            if (win == 1)
                await healUp(p);
        }
        else
            break;
    }
    if (win == 0)
        dungeonGotDefeated(name);
    else {
        index = randFromIntervall(0, bosses.length - 1);
        let boss = bosses[index];
        index = randFromIntervall(0, lvls.length - 1);
        boss.lvl = lvls[index];
        win = await fight(p, boss);
        if (win == 1) {
            dungeonDeafetedBoss(boss);
            let loot = randFromIntervall(0, 1);
            if (loot == 0) {
                index = randFromIntervall(0, armors.length - 1);
                let armor = armors[index];
                await lootChest(p, dif * 75, dif, armor);
            }
            else {
                index = randFromIntervall(0, weapons.length - 1);
                let weapon = weapons[index];
                await lootChest(p, dif * 75, dif, weapon);
            }
            dungeonExit(name);
        }
        else
            dungeonGotDefeated(name);
    }
}
exports.goDungeon = goDungeon;
function exitGame(p) {
    console.log('\nThank you for playing my game. I hope you had fun.');
}
exports.exitGame = exitGame;
//Town methods -----------------------------------------------------------------------------------------------------------------------------
async function visitShop(p) {
    let index = randFromIntervall(0, armors.length - 1);
    let armor = armors[index];
    let answer;
    do {
        line();
        console.log(`Welcome to the local shop! What do you want to do?`);
        console.log("");
        console.log(`1: Buy the armor '${armor.name}'.`);
        console.log("2: Buy healpotions.");
        console.log("3: Exit the shop.");
        console.log("");
        line();
        let valid = false;
        do {
            answer = await askQuestion('Enter your choice: ');
            console.log('\n');
            switch (String(answer).toLowerCase()) {
                case '1':
                    await buyArmor(p, armor);
                    valid = true;
                    break;
                case '2':
                    await buyPotions(p);
                    valid = true;
                    break;
                case '3':
                    console.log("Visit us again soon!");
                    valid = true;
                    break;
                default:
                    console.log('Invalid answer!');
            }
        } while (valid === false);
    } while (answer != '3');
}
async function visitForge(p) {
    let index = randFromIntervall(0, weapons.length - 1);
    let weapon = weapons[index];
    let answer;
    do {
        line();
        console.log(`Welcome to the forge! What do you want to do?`);
        console.log("");
        console.log(`1: Buy the weapon '${weapon.name}'.`);
        console.log("2: Upgrade Armor.");
        console.log("3: Upgrade Weapon.");
        console.log("4: Exit the shop.");
        console.log("");
        line();
        let valid = false;
        do {
            answer = await askQuestion('Enter your choice: ');
            console.log('\n');
            switch (String(answer).toLowerCase()) {
                case '1':
                    await buyWeapon(p, weapon);
                    valid = true;
                    break;
                case '2':
                    await upgradeArm(p);
                    valid = true;
                    break;
                case '3':
                    await upgradeWep(p);
                    valid = true;
                    break;
                case '4':
                    console.log("Visit us again soon!");
                    valid = true;
                    break;
                default:
                    console.log('Invalid answer!');
            }
        } while (valid === false);
    } while (answer != '4');
}
async function visitHotel(p) {
    let price = randFromIntervall(8, 16);
    line();
    console.log(`Welcome to the local hotel! Do you want to stay the night?`);
    console.log(`The price is ${price} coins and it would lead to a full-heal.`);
    console.log("");
    console.log(`1: Yes. Current HP: ${p.currentHp}/${p.hp}`);
    console.log("2: Exit the hotel.");
    console.log("");
    line();
    let answer;
    let valid = false;
    do {
        answer = await askQuestion('Enter your choice: ');
        console.log('\n');
        switch (String(answer).toLowerCase()) {
            case '1':
                let gotIt = buy(p, price);
                if (gotIt == 1) {
                    console.log("Have a good stay stranger!\nYou wake up full of new energy, your HP restored completly.\nYou leave the Hotel with a great feeling.");
                    p.currentHp = p.hp;
                }
                else
                    console.log("You could not afford a night in the hotel and left.");
                valid = true;
                break;
            case '2':
                console.log("Have a nice stay in our beautiful town.");
                valid = true;
                break;
            default:
                console.log('Invalid answer!');
        }
    } while (valid === false);
}
async function buyWeapon(player, weapon) {
    line();
    console.log("You want to buy '" + weapon.name + "'? The price is " + weapon.value * 5 + " coins.");
    console.log("Your gold: " + player.gold + " coins");
    console.log("");
    weapon.info();
    console.log("\n1: Yes! Your weapon's damage: " + player.currentWeapon.damage + "   New weapon's damage: " + weapon.damage);
    console.log("2: No, I am just watching.");
    console.log("");
    line();
    let answer;
    let valid = false;
    do {
        answer = await askQuestion('Enter your choice: ');
        console.log('\n');
        switch (String(answer).toLowerCase()) {
            case '1':
                let gotIt = buy(player, (weapon.value) * 5);
                if (gotIt == 1) {
                    console.log("You've received the '" + weapon.name + "'!");
                    console.log("Your old weapon was sold for " + player.currentWeapon.value + " coins.\n");
                    player.gold = player.gold + player.currentWeapon.value;
                    player.currentWeapon = weapon;
                }
                valid = true;
                break;
            case '2':
                console.log("Ok, then keep looking.\n");
                valid = true;
                break;
            default:
                console.log('Invalid answer!');
        }
    } while (valid === false);
}
async function buyArmor(player, armor) {
    line();
    console.log("You want to buy '" + armor.name + "'? The price is " + armor.value * 5 + " coins.");
    console.log("Your gold: " + player.gold + " coins");
    console.log("");
    armor.info();
    console.log("\n1: Yes! Your armor's AP: " + player.currentArmor.ap + "   New armor's AP: " + armor.ap);
    console.log("2: No, I am just watching.");
    console.log("");
    line();
    let answer;
    let valid = false;
    do {
        answer = await askQuestion('Enter your choice: ');
        console.log('\n');
        switch (String(answer).toLowerCase()) {
            case '1':
                let gotIt = buy(player, armor.value * 5);
                if (gotIt == 1) {
                    console.log("You've received the '" + armor.name + "'!");
                    console.log("Your old armor was sold for " + player.currentArmor.value + " coins.\n");
                    player.gold = player.gold + player.currentArmor.value;
                    player.currentArmor = armor;
                }
                valid = true;
                break;
            case '2':
                console.log("Ok, then keep looking.\n");
                valid = true;
                break;
            default:
                console.log('Invalid answer!');
        }
    } while (valid === false);
}
async function buyPotions(player) {
    line();
    let numPot = randFromIntervall(1, 7);
    let buyNum = +await askQuestion('Please enter how many Potions you want to buy: ');
    if (buyNum > numPot) {
        console.log("We don't have that many potions. We only have " + numPot + ".\n");
        buyNum = numPot;
    }
    line();
    console.log("You want to buy " + buyNum + " potions? The price is " + (buyNum * 10) + " coins.");
    console.log("Your gold: " + player.gold + " coins\n");
    console.log("1: Yes!");
    console.log("2: No, I am just watching.");
    console.log("");
    line();
    let answer;
    let valid = false;
    do {
        answer = await askQuestion('Enter your choice: ');
        console.log('\n');
        switch (String(answer).toLowerCase()) {
            case '1':
                let gotIt = buy(player, (buyNum * 10));
                if (gotIt == 1) {
                    console.log("You've received " + buyNum + " potions!\n");
                    player.potNum = player.potNum + buyNum;
                }
                valid = true;
                break;
            case '2':
                console.log("Ok, then keep looking.\n");
                valid = true;
                break;
            default:
                console.log('Invalid answer!');
        }
    } while (valid === false);
}
async function upgradeWep(player) {
    line();
    let price = (player.currentWeapon.value / 2) + ((player.currentWeapon.upgradestage + 2) * 5);
    console.log("You want to upgrade '" + player.currentWeapon.name + "'? The price is " + price + " coins.");
    console.log("Your gold: " + player.gold + " coins\n");
    console.log("1: Yes!");
    console.log("2: No, I am just watching.");
    console.log("");
    line();
    let answer;
    let valid = false;
    do {
        answer = await askQuestion('Enter your choice: ');
        console.log('\n');
        switch (String(answer).toLowerCase()) {
            case '1':
                let gotIt = buy(player, price);
                if (gotIt == 1) {
                    console.log("You've upgraded your weapon!\n");
                    player.currentWeapon.upgradeWeapon();
                }
                valid = true;
                break;
            case '2':
                console.log("Ok, then keep looking.\n");
                valid = true;
                break;
            default:
                console.log('Invalid answer!');
        }
    } while (valid === false);
}
async function upgradeArm(player) {
    line();
    let price = (player.currentArmor.value / 2) + ((player.currentArmor.upgradestage + 2) * 5);
    console.log("You want to upgrade '" + player.currentArmor.name + "'? The price is " + price + " coins.");
    console.log("Your gold: " + player.gold + " coins\n");
    console.log("1: Yes!");
    console.log("2: No, I am just watching.");
    console.log("");
    line();
    let answer;
    let valid = false;
    do {
        answer = await askQuestion('Enter your choice: ');
        console.log('\n');
        switch (String(answer).toLowerCase()) {
            case '1':
                let gotIt = buy(player, price);
                if (gotIt == 1) {
                    console.log("You've upgraded your armor!\n");
                    player.currentArmor.upgradeArmor();
                }
                valid = true;
                break;
            case '2':
                console.log("Ok, then keep looking.\n");
                valid = true;
                break;
            default:
                console.log('Invalid answer!');
        }
    } while (valid === false);
}
