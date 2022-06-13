import {askQuestion, line} from "./functions";
import * as use from "./use";
import * as classes from "./classes";

async function main() {

    let p = new classes.Player()

    console.log("\nWelcome to my little text adventure game! My name is Marius and I will lead you through the game, by asking you what you want to do.");

    let name = await askQuestion('First, please tell me your name. ')
    p = new classes.Player(String(name))

    console.log(`\nHello ${p.name}, nice to meet you!`)

    await p.choosefirstWeapon()
    let answer;

    do {
        line();
        console.log("What do you want to do?");
        console.log("");
        console.log("1: Get some info about my player.");
        console.log("2: Go to a town.");
        console.log("3: Search for a dungeon.");
        console.log("4: Exit the game.");
        console.log("");
        line();

        let valid = false
        do {
            answer = await askQuestion('Enter your choice: ')
            console.log('\n');
            switch (String(answer).toLowerCase()) {
                case '1':
                    await p.info()
                    valid = true
                    break;
                case '2':
                    await use.visitTown(p)
                    valid = true
                    break;
                case '3':
                    await use.goDungeon(p)
                    valid = true
                    break;
                case '4':
                    use.exitGame(p)
                    valid = true
                    break;
                default:
                    console.log('Invalid answer!');
            }
        } while (valid === false)

    } while (answer != '4')
}

main()