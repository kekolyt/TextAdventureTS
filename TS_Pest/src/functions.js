"use strict";
//general overall methods -----------------------------------------------------------------------------------------------------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
exports.askQuestion = exports.randFromIntervall = exports.line = void 0;
function line() {
    console.log("---------------------------------------------------------------------------------------------------------------------------");
    console.log("");
}
exports.line = line;
function randFromIntervall(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
exports.randFromIntervall = randFromIntervall;
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
