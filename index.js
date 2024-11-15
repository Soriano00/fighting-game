
/**********************Work with canvas**********************/
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1800
canvas.height = 700

c.fillRect(0, 0, canvas.width, canvas.height)
const gravity = 0.7


/**********************Create player and enemy**********************/
class Sprite{

    constructor({position, velocity, color = 'red', offset}){
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.canJump = true
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            } ,
            offset, // Same as offset: offset
            width: 100,
            height: 50
        }
        this.color = color
        this.isAttacking

    }

    draw(){
        c.fillStyle = this.color

        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        //Draw attackBox
        if(this.isAttacking){
            c.fillStyle = 'yellow'
            c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        }
        }

    update(){
        this.draw()
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if(this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0
            this.canJump = true
        }
        else
            this.velocity.y += gravity
    }


    attack(){

        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 45)

    }
}

const player = new Sprite( {
    position:{
        x: 200,
        y: 0
    },
    velocity:{
        x: 0,
        y: 0
    },
    offset:{
        x: 0,
        y: 0
    }
})


const enemy = new Sprite( {
    position:{
        x: 1600,
        y: 0
    },
    velocity:{
        x: 0,
        y: 0
    },
    offset:{
        x: -50,
        y: 0
    },
    color: 'green'
})


console.log(player)

/**********************Movement with keys**********************/

const keys = {

    a:{
        pressed: false
    },
    d:{
        pressed: false
    },
    ArrowRight:{
        pressed: false
    },
    ArrowLeft:{
        pressed: false
    }

}


function rectangularCollision({ rectangle1, rectangle2 }){
    return (rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x  && 
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height )
}


function animate(){

    window.requestAnimationFrame(animate)

    c.fillStyle = 'black'
    c.fillRect(0,0, canvas.width, canvas.height)

    player.update()
    enemy.update()


    //Player movement
    player.velocity.x = 0

    if(keys.a.pressed && player.lastKey === 'a'){
        player.velocity.x = -3
    }else if (keys.d.pressed && player.lastKey === 'd'){
        player.velocity.x = 3
    }

    //Enemy movement
    enemy.velocity.x = 0

    if(keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight'){
        enemy.velocity.x = 3
    }else if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft'){
        enemy.velocity.x = -3
    }


    //Detect collision
    if(rectangularCollision( {
        rectangle1: player,
        rectangle2: enemy
        }) &&
        player.isAttacking
    ){
        player.isAttacking = false
        console.log('hit')
    }


    if(rectangularCollision( {
        rectangle1: enemy,
        rectangle2: player
        }) &&
        enemy.isAttacking
    ){
        enemy.isAttacking = false
        console.log('enemy hit')
    }

}

animate()


window.addEventListener('keydown', (event) => {
    switch(event.key){  
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
            if(player.canJump){
                player.velocity.y = -20
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
            if(enemy.canJump){
                enemy.velocity.y = -20
                enemy.canJump = false
            }  
        break
        case 'ArrowDown':
            enemy.attack()
        break

    }
    
})

window.addEventListener('keyup', (event) => {
    switch(event.key){
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