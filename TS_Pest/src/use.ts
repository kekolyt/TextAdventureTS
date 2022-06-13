//imports -----------------------------------------------------------------------------------------------------------------------------
import * as classes from "./classes";
import {line, askQuestion, randFromIntervall} from './functions'

//inits -----------------------------------------------------------------------------------------------------------------------------
var weapons: classes.Weapon[] = [new classes.Weapon("rusty knife", 3, 1, 15), new classes.Weapon("old longsword", 3, 1, 15), new classes.Weapon("broken bow", 3, 1, 15),
new classes.Weapon("High-Frequency Blade - Metal Gear Solid", 5, 1, 20), new classes.Weapon("Sword 'n' Shield - Monster Hunter", 7, 1, 24), new classes.Weapon("Keyblade - Kingdom Hearts", 10, 2, 60),
new classes.Weapon("Scythe", 11, 2, 70), new classes.Weapon("goldsword", 20, 3, 175), new classes.Weapon("Charge Blade - Monster Hunter", 23, 3, 250),
new classes.Weapon("diamondsword", 40, 4, 600), new classes.Weapon("Excalibur", 50, 4, 1500),
new classes.Weapon("Light Saber - Star Wars", 80, 5, 5000), new classes.Weapon("Blades of Chaos - God of War", 75, 5, 4000), new classes.Weapon("Link's bow", 3, 1, 25),
new classes.Weapon("broken crossbow", 2, 1, 20), new classes.Weapon("normal bow", 5, 2, 60), new classes.Weapon("Legolas' bow", 8, 2, 150),
new classes.Weapon("Lysopp's slingshot", 15, 3, 350), new classes.Weapon("Hanzo's Storm Bow", 19, 3, 550), new classes.Weapon("War Bow - Horizon Zero Dawn", 25, 4, 1500),
new classes.Weapon("Bowgun - Resident Evil", 30, 4, 2000), new classes.Weapon("Dragonbone Bow", 41, 5, 3500), new classes.Weapon("Hawkeye's bow", 43, 5, 4500),
new classes.Weapon("Kitchen Knife", 7, 1, 25), new classes.Weapon("Zero's Dagger - Borderlands", 8, 1, 30), new classes.Weapon("Butterfly Knife - Team Fortress", 15, 2, 75),
new classes.Weapon("Katarina's Knives - League of Legends", 17, 2, 100), new classes.Weapon("Twin Daggers - Dead Cells", 30, 3, 350), new classes.Weapon("Shadowflame Knife - Terraria", 27, 3, 500),
new classes.Weapon("Scream's knife", 65, 4, 1250), new classes.Weapon("Dual Hidden Blades - Assassin's Creed", 75, 4, 2000), new classes.Weapon("Hunter's Knife - Monster Hunter World", 90, 5, 3500),
new classes.Weapon("dual Karambit", 100, 5, 5000),]

var armors: classes.Armor[] = [new classes.Armor("leather armor", 3, 1, 10), new classes.Armor("Jagras Armor - Monster Hunter", 6, 1, 17), new classes.Armor("Nanosuit - Crysis", 9, 1, 30),
new classes.Armor("Scorpion Suit - Dead Space", 11, 1, 40), new classes.Armor("Dodogama Armor - Monster Hunter", 12, 1, 45), new classes.Armor("iron armor", 13, 2, 50),
new classes.Armor("ARS Suit - Vanquish", 16, 2, 80), new classes.Armor("Gala Suit - Monster Hunter", 18, 2, 110), new classes.Armor("Samus' Power Suit - Metroid", 20, 2, 125),
new classes.Armor("Legiana Armor - Monster Hunter", 21, 2, 130), new classes.Armor("gold armor", 25, 3, 150), new classes.Armor("Helghast - Killzone", 30, 3, 200),
new classes.Armor("Assault Armor - Titanfall", 37, 3, 325), new classes.Armor("Madness Armor - The Elder Scrolls IV", 40, 3, 350), new classes.Armor("Kushala Armor - Monster Hunter", 48, 3, 450),
new classes.Armor("diamond armor", 50, 4, 500), new classes.Armor("Big Daddy - BioShock 2", 60, 4, 750), new classes.Armor("Diablos Armor - Monster Hunter", 65, 4, 1000),
new classes.Armor("Space Marine - Warhammer", 70, 4, 1250), new classes.Armor("Daedric Armor - Elder Scrolls V: Skyrim", 75, 4, 1500), new classes.Armor("netherite armor", 100, 5, 2500),
new classes.Armor("Kirin Armor - Monster Hunter", 130, 5, 3500), new classes.Armor("Ember Prime - Warframe", 140, 5, 4000), new classes.Armor("Tier 5 Warlock Armor - World of Warcraft", 150, 5, 5000),
new classes.Armor("Thor's armor", 250, 5, 10000),]

