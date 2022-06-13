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
const classes = __importStar(require("./classes"));
test('test receiveXP 1 lvl', () => {
    let p = new classes.Player("Testplayer");
    p.receiveXP(200);
    expect(p.lvl).toBe(2);
    expect(p.hp).toBe(30);
    expect(p.baseAp).toBe(2);
    expect(p.baseDmg).toBe(2);
    expect(p.xp).toBe(0);
});
test('test receiveXP 2.5 lvl', () => {
    let p = new classes.Player("Testplayer");
    p.receiveXP(900);
    expect(p.lvl).toBe(3);
    expect(p.xp).toBe(300);
});
test('test receiveGold', () => {
    let p = new classes.Player("Testplayer");
    p.receiveGold(1000);
    expect(p.gold).toBe(1000);
});
test('test upgradeWeapon success', () => {
    let w = new classes.Weapon("Testweapon", 10, 1, 10);
    w.upgradeWeapon();
    expect(w.damage).toBe(13);
    expect(w.value).toBe(13);
    expect(w.upgradestage).toBe(1);
});
test('test upgradeWeapon failure', () => {
    let w = new classes.Weapon("Testweapon", 10, 1, 10);
    w.upgradestage = 5;
    w.upgradeWeapon();
    expect(w.damage).toBe(10);
    expect(w.value).toBe(10);
    expect(w.upgradestage).toBe(5);
});
test('test upgradeArmor success', () => {
    let a = new classes.Armor("Testarmor", 10, 1, 10);
    a.upgradeArmor();
    expect(a.ap).toBe(13);
    expect(a.value).toBe(13);
    expect(a.upgradestage).toBe(1);
});
test('test upgradeArmor failure', () => {
    let a = new classes.Armor("Testarmor", 10, 1, 10);
    a.upgradestage = 5;
    a.upgradeArmor();
    expect(a.ap).toBe(10);
    expect(a.value).toBe(10);
    expect(a.upgradestage).toBe(5);
});
