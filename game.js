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
async function main() {
    let p = new classes.Player();
    console.log("\nWelcome to my little text adventure game! My name is Marius and I will lead you through the game, by asking you what you want to do.");
    let name = await use.askQuestion('First, please tell me your name. ');
    p = new classes.Player(String(name));
    console.log(`\nHello ${p.name}, nice to meet you!`);
    await p.choosefirstWeapon();
    let answer;
    do {
        use.line();
        console.log("What do you want to do?");
        console.log("");
        console.log("1: Get some info about my player.");
        console.log("2: Go to a town.");
        console.log("3: Search for a dungeon.");
        console.log("4: Exit the game.");
        console.log("");
        use.line();
        let valid = false;
        do {
            answer = await use.askQuestion('Enter your choice: ');
            console.log('\n');
            switch (String(answer).toLowerCase()) {
                case '1':
                    await p.info();
                    valid = true;
                    break;
                case '2':
                    await use.visitTown(p);
                    valid = true;
                    break;
                case '3':
                    await use.goDungeon(p);
                    valid = true;
                    break;
                case '4':
                    use.exitGame(p);
                    valid = true;
                    break;
                default:
                    console.log('Invalid answer!');
            }
        } while (valid === false);
    } while (answer != '4');
}
main();