var towns: String[] = ["Brandenburg an der Havel", "Gotham", "Metropolis", "München", "Berlin", "New York", "Rifton", "Weisslauf"]
var dungeons: String[] = ["cave of fear", "spidernest", "forest of darkness", "Bandit - assemblypoint", "Warped Forest", "slime's home", "beast forest"]

var enemies: classes.Enemy[] = [new classes.Enemy("slime", 2, 5, 25, 3), new classes.Enemy("bandit", 3, 7, 30, 5),
new classes.Enemy("guard", 3, 10, 50, 10), new classes.Enemy("Jagras", 5, 25, 70, 15), new classes.Enemy("zombie", 5, 7, 30, 5),
new classes.Enemy("skeleton", 5, 7, 30, 5), new classes.Enemy("Creeper", 9, 8, 50, 7), new classes.Enemy("spider", 3, 4, 20, 3),
new classes.Enemy("bat", 1, 3, 15, 2), new classes.Enemy("swordsman", 4, 7, 30, 7), new classes.Enemy("archer", 4, 5, 30, 5),
new classes.Enemy("assassian", 10, 5, 30, 5), new classes.Enemy("gunsman", 3, 7, 30, 5), new classes.Enemy("beast", 7, 15, 50, 15),
new classes.Enemy("samurai", 8, 12, 75, 25), new classes.Enemy("hunter", 6, 7, 30, 5), new classes.Enemy("dog", 2, 3, 15, 3),]

var bosses: classes.Enemy[] = [new classes.Enemy("King", 12, 25, 150, 75), new classes.Enemy("Prince", 15, 20, 125, 50),
new classes.Enemy("Kirin", 20, 50, 150, 75), new classes.Enemy("Legiana", 4, 20, 75, 40), new classes.Enemy("Beastmaster", 9, 16, 90, 50),]

enum difficulty {
    easy = 3,
    advanced = 4,
    normal = 5,
    hard = 6,
    extreme = 7,
}

//general game methods -----------------------------------------------------------------------------------------------------------------------------

function buy(player: classes.Player, price: number) //tests if price can be afford and if so it deecreases the playergold
{
    if (player.gold >= price) {
        player.gold = player.gold - price;
        return 1;
    }
    else {
        console.log("You can't afford it, sorry.\n");
        return 0;
    }
}

function healPot(player: classes.Player) //heal-method of a potion
{
    let heal = player.hp / 2;
    player.currentHp = player.currentHp + heal;
    player.potNum--;
    if (player.currentHp > player.hp)
        player.currentHp = player.hp;
    console.log("You've healed! Your HP are now " + player.currentHp + "/" + player.hp + ".\n");
}

//Dungeon methods -----------------------------------------------------------------------------------------------------------------------------

export function lootChest(player: classes.Player, gold: number, potNum: number, loot: any) //loot a chest with an armor as drop
{
    let lootname
    if (loot instanceof classes.Armor)
        lootname = 'armor'
    if (loot instanceof classes.Weapon)
        lootname = 'weapon'
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
        lootArmor(player, loot)
    if (lootname == 'weapon')
        lootWeapon(player, loot)
}

