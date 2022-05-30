import * as classes from "./classes"

test('test receiveXP 1 lvl', () => {
    let p = new classes.Player("Testplayer")

    p.receiveXP(200)

    expect(p.lvl).toBe(2)
    expect(p.hp).toBe(30)
    expect(p.baseAp).toBe(2)
    expect(p.baseDmg).toBe(2)
    expect(p.xp).toBe(0)
});

test('test receiveXP 2.5 lvl', () => {
    let p = new classes.Player("Testplayer")

    p.receiveXP(900)

    expect(p.lvl).toBe(3)
    expect(p.xp).toBe(300)
});

test('test receiveGold', () => {
    let p = new classes.Player("Testplayer")

    p.receiveGold(1000)

    expect(p.gold).toBe(1000)
});

test('test upgradeWeapon success', () => {
    let w = new classes.Weapon("Testweapon", 10, 1, 10)

    w.upgradeWeapon()

    expect(w.damage).toBe(13)
    expect(w.value).toBe(13)
    expect(w.upgradestage).toBe(1)
});

test('test upgradeWeapon failure', () => {
    let w = new classes.Weapon("Testweapon", 10, 1, 10)
    w.upgradestage = 5

    w.upgradeWeapon()

    expect(w.damage).toBe(10)
    expect(w.value).toBe(10)
    expect(w.upgradestage).toBe(5)
});

test('test upgradeArmor success', () => {
    let a = new classes.Armor("Testarmor", 10, 1, 10)

    a.upgradeArmor()

    expect(a.ap).toBe(13)
    expect(a.value).toBe(13)
    expect(a.upgradestage).toBe(1)
});

test('test upgradeArmor failure', () => {
    let a = new classes.Armor("Testarmor", 10, 1, 10)
    a.upgradestage = 5

    a.upgradeArmor()

    expect(a.ap).toBe(10)
    expect(a.value).toBe(10)
    expect(a.upgradestage).toBe(5)
});