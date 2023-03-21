const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576
canvas.style.border="10px ridge black"

c.fillRect(0,0,canvas.width,canvas.height)
const gravity = 0.8

var rain = [];

function main()
{
    for(var z = 0; z <=300; z++)
    {
    rain[z] = new rainDrop();
    }
    init();
}

function init(){

    
    for(var w = 0; w< rain.length; w++)
    {
       rain[w].updateRain();
       rain[w].drawRain();
    }

    requestAnimationFrame(init);
}


function rainDrop(){
    this.x = Math.random()*canvas.width;
    this.y = (Math.random()* 80)-80;                        //10  10          80  80
    this.height = (Math.random()*5)+5;                      //1   2           5   5
    this.speed = (Math.random()*6)+3;                       //2   1           6   3

    this.updateRain = function()
    {
        this.y += this.speed;

        if(this.y + this.height >= canvas.height)
        {
            this.y = (Math.random()*80)-80;                //10
        }
    }

    this.drawRain = function()
    {
        c.beginPath();
        c.strokeStyle ="white";
        c.moveTo(this.x,this.y);
        c.lineTo(this.x,this.y + this.height);
        c.stroke();
    }
}

main();



const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/photonoto.png'
})

const campfire = new Sprite({
    position: {
        x: 455,
        y: 425
    },
    imageSrc: './img/Campfire36.png',
    scale: 3.5,
    framesMax: 4
})

const player = new Fighter({
    position:{
    x:0,
    y:0
    },
    velocity:{
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    },
    imageSrc: './img/Wizard 1/Idle.png',
    framesMax: 8,
    scale: 1.9,
    offset: {
        x:50,
        y:100
    },
    sprites:{
        idle: {
            imageSrc: './img/Wizard 1/Idle.png',
            framesMax: 8
        },
        run: {
            imageSrc: './img/Wizard 1/Run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: './img/Wizard 1/Jump.png',
            framesMax: 2
        },
        fall:{
            imageSrc: './img/Wizard 1/Fall.png',
            framesMax: 2
        },
        attack1:{
            imageSrc: './img/Wizard 1/Attack1.png',
            framesMax: 8
        },
        takehit:{
            imageSrc: './img/Wizard 1/Take hit.png',
            framesMax: 3
        },
        death: {
            imageSrc: './img/Wizard 1/Death.png',
            framesMax: 7
        }
    },
    attackBox: {
        offset :{
            x: 100,         //100
            y: 05           //50
        },
        width: 160,         //160
        height: 50          //50
    }
})



const enemy = new Fighter({
    position:{
    x:700,
    y:100
    },
    velocity:{
        x: 0,
        y: 0
    },
    color: 'orange',
    offset: {
        x: -50,
        y: 0
    },
    imageSrc: './img/Wizard Pack/Idle.png',
    framesMax: 6,
    scale: 1.4,
    offset: {
        x:50,        //50
        y:-20        //-20
    },
    sprites:{
        idle: {
            imageSrc: './img/Wizard Pack/Idle.png',
            framesMax: 6
        },
        run: {
            imageSrc: './img/Wizard Pack/Run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: './img/Wizard Pack/Jump.png',
            framesMax: 2
        },
        fall:{
            imageSrc: './img/Wizard Pack/Fall.png',
            framesMax: 2
        },
        attack1:{
            imageSrc: './img/Wizard Pack/Attack2.png',
            framesMax: 8
        },
        takehit: {
            imageSrc: './img/Wizard Pack/Hit.png',
            framesMax: 4
        },
        death: {
            imageSrc: './img/Wizard Pack/Death.png',
            framesMax: 6
        }
    },
    attackBox: {
        offset :{
            x: -170,      //-170
            y: 50         //50
        },
        width: 170,       //170
        height: 50        //50
    }

})



console.log(player)

const keys = {
    a:{
        pressed: false
    },
    d:{
        pressed: false
    },
    w:{
        pressed: false
    },
    ArrowRight:{
        pressed: false
    },
    ArrowLeft:{
        pressed: false
    }
}

function strikeRectangular({rectangle1,rectangle2}) {                                 //rectangle collision
return(
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  )
}

