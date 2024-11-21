
function rectangularCollision({ rectangle1, rectangle2 }) {
    return (rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height)
}

function updateAttackBoxDirection() {
    // Update player's attackBox direction based on enemy's position
    if (player.position.x < enemy.position.x) {
        player.attackBox.offset.x = 0 // Attack box faces right
    } else {
        player.attackBox.offset.x = -player.attackBox.width // Attack box faces left
    }

    // Update enemy's attackBox direction based on player's position
    if (enemy.position.x < player.position.x) {
        enemy.attackBox.offset.x = 0 // Attack box faces right
    } else {
        enemy.attackBox.offset.x = -enemy.attackBox.width // Attack box faces left
    }
}


function determineWinner({player, enemy, timerId}){

    clearTimeout(timerId)

    document.querySelector('#displayText').style.display = 'flex'
    
    if (player.health === enemy.health ){
        document.querySelector('#displayText').innerHTML = 'Tie'
    }else if(player.health > enemy.health ){
        document.querySelector('#displayText').innerHTML = 'Player 1 WIN'
    }else if(player.health < enemy.health ){
        document.querySelector('#displayText').innerHTML = 'Player 2 WIN'
    }
}


let timer = 60
let timerId

function decreaseTimer(){

    if(timer > 0){
        timerId = setTimeout(decreaseTimer, 1000)
        timer --  
        document.querySelector('#timer').innerHTML = timer 
    }

    if(timer === 0){

        determineWinner({player, enemy, timerId})
    }
    

}