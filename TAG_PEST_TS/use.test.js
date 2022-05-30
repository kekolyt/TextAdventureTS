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
const use = __importStar(require("./use"));
const classes = __importStar(require("./classes"));
test('test buy success', () => {
    const p = new classes.Player("Testplayer");
    p.gold = 1000;
    expect(use.buy(p, 500)).toBe(1);
    expect(p.gold).toBe(500);
});
test('test buy failure', () => {
    const p = new classes.Player("Testplayer");
    p.gold = 1000;
    expect(use.buy(p, 2000)).toBe(0);
    expect(p.gold).toBe(1000);
});
test('test healPot-usage', () => {
    const p = new classes.Player("Testplayer");
    p.currentHp = 15;
    use.healPot(p);
    expect(p.currentHp).toBe(20);
    expect(p.potNum).toBe(2);
});
