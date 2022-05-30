import * as use from "./use";
import * as readline from 'readline';

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export class Weapon {
    name: String = "bare hands";
    damage: number = 1;
    rarity: number = 1;
    upgradestage: number = 0;
    value: number = 0;

    constructor(vname: String = "bare hands", vdamage: number = 1, vrarity: number = 0, value: number = 0) {
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

export class Armor {
    name: String = 'nothing';
    ap: number = 0;
    rarity: number = 1;
    upgradestage: number = 0;
    value: number = 0;

    constructor(vname: String = 'nothing', vap: number = 0, vrarity: number = 1, value: number = 0) {
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

export class Player {
    name: String = 'Testplayer'
    hp: number = 20
    currentHp: number = this.hp
    hpUp: number = 10
    dodge: number = 0.15
    xp: number = 0
    lvl: number = 1
    currentWeapon: Weapon = new Weapon()
    baseAp: number = 0
    currentArmor: Armor = new Armor()
    baseDmg: number = 0
    gold: number = 0
    potNum: number = 3

    constructor(name: String = "default") {
        this.name = name
    }

    refreshXP() {
        let lvlcap = this.lvl * 200;
        while (this.xp > lvlcap) {
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

    receiveXP(vXP: number) {
        console.log("You've received " + vXP + " XP. Let's see if you level up.");
        console.log("");
        this.xp = this.xp + vXP;
        this.refreshXP();
    }

    async choosefirstWeapon() //fragt Spieler, welche Waffe benutzt werden soll
    {
        use.line();
        console.log("Which weapon do you want to choose?");
        console.log("");
        console.log("1: rusty knife");
        console.log("2: old longsword");
        console.log("3: broken bow");
        console.log("");
        use.line();

        let valid = false
        do {
            let answer = await use.askQuestion('Enter your choice: ')
            switch (String(answer).toLowerCase()) {
                case '1':
                    console.log('The weapon which stands for silent death.');
                    this.currentWeapon = new Weapon("rusty knife", 3, 1, 15)
                    valid = true
                    break;
                case '2':
                    console.log('The perfect start for a knight.');
                    this.currentWeapon = new Weapon("old longsword", 3, 1, 15)
                    valid = true
                    break;
                case '3':
                    console.log('The best starting weapon as an archer.');
                    this.currentWeapon = new Weapon("broken bow", 3, 1, 15)
                    valid = true
                    break;
                default:
                    console.log('Invalid answer!');
            }
        } while (valid === false)


        console.log("You received the '" + this.currentWeapon.name + "'!");
        console.log("");
        this.currentArmor = new Armor("leather armor", 3, 1, 10);
        console.log("You've also received an armor: '" + this.currentArmor.name + "'.");
        console.log("");
    }

    receiveGold(vGold: number) {
        console.log("You've received " + vGold + " Gold.");
        console.log("");
        this.gold = this.gold + vGold;
        console.log("Now you've " + this.gold + " Coins in your pocket.");
        console.log("");
    }

    info() {
        use.line();
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
        use.line();
    }
}

export class Enemy {
    name: String = 'Testenemy'
    lvl: number = 1

    hp: number = 5
    baseHp: number = 5
    damage: number = 5
    baseDmg: number = 5
    xpdrop: number = 5
    baseXpDrop: number = 5
    golddrop: number = 5
    baseGoldDrop: number = 5

    constructor(name: String = "default", baseDmg: number, baseHp: number, baseXpDrop: number, baseGoldDrop: number) {
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
        use.line();
        console.log("Name: " + this.name);
        console.log("Level: " + this.lvl);
        console.log("Hp: " + this.hp);
        console.log("Damage: " + this.damage);
        console.log("")
        use.line();
    }
}