async function lootArmor(p: classes.Player, a: classes.Armor) {
    console.log("What do you want to do?");
    console.log("");
    a.info();
    console.log("1: Take it as your new armor. Your armor's AP: " + p.currentArmor.ap + "   New armor's AP: " + a.ap);
    console.log("2: Sell for " + a.value + " coins. They will be added immediately to your purse.");
    console.log("");
    line();

    let valid = false
    let answer
    let valid2 = false
    let answer2
    do {
        answer = await askQuestion('Enter your choice: ')
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
                    answer2 = await askQuestion('Enter your choice: ')
                    switch (String(answer2).toLowerCase()) {
                        case '1':
                            console.log("You've received the '" + a.name + "'!");
                            console.log("Your old armor was sold for " + p.currentArmor.value + " coins.\n");
                            p.gold = p.gold + p.currentArmor.value;
                            p.currentArmor = a;
                            valid = true
                            valid2 = true
                            break;
                        case '2':
                            valid = false
                            valid2 = true
                            break;
                        default:
                            console.log('Invalid answer!');
                    }
                } while (valid2 === false)
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
                    answer2 = await askQuestion('Enter your choice: ')
                    switch (String(answer2).toLowerCase()) {
                        case '1':
                            console.log("You've received " + a.value + " coins!\n");
                            p.gold = p.gold + a.value;
                            valid = true
                            valid2 = true
                            break;
                        case '2':
                            valid = false
                            valid2 = true
                            break;
                        default:
                            console.log('Invalid answer!');
                    }
                } while (valid2 === false)
                break;
            default:
                console.log('Invalid answer!');
        }
    } while (valid === false)
}

async function lootWeapon(p: classes.Player, w: classes.Weapon) {
    console.log("What do you want to do?");
    console.log("");
    w.info();
    console.log("1: Take it as your new weapon. Your weapon's damage: " + p.currentWeapon.damage + "   weapon's damage: " + w.damage);
    console.log("2: Sell for " + w.value + " coins. They will be added immediately to your purse.");
    console.log("");
    line();

    let valid = false
    let answer
    let valid2 = false
    let answer2
    do {
        answer = await askQuestion('Enter your choice: ')
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
                    answer2 = await askQuestion('Enter your choice: ')
                    switch (String(answer2).toLowerCase()) {
                        case '1':
                            console.log("You've received the '" + w.name + "'!");
                            console.log("Your old weapon was sold for " + p.currentWeapon.value + " coins.\n");
                            p.gold = p.gold + p.currentWeapon.value;
                            p.currentWeapon = w;
                            valid = true
                            valid2 = true
                            break;
                        case '2':
                            valid = false
                            valid2 = true
                            break;
                        default:
                            console.log('Invalid answer!');
                    }
                } while (valid2 === false)
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
                    answer2 = await askQuestion('Enter your choice: ')
                    switch (String(answer2).toLowerCase()) {
                        case '1':
                            console.log("You've received " + w.value + " coins!\n");
                            p.gold = p.gold + w.value;
                            valid = true
                            valid2 = true
                            break;
                        case '2':
                            valid = false
                            valid2 = true
                            break;
                        default:
                            console.log('Invalid answer!');
                    }
                } while (valid2 === false)
                break;
            default:
                console.log('Invalid answer!');
        }
    } while (valid === false)
}

