
/**********************Work with canvas**********************/
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1800
canvas.height = 700

c.fillRect(0, 0, canvas.width, canvas.height)
const gravity = 0.2


/**********************Create player and enemy**********************/
class Sprite{

    constructor({position, velocity}){
        this.position = position
        this.velocity = velocity
        this.height = 150

    }

    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 50, this.height)
    }

    update(){
        this.draw()

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if(this.position.y + this.height + this.velocity.y >= canvas.height)
            this.velocity.y = 0
        else
            this.velocity.y += gravity
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
    }
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


let lastKey

function animate(){

    window.requestAnimationFrame(animate)

    c.fillStyle = 'black'
    c.fillRect(0,0, canvas.width, canvas.height)

    player.update()
    enemy.update()

    player.velocity.x = 0

    if(keys.a.pressed && lastKey === 'a'){
        player.velocity.x = -1
    }else if (keys.d.pressed && lastKey === 'd'){
        player.velocity.x = 1
    }

    enemy.velocity.x = 0

    if(keys.ArrowRight.pressed && lastKey === 'ArrowRight'){
        enemy.velocity.x = 1
    }else if (keys.ArrowLeft.pressed && lastKey === 'ArrowLeft'){
        enemy.velocity.x = -1
    }
}

animate()


window.addEventListener('keydown', (event) => {
    switch(event.key){   
        case 'a':
            keys.a.pressed = true 
            lastKey = 'a'    
        break
        case 'd':
            keys.d.pressed = true 
            lastKey = 'd'     
        break
        case 'w':
            keys.w.pressed = true 
            lastKey = 'w'    
        break
        case 'ArrowRight':
            keys.ArrowRight.pressed = true 
            lastKey = 'ArrowRight'      
        break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            lastKey = 'ArrowLeft'       
        break
    }
    console.log(event.key)
})

window.addEventListener('keyup', (event) => {
    switch(event.key){
        case 'a':
            keys.a.pressed = false  
        break
        case 'd':
            keys.d.pressed = false    
        break
        case 'w':
            keys.w.pressed = false  
        break
        case 'ArrowRight':
            keys.ArrowRight.pressed = false   
        break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false     
        break
    }
    console.log(event.key)
})