import * as use from "./use";
import * as classes from "./classes"

test('test buy success', () => {
    let p = new classes.Player("Testplayer")
    p.gold = 1000

    expect(use.buy(p, 500)).toBe(1)
    expect(p.gold).toBe(500)
});

test('test buy failure', () => {
    let p = new classes.Player("Testplayer")
    p.gold = 1000

    expect(use.buy(p, 2000)).toBe(0)
    expect(p.gold).toBe(1000)
});

test('test healPot-usage', () => {
    let p = new classes.Player("Testplayer")
    p.currentHp = 15


    use.healPot(p)
    expect(p.currentHp).toBe(20)
    expect(p.potNum).toBe(2)
});