export async function fight(player: classes.Player, enemy: classes.Enemy) //fight between player and an enemy without loot (besides gold and xp) gives if fight was won
{
    let enemyhp = enemy.hp;
    let playerhp = player.hp;
    let escaped = 0;
    let damage = player.currentWeapon.damage + player.baseDmg;
    let ap = player.currentArmor.ap + player.baseAp;

    let answer

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
        let valid = false
        do {
            answer = await askQuestion('Enter your choice: ')
            switch (String(answer).toLowerCase()) {
                case '1':
                    enemy.hp = enemy.hp - damage;
                    if (enemy.hp < 0)
                        enemy.hp = 0;
                    console.log("You dealt " + damage + " damage. Your enemy has " + enemy.hp + " HP left.\n");
                    valid = true
                    break;
                case '2':
                    await healPot(player)
                    valid = true
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
                    valid = true
                    break;
                default:
                    console.log('Invalid answer!');
            }
        } while (valid === false)

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

async function healUp(player: classes.Player) //chance to use a healpotion
{
    line();
    console.log("You've the chance to heal up, will you take it?");
    console.log("Your HP: " + player.currentHp + "/" + player.hp + ".");
    console.log("");
    console.log("1: Yes!");
    console.log("2: No, I want to safe my Potions.");
    console.log("");
    line();
    console.log("");

    let valid
    let answer
    do {
        answer = await askQuestion('Enter your choice: ')
        switch (String(answer).toLowerCase()) {
            case '1':
                await healPot(player)
                valid = true
                break;
            case '2':
                console.log("Alright so you don't need to heal, I see.");
                console.log("");
                valid = true
                break;
            default:
                console.log('Invalid answer!');
        }
    } while (valid === false)
}

async function leave() //chance to leave a dungeon
{
    line();
    console.log("You've the chance to leave, will you take it?");
    console.log("");
    console.log("1: Yes!");
    console.log("2: No, I want fight more.");
    console.log("");
    line();
    console.log("");

    let answer
    let valid
    do {
        answer = await askQuestion('Enter your choice: ')
        switch (String(answer).toLowerCase()) {
            case '1':
                console.log("You left!\n");
                valid = true
                return 0;
            case '2':

                console.log("Alright, keep going my friend.");
                console.log("");
                valid = true
                return 1;
            default:
                console.log('Invalid answer!');
        }
    } while (valid === false)
    return 1;
}

function dungeonEntry(name: String) {
    line();
    console.log("Welcome to '" + name + "'. You'll encounter a few enemys and maybe you'll find a chest.");
    console.log("You can heal yourself after every enemy and the last one will be a boss. Good Luck and have fun!\n");
    line();
}

function dungeonExit(name: String) {
    line();
    console.log("You completed '" + name + "'. I hope the chest was full of tresure.");
    console.log("Thanks for visiting!\n");
    line();
}

function dungeonDeafetedBoss(enemy: classes.Enemy) {
    line();
    console.log("You defeated '" + enemy.name + "'. This was the boss.");
    console.log("Nice fight! You're very skillful.\n");
    line();
}

function dungeonDeafetedEnemy(enemy: classes.Enemy) {
    line();
    console.log("You defeated '" + enemy.name + "'.");
    console.log("Nice fight!\n");
    line();
}

function dungeonGotDefeated(name: String) {
    line();
    console.log("You couldn't complete '" + name + "'. I hope it wasn't too hurtful.");
    console.log("Thanks for visiting!\n");
    line();
}

//Gameloop methods -----------------------------------------------------------------------------------------------------------------------------

export async function visitTown(p: classes.Player) {
    let index = randFromIntervall(0, towns.length - 1)
    let townname = towns[index]
    let answer

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

        let valid = false
        do {
            answer = await askQuestion('Enter your choice: ')
            console.log('\n');
            switch (String(answer).toLowerCase()) {
                case '1':
                    await visitShop(p)
                    valid = true
                    break;
                case '2':
                    await visitForge(p)
                    valid = true
                    break;
                case '3':
                    await visitHotel(p)
                    valid = true
                    break;
                case '4':
                    console.log("Have a great day traveler and visit us again soon!")
                    valid = true
                    break;
                default:
                    console.log('Invalid answer!');
            }
        } while (valid === false)
    } while (answer != '4')
}

export async function goDungeon(p: classes.Player) {
    let index = randFromIntervall(0, dungeons.length - 1)
    let lvls: number[] = [p.lvl - 2, p.lvl - 1, p.lvl, p.lvl + 1, p.lvl + 2]
    let name = dungeons[index]
    let dif
    let win

    if (p.lvl <= 5)
        dif = difficulty.easy
    else if (p.lvl <= 10)
        dif = difficulty.advanced
    else if (p.lvl <= 15)
        dif = difficulty.normal
    else if (p.lvl <= 20)
        dif = difficulty.hard
    else
        dif = difficulty.extreme

    dungeonEntry(name)

    for (let i = 0; i < dif; i++) {
        index = randFromIntervall(0, enemies.length - 1)
        let enemy = enemies[index]
        index = randFromIntervall(0, lvls.length - 1)
        enemy.lvl = lvls[index]
        win = await fight(p, enemy)
        if (win == 1) {
            dungeonDeafetedEnemy(enemy)
            win = await leave()
            if (win == 1)
                await healUp(p)
        } else
            break
    }
    if (win == 0)
        dungeonGotDefeated(name)
    else {
        console.log("You've successfully defeated all enemies, the next one will be a boss. Now you've a last chance to leave!")
        win = await leave()
        if (win == 1) {
            index = randFromIntervall(0, bosses.length - 1)
            var boss = bosses[index]
            index = randFromIntervall(0, lvls.length - 1)
            boss.lvl = lvls[index]
            win = await fight(p, boss)
        }
        if (win == 1) {
            dungeonDeafetedBoss(boss)
            let loot = randFromIntervall(0, 1)
            if (loot == 0) {
                let armor
                do {
                    index = randFromIntervall(0, armors.length - 1)
                    armor = armors[index]
                } while (armor.rarity > (dif - 3) && armor.rarity <= (dif - 2));
                await lootChest(p, dif * 75, dif, armor)
            } else {
                let weapon
                do {
                    index = randFromIntervall(0, weapons.length - 1)
                    weapon = weapons[index]
                } while (weapon.rarity > (dif - 3) && weapon.rarity <= (dif - 2));
                await lootChest(p, dif * 75, dif, weapon)
            }
            dungeonExit(name)
        } else
            dungeonGotDefeated(name)
    }
}