function determineWinner({player,enemy,timerId}) {
    clearTimeout(timerId)
    document.querySelector('#displayText').style.display = 'flex'
    if (player.health === enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Tie'
    } else if (player.health > enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Victory Evil Wizard'
    } else if (player.health < enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Victory Wizard'
    }
}

let timer = 60
let timerId
function decreaseTimer()
{  if(timer > 0)
    { timerId = setTimeout(decreaseTimer, 1000)
        timer --

        document.querySelector('#timer').innerHTML = timer
    }

    if (timer === 0){
     determineWinner({player,enemy,timerId})
    }

}

decreaseTimer()

//rain asset




function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0,0,canvas.width,canvas.height)
    background.update()
    campfire.update()
    //platform.draw()
    for(var w = 0; w< rain.length; w++)
    {
       rain[w].updateRain();
       rain[w].drawRain();
    }
    
    c.fillStyle = 'rgba(255,255,255,0.05)'
    c.fillRect(0,0,canvas.width,canvas.height)
    
    player.update()
    enemy.update()
    

player.velocity.x = 0
enemy.velocity.x = 0
//player move

    if (keys.a.pressed && player.lastKey === 'a'){
        player.velocity.x = -5
        player.switchSprite('run')
    }else if (keys.d.pressed && player.lastKey === 'd'){
        player.velocity.x = 5
        player.switchSprite('run')
    }else{
        player.switchSprite('idle')
    }

    if (player.velocity.y < 0){
        player.switchSprite('jump')
    }else if (player.velocity.y > 0){
        player.switchSprite('fall')
    }

//enemy move
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft'){
    enemy.velocity.x = -5
    enemy.switchSprite('run')
   }else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight'){
    enemy.velocity.x = 5
    enemy.switchSprite('run')
   }else{
    enemy.switchSprite('idle')
   }

   if (enemy.velocity.y < 0){
    enemy.switchSprite('jump')
}else if (enemy.velocity.y > 0){
    enemy.switchSprite('fall')
}

   //strike
if(
    strikeRectangular({
        rectangle1: player,
        rectangle2: enemy,
    }) &&
    player.isAttacking && player.frameCurrent === 4
   ) {
       enemy.takehit()
    player.isAttacking = false

    

    gsap.to('#enemyHealth',{
        width:enemy.health + '%'
})

    }

    // player miss strike
    if(player.isAttacking && player.frameCurrent === 4){
        player.isAttacking = false
    }

    //plater get hit

    if(
        strikeRectangular({
            rectangle1: enemy,
            rectangle2: player,
        }) &&
        enemy.isAttacking && enemy.frameCurrent === 4
       ) {
           player.takehit()
        enemy.isAttacking = false
    
        gsap.to('#playerHealth',{
            width:player.health + '%'
    })
}

    // enemy miss strike
    if(enemy.isAttacking && enemy.frameCurrent === 4){
        enemy.isAttacking = false
    }

     //determine winner
     if(enemy.health <= 0 || player.health <= 0)
     {
         determineWinner({player,enemy,timerId})
     }   

     //platform
     /*if(player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y
        && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width) {
        player.velocity.y = 0
     }
     if(enemy.position.y + enemy.height <= platform.position.y && enemy.position.y + player.height + enemy.velocity.y >= platform.position.y
        && enemy.position.x + enemy.width >= platform.position.x && enemy.position.x <= platform.position.x + platform.width) {
        enemy.velocity.y = 0
     }
     */
}


animate()

window.addEventListener('keydown',(event) => {
if (!player.dead){
//player
    switch(event.key){
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break
        case 'w':
            player.velocity.y = -20
            break
        case ' ':
            player.attack()
            break
         //player block/enemy//
    }    

}
    
    if(!enemy.dead){
    switch(event.key){
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp':
            enemy.velocity.y = -20
            break    
        case 'ArrowDown':
            enemy.attack()   
            break
    }
   }

})

window.addEventListener('keyup',(event) => {
//taste player
    switch(event.key){
        case 'd':
            keys.d.pressed = false 
            break
        case 'a':
            keys.a.pressed = false
            break
 }
 //taste enemy
switch(event.key){
    case 'ArrowRight':
        keys.ArrowRight.pressed = false
        break
    case 'ArrowLeft':
        keys.ArrowLeft.pressed = false
        break
}
})

//dynamic sprite
