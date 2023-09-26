controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 5 1 . . . . . . . . 
        . . . 5 5 . 5 5 . . . . . . . . 
        . 5 5 5 5 5 5 5 2 2 . . . . . . 
        . . . 5 1 . 5 5 . . . . . . . . 
        . . . . . . 5 5 . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySprite, 200, 0)
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    sprites.destroy(status.spriteAttachedTo())
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -10
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprites.destroy(otherSprite, effects.disintegrate, 500)
    scene.cameraShake(4, 500)
})
let statusbar: StatusBarSprite = null
let EnemyShip: Sprite = null
let projectile: Sprite = null
let mySprite: Sprite = null
effects.starField.startScreenEffect()
mySprite = sprites.create(img`
    . . . . . . . . . . . 6 6 . . . 
    . . . . . . . . . f f 6 6 . . . 
    . . . . . . . 6 f 6 f 6 6 . . . 
    . . . . . 6 6 6 6 6 f 6 6 . . . 
    . . . 6 6 6 6 6 6 6 f 6 6 . . . 
    . f f 5 5 5 5 5 5 5 5 5 5 4 4 4 
    f 9 5 9 5 9 5 9 5 9 5 9 5 . . . 
    . f f 5 5 5 5 5 5 5 5 5 5 4 4 4 
    . . . 6 6 6 6 6 6 6 f 6 6 . . . 
    . . . . . 6 6 6 6 6 f 6 6 . . . 
    . . . . . . . 6 f 6 f 6 6 . . . 
    . . . . . . . . . f f 6 6 . . . 
    . . . . . . . . . . . 6 6 . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
info.setLife(5)
let EnemySpeed = 20
let EnemySpawnTime = 2000
game.onUpdateInterval(2000, function () {
    EnemySpeed += 5
    EnemySpeed = Math.min(EnemySpeed, 50)
    EnemySpawnTime += 200
    EnemySpawnTime = Math.min(EnemySpawnTime, 500)
})
forever(function () {
    EnemyShip = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . 3 . . . . . . . . 
        . . . . . . 3 3 . . . . . . . . 
        . . . . . 2 2 3 . . . 2 . . . . 
        . . . . 2 2 5 3 5 4 4 2 2 5 . . 
        . . . 2 2 2 2 2 . . . 2 . . . . 
        . . 3 3 2 2 2 2 . . . . . . . . 
        . . . 3 3 2 2 2 . . . . . . . . 
        . . . . 3 2 2 2 . . . 2 . . . . 
        . . . . . 2 2 2 5 4 4 2 2 5 . . 
        . . . . . . 2 2 . . . 2 . . . . 
        . . . . . . . 2 . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    EnemyShip.x = scene.screenWidth()
    EnemyShip.vx = 0 - EnemySpeed
    EnemyShip.y = randint(10, scene.screenWidth() - -10)
    statusbar = statusbars.create(10, 2, StatusBarKind.EnemyHealth)
    statusbar.attachToSprite(EnemyShip)
    pause(EnemySpawnTime)
})
game.onUpdateInterval(500, function () {
    EnemySpeed += 10
    EnemySpeed = Math.min(EnemySpeed, 50)
})