export function exitGame(p: classes.Player) {
    console.log('\nThank you for playing my game. I hope you had fun.');
}

//Town methods -----------------------------------------------------------------------------------------------------------------------------

async function visitShop(p: classes.Player) {
    let index = randFromIntervall(0, armors.length - 1)
    let armor = armors[index]
    let answer

    do {
        line();
        console.log(`Welcome to the local shop! What do you want to do?`);
        console.log("");
        console.log(`1: Buy the armor '${armor.name}'.`);
        console.log("2: Buy healpotions.");
        console.log("3: Exit the shop.");
        console.log("");
        line();

        let valid = false
        do {
            answer = await askQuestion('Enter your choice: ')
            console.log('\n');
            switch (String(answer).toLowerCase()) {
                case '1':
                    await buyArmor(p, armor)
                    valid = true
                    break;
                case '2':
                    await buyPotions(p)
                    valid = true
                    break;
                case '3':
                    console.log("Visit us again soon!")
                    valid = true
                    break;
                default:
                    console.log('Invalid answer!');
            }
        } while (valid === false)
    } while (answer != '3')
}
async function visitForge(p: classes.Player) {
    let index = randFromIntervall(0, weapons.length - 1)
    let weapon = weapons[index]
    let answer

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

        let valid = false
        do {
            answer = await askQuestion('Enter your choice: ')
            console.log('\n');
            switch (String(answer).toLowerCase()) {
                case '1':
                    await buyWeapon(p, weapon)
                    valid = true
                    break;
                case '2':
                    await upgradeArm(p)
                    valid = true
                    break;
                case '3':
                    await upgradeWep(p)
                    valid = true
                    break;
                case '4':
                    console.log("Visit us again soon!")
                    valid = true
                    break;
                default:
                    console.log('Invalid answer!');
            }
        } while (valid === false)
    } while (answer != '4');
}

async function visitHotel(p: classes.Player) {
    let price = randFromIntervall(8, 16)

    line();
    console.log(`Welcome to the local hotel! Do you want to stay the night?`);
    console.log(`The price is ${price} coins and it would lead to a full-heal.`);
    console.log("");
    console.log(`1: Yes. Current HP: ${p.currentHp}/${p.hp}`);
    console.log("2: Exit the hotel.");
    console.log("");
    line();

    let answer
    let valid = false
    do {
        answer = await askQuestion('Enter your choice: ')
        console.log('\n');
        switch (String(answer).toLowerCase()) {
            case '1':
                let gotIt = buy(p, price)
                if (gotIt == 1) {
                    console.log("Have a good stay stranger!\nYou wake up full of new energy, your HP restored completly.\nYou leave the Hotel with a great feeling.");
                    p.currentHp = p.hp
                } else
                    console.log("You could not afford a night in the hotel and left.");
                valid = true
                break;
            case '2':
                console.log("Have a nice stay in our beautiful town.");
                valid = true
                break;
            default:
                console.log('Invalid answer!');
        }
    } while (valid === false)
}

