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
exports.Enemy = exports.Player = exports.Armor = exports.Weapon = void 0;
const readline = __importStar(require("readline"));
const functions_1 = require("./functions");
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
class Weapon {
    constructor(vname = "bare hands", vdamage = 1, vrarity = 0, value = 0) {
        this.name = "bare hands";
        this.damage = 1;
        this.rarity = 1;
        this.upgradestage = 0;
        this.value = 0;
        this.name = vname;
        this.damage = vdamage;
        this.rarity = vrarity;
        this.value = value;
    }
    upgradeWeapon() {
        if (this.upgradestage < 5) {
            this.damage = this.damage + (this.damage / 5) + this.rarity;
            this.value = this.value + (this.value / 5) + this.rarity;
            this.upgradestage++;
            console.log("Now your weapon deals " + this.damage + " damage and is value " + this.value + " coins. It is now on upgradestage " + this.upgradestage + ".");
            console.log("");
        }
        else {
            console.log("You've upgraded your weapon 5 times already, it can't be better anymore!");
            console.log("");
        }
    }
    info() {
        console.log("Name: " + this.name);
        console.log("Damage: " + this.damage);
        console.log("Value : " + this.value);
        console.log("Rarity: " + this.rarity);
        console.log("Upgradestage: " + this.upgradestage + "\n");
    }
}
exports.Weapon = Weapon;
class Armor {
    constructor(vname = 'nothing', vap = 0, vrarity = 1, value = 0) {
        this.name = 'nothing';
        this.ap = 0;
        this.rarity = 1;
        this.upgradestage = 0;
        this.value = 0;
        this.name = vname;
        this.ap = vap;
        this.rarity = vrarity;
        this.value = value;
    }
    upgradeArmor() {
        if (this.upgradestage < 5) {
            this.ap = this.ap + (this.ap / 5) + this.rarity;
            this.value = this.value + (this.value / 5) + this.rarity;
            this.upgradestage++;
            console.log("Now your armor has " + this.ap + " ArmorPoints and is value " + this.value + " coins. It is now on upgradestage " + this.upgradestage + ".");
            console.log("");
        }
        else {
            console.log("You've upgraded your armor 5 times already, it can't be better anymore!");
            console.log("");
        }
    }
    info() {
        console.log("Name: " + this.name);
        console.log("ArmorPoints: " + this.ap);
        console.log("Value : " + this.value);
        console.log("Rarity: " + this.rarity);
        console.log("Upgradestage: " + this.upgradestage);
    }
}
exports.Armor = Armor;
class Player {
    constructor(name = "default") {
        this.name = 'Testplayer';
        this.hp = 20;
        this.currentHp = this.hp;
        this.hpUp = 10;
        this.dodge = 0.15;
        this.xp = 0;
        this.lvl = 1;
        this.currentWeapon = new Weapon();
        this.baseAp = 0;
        this.currentArmor = new Armor();
        this.baseDmg = 0;
        this.gold = 0;
        this.potNum = 3;
        this.name = name;
    }
    refreshXP() {
        let lvlcap = this.lvl * 200;
        while (this.xp >= lvlcap) {
            this.xp = this.xp - lvlcap;
            this.lvl++;
            let dif = this.hp - this.currentHp;
            this.hp = this.hp + this.hpUp;
            this.currentHp = this.hp - dif;
            lvlcap = this.lvl * 200;
            this.baseDmg += this.lvl;
            this.baseAp += this.lvl;
            console.log("You're now Level " + this.lvl + ". Congratulations!");
            console.log("");
        }
        console.log("You've " + this.xp + " XP left. You need " + (lvlcap - this.xp) + " more XP to reach Level " + (this.lvl + 1) + ".");
        console.log("");
    }
    receiveXP(vXP) {
        console.log("You've received " + vXP + " XP. Let's see if you level up.");
        console.log("");
        this.xp = this.xp + vXP;
        this.refreshXP();
    }
    async choosefirstWeapon() {
        (0, functions_1.line)();
        console.log("Which weapon do you want to choose?");
        console.log("");
        console.log("1: rusty knife");
        console.log("2: old longsword");
        console.log("3: broken bow");
        console.log("");
        (0, functions_1.line)();
        let valid = false;
        do {
            let answer = await (0, functions_1.askQuestion)('Enter your choice: ');
            switch (String(answer).toLowerCase()) {
                case '1':
                    console.log('The weapon which stands for silent death.');
                    this.currentWeapon = new Weapon("rusty knife", 3, 1, 15);
                    valid = true;
                    break;
                case '2':
                    console.log('The perfect start for a knight.');
                    this.currentWeapon = new Weapon("old longsword", 3, 1, 15);
                    valid = true;
                    break;
                case '3':
                    console.log('The best starting weapon as an archer.');
                    this.currentWeapon = new Weapon("broken bow", 3, 1, 15);
                    valid = true;
                    break;
                default:
                    console.log('Invalid answer!');
            }
        } while (valid === false);
        console.log("You received the '" + this.currentWeapon.name + "'!");
        console.log("");
        this.currentArmor = new Armor("leather armor", 3, 1, 10);
        console.log("You've also received an armor: '" + this.currentArmor.name + "'.");
        console.log("");
    }
    receiveGold(vGold) {
        console.log("You've received " + vGold + " Gold.");
        console.log("");
        this.gold = this.gold + vGold;
        console.log("Now you've " + this.gold + " Coins in your pocket.");
        console.log("");
    }
    info() {
        (0, functions_1.line)();
        console.log("Your name: " + this.name);
        console.log("Your HP: " + this.currentHp + "/" + this.hp);
        console.log("Your base damage: " + this.baseDmg);
        console.log("Your base AP: " + this.baseAp);
        console.log("Your gold: " + this.gold + " coins");
        console.log("Your number of healpotions: " + this.potNum);
        console.log("Your level: " + this.lvl + " with " + this.xp + " XP left\n");
        console.log("Your weapon: ");
        this.currentWeapon.info();
        console.log("Your armor: ");
        this.currentArmor.info();
        (0, functions_1.line)();
    }
}
exports.Player = Player;
class Enemy {
    constructor(name = "default", baseDmg, baseHp, baseXpDrop, baseGoldDrop) {
        this.name = 'Testenemy';
        this.lvl = 1;
        this.hp = 5;
        this.baseHp = 5;
        this.damage = 5;
        this.baseDmg = 5;
        this.xpdrop = 5;
        this.baseXpDrop = 5;
        this.golddrop = 5;
        this.baseGoldDrop = 5;
        this.name = name;
        this.baseDmg = baseDmg;
        this.baseHp = baseHp;
        this.baseXpDrop = baseXpDrop;
        this.baseGoldDrop = baseGoldDrop;
        this.damage = baseDmg * this.lvl;
        this.hp = baseHp * this.lvl;
        this.xpdrop = baseXpDrop * this.lvl;
        this.golddrop = baseGoldDrop * this.lvl;
    }
    info() {
        (0, functions_1.line)();
        console.log("Name: " + this.name);
        console.log("Level: " + this.lvl);
        console.log("Hp: " + this.hp);
        console.log("Damage: " + this.damage);
        console.log("");
        (0, functions_1.line)();
    }
}
exports.Enemy = Enemy;
