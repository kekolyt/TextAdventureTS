//general overall methods -----------------------------------------------------------------------------------------------------------------------------

export function line() //creates a line for better looking texts
{
    console.log("---------------------------------------------------------------------------------------------------------------------------");
    console.log("");
}

export function randFromIntervall(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const readline = require('readline');

export function askQuestion(query: string) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}