async function buyWeapon(player: classes.Player, weapon: classes.Weapon) {
    line();
    console.log("You want to buy '" + weapon.name + "'? The price is " + weapon.value * 5 + " coins.");
    console.log("Your gold: " + player.gold + " coins");
    console.log("");
    weapon.info();
    console.log("\n1: Yes! Your weapon's damage: " + player.currentWeapon.damage + "   New weapon's damage: " + weapon.damage);
    console.log("2: No, I am just watching.");
    console.log("");
    line();

    let answer
    let valid = false
    do {
        answer = await askQuestion('Enter your choice: ')
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
                valid = true
                break;
            case '2':
                console.log("Ok, then keep looking.\n");
                valid = true
                break;
            default:
                console.log('Invalid answer!');
        }
    } while (valid === false)
}

async function buyArmor(player: classes.Player, armor: classes.Armor) {
    line();
    console.log("You want to buy '" + armor.name + "'? The price is " + armor.value * 5 + " coins.");
    console.log("Your gold: " + player.gold + " coins");
    console.log("");
    armor.info();
    console.log("\n1: Yes! Your armor's AP: " + player.currentArmor.ap + "   New armor's AP: " + armor.ap);
    console.log("2: No, I am just watching.");
    console.log("");
    line();

    let answer
    let valid = false
    do {
        answer = await askQuestion('Enter your choice: ')
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
                valid = true
                break;
            case '2':
                console.log("Ok, then keep looking.\n");
                valid = true
                break;
            default:
                console.log('Invalid answer!');
        }
    } while (valid === false)
}

async function buyPotions(player: classes.Player) {
    line();
    let numPot = randFromIntervall(1, 7)
    let buyNum: number = + await askQuestion('Please enter how many Potions you want to buy: ')
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

    let answer
    let valid = false
    do {
        answer = await askQuestion('Enter your choice: ')
        console.log('\n');
        switch (String(answer).toLowerCase()) {
            case '1':
                let gotIt = buy(player, (buyNum * 10));
                if (gotIt == 1) {
                    console.log("You've received " + buyNum + " potions!\n");

                    player.potNum = player.potNum + buyNum;
                }
                valid = true
                break;
            case '2':
                console.log("Ok, then keep looking.\n");
                valid = true
                break;
            default:
                console.log('Invalid answer!');
        }
    } while (valid === false)
}

async function upgradeWep(player: classes.Player) {
    line();
    let price = (player.currentWeapon.value / 2) + ((player.currentWeapon.upgradestage + 2) * 5);
    console.log("You want to upgrade '" + player.currentWeapon.name + "'? The price is " + price + " coins.");
    console.log("Your gold: " + player.gold + " coins\n");
    console.log("1: Yes!");
    console.log("2: No, I am just watching.");
    console.log("");
    line();

    let answer
    let valid = false
    do {
        answer = await askQuestion('Enter your choice: ')
        console.log('\n');
        switch (String(answer).toLowerCase()) {
            case '1':
                let gotIt = buy(player, price);
                if (gotIt == 1) {
                    console.log("You've upgraded your weapon!\n");
                    player.currentWeapon.upgradeWeapon();
                }
                valid = true
                break;
            case '2':
                console.log("Ok, then keep looking.\n");
                valid = true
                break;
            default:
                console.log('Invalid answer!');
        }
    } while (valid === false)
}

async function upgradeArm(player: classes.Player) {
    line();
    let price = (player.currentArmor.value / 2) + ((player.currentArmor.upgradestage + 2) * 5);
    console.log("You want to upgrade '" + player.currentArmor.name + "'? The price is " + price + " coins.");
    console.log("Your gold: " + player.gold + " coins\n");
    console.log("1: Yes!");
    console.log("2: No, I am just watching.");
    console.log("");
    line();

    let answer
    let valid = false
    do {
        answer = await askQuestion('Enter your choice: ')
        console.log('\n');
        switch (String(answer).toLowerCase()) {
            case '1':
                let gotIt = buy(player, price);
                if (gotIt == 1) {
                    console.log("You've upgraded your armor!\n");
                    player.currentArmor.upgradeArmor();
                }
                valid = true
                break;
            case '2':
                console.log("Ok, then keep looking.\n");
                valid = true
                break;
            default:
                console.log('Invalid answer!');
        }
    } while (valid === false)
}

export {buy, healPot}