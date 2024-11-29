/**********************Work with canvas**********************/
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)
const gravity = 0.4

/**********************Create player and enemy**********************/

const background = new Sprite({
    position:{
        x: 0,
        y: 0
    },
    imageSrc: '../assets/background.png'

})


const shop = new Sprite({
    position:{
        x: 600,
        y: 128
    },
    imageSrc: '../assets/shop.png',
    scale: 2.75,
    framesMax: 6

})

const player = new Fighter({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    }, 
    imageSrc: '../assets/samuraiMack/Idle.png',
    framesMax: 8,
    scale: 2.5,
    offset: {
        x: 215,
        y: 157
    },
    sprites: {
        idle: {
            imageSrc: '../assets/samuraiMack/Idle.png',
            framesMax: 8
        },
        run: {
            imageSrc: '../assets/samuraiMack/Run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: '../assets/samuraiMack/Jump.png',
            framesMax: 2
        },       
        fall: {
            imageSrc: '../assets/samuraiMack/Fall.png',
            framesMax: 2
        },        
        attack1: {
            imageSrc: '../assets/samuraiMack/Attack1.png',
            framesMax: 6
        }
    }
})

const enemy = new Fighter({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
   
    offset: {
        x: -50,
        y: 0
    },
    imageSrc: '../assets/kenji/Idle.png',
    framesMax: 4,
    scale: 2.5,
    offset: {
        x: 215,
        y: 157
    },
    sprites: {
        idle: {
            imageSrc: '../assets/kenji/Idle.png',
            framesMax: 4
        },
        run: {
            imageSrc: '../assets/kenji/Run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: '../assets/kenji/Jump.png',
            framesMax: 2
        },       
        fall: {
            imageSrc: '../assets/kenji/Fall.png',
            framesMax: 2
        },        
        attack1: {
            imageSrc: '../assets/kenji/Attack1.png',
            framesMax: 4
        }
    }
})

console.log(player)

/**********************Movement with keys**********************/
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}


decreaseTimer()

function animate() {
    window.requestAnimationFrame(animate)

    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()

    player.update()
    enemy.update()

    // Update attackBox direction
    updateAttackBoxDirection()

    // Player movement
    player.velocity.x = 0

   

    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -3
        player.switchSprite('run')
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 3
        player.switchSprite('run')
    }else{
        player.switchSprite('idle')
    }

    if(player.velocity.y < 0){
        player.switchSprite('jump')
    }else if (player.velocity.y > 0){ 
        player.switchSprite('fall')
    }

    // Enemy movement
    enemy.velocity.x = 0

    if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 3
        enemy.switchSprite('run')
    } else if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -3
        enemy.switchSprite('run')
    }else{
        enemy.switchSprite('idle')
    }

    if(enemy.velocity.y < 0){
        enemy.switchSprite('jump')
    }else if (enemy.velocity.y > 0){ 
        enemy.switchSprite('fall')
    }

    // Detect collision
    if (rectangularCollision({
        rectangle1: player,
        rectangle2: enemy
    }) &&
        player.isAttacking
    ) {
        player.isAttacking = false
        enemy.health -= 10
        document.querySelector('#enemyHealth').style.width = enemy.health + '%'
    }

    if (rectangularCollision({
        rectangle1: enemy,
        rectangle2: player
    }) &&
        enemy.isAttacking
    ) {
        enemy.isAttacking = false
        player.health -= 10
        document.querySelector('#playerHealth').style.width = player.health + '%'
    }


    //end game based on health

    if(enemy.health <= 0 || player.health <= 0){
        determineWinner({player, enemy, timerId})
    }
}

animate()

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        //For player 
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'w':
            if (player.canJump) {
                player.velocity.y = -14
                player.canJump = false
            }
            break
        case ' ':
            player.attack()
            break

        //For enemy
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp':
            if (enemy.canJump) {
                enemy.velocity.y = -14
                enemy.canJump = false
            }
            break
        case 'ArrowDown':
            enemy.attack()
            break
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        //For player 
        case 'a':
            keys.a.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break

        //For enemy
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
    }
})
