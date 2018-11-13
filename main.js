//canvas
var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

//variables
var interval = null;
var frames = 0;
var imagenes ={
  fondoff:"https://vignette.wikia.nocookie.net/finalfantasy/images/2/27/Battleback_plains_a.png/revision/latest?cb=20141030004426",
  fondoff2:"https://vignette.wikia.nocookie.net/finalfantasy/images/2/27/Battleback_plains_a.png/revision/latest?cb=20141030004426",
  kane: src ="./imagenes/Kain-Walk1.jpg",
  kane2: src ="./Imagenes/Kain-Walk2.jpg",
  logo:src ="./imagenes/Retro-Runner2.png",
  itemff:src ="./Imagenes/Crystal-Large.gif"

}
var audio ={
  ff:"http://66.90.93.122/soundfiles/nintendo-snes-spc/final-fantasy-iv/13%20Fight%202.mp3"

}

var malos=[]

var cristales=[]

var ffmalos =[
"./malos FF/Antlion.gif",
"./malos FF/Belphegor.gif",
"./malos FF/Bomb.gif",
"./malos FF/Cagnazzo1.gif",
"./malos FF/Chimera.gif",
"./malos FF/FloodWorm.gif",
"./malos FF/Goblin.gif",
"./malos FF/Golbez.gif",
"./malos FF/HiromiNakada.gif",
"./malos FF/KiyoshiYoshii.gif",
"./malos FF/Octomammoth1.gif",
"./malos FF/Rubicante1.gif",
"./malos FF/Zemus.gif",
"./malos FF/Zeromus2.gif",
]

//clases
function Board(){
  this.x= 200
  this.y= 0
  this.width = canvas.with
  this.height = canvas.height
  this.image = new Image()
  this.image.src = imagenes.fondoff
  this.draw = function(){
    this.y++
    if(this.y > this.height) this.y= 0
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    ctx.drawImage(this.image,this.x,this.y-this.height,this.width,this.height)
}
}


function Character(){
  this.which =true;
  this.x = 300
  this.y = 400
  this.width = 50
  this.height = 50
  this.image = new Image()
  this.image.src = imagenes.kane
  this.image2 = new Image()
  this.image2.src = imagenes.kane2
  this.draw = function(){
    var img = this.which ? this.image:this.image2
    ctx.drawImage(img,this.x,this.y,this.width,this.height)
    if(frames%10===0) this.toggleWhich()
  /*  this.boundaries()
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
}
this.boundaries = function(){
    if(this.x+this.width > canvas.width-200) {
        this.x = canvas.width-this.width
    }
    else (this.x < 100 ) 
        this.x = 100
 
  }*/
  this.toggleWhich = function(){
    this.which = !this.which
} 
}
}

function Malo(){
  this.width=100
  this.height=100
  this.y = canvas.width - 500
  this.x =  Math.floor((Math.random() * canvas.width - this.width )) + (this.height/2);
  
  this.image = new Image ()
  this.image.src = ffmalos[Math.floor(Math.random()*ffmalos.length)]
  // this.image.src = ffmalosArr[Math.floor(Math.random()*ffmalosArr.length)]
  this.draw= function(){
    this.y+=1
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
  }
}

function Item(){
  this.y = canvas.width - 500
  this.x = 200
  this.width=20
  this.height=30
  this.image = new Image ()
  this.image.src = imagenes.itemff
  this.draw = function(){
    this.y+=1.5
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
  } 
}
var score = 1

this.isTouching = function(item){
  return (this.x < item.x + item.width) &&
  (this.x + this.width > item.x) &&
  (this.y < item.y + item.height) &&
  (this.y + this.height > item.y);
}

this.drawScore = function(){
  ctx.font = "bold 24px Avenir"
  ctx.fillText("Items: " + grabItem(), 50,50)
}

//instancias
var fondoff = new Board()
var kane = new Character()
var musica = new Audio()
var cristal = new Item()

//main functions
function start(){
  interval = setInterval(update, 1000/60)
  musica = new Audio()
  musica.src = audio.ff
  musica.play()
 
}
function update(){
  frames++
  ctx.clearRect(0,0,canvas.width, canvas.height)
  fondoff.draw()
  kane.draw()
  generateMalos()
  drawMalos()
  //checkCharacterCollition()
  cristal.draw()
  grabItem()
  drawScore()
}
  

//dibujar

function gameOver(){
  clearInterval(interval)
  interval = null
  ctx.fillStyle = "red"
  ctx.font = "bold 80px Arial"
  ctx.fillText("GAME OVER", 50,200)
  ctx.fillStyle = "black"
  ctx.font = "bold 40px Arial"
  ctx.fillText("Tu score: " + Math.floor(frames/60), 200,300)
  ctx.font = "bold 20px Arial"
  ctx.fillText("Presiona 'Return' para reiniciar", 50,350)
}

//aux functions
function drawCover(){
  var img = new Image()
  img.src = imagenes.logo
  img.onload = function(){
      fondoff.draw()
      ctx.drawImage(img, 180,100,300,100)
  }
}

/*function generateItems(){
  if(frames%10===0) drawItem()
}

function drawItem(){
generateItems()
}
*/
function generateMalos(){
  //necesitamos anchura
  if (frames%100===0) {
  var enem = new Malo()
   malos.push(enem);
  //  malos.push(maloff(w,ffmalos[Math.floor(Math.random()*ffmalos.lenght)]))
  }
}
//esta funcion los pasa de anonimos a genericos
function drawMalos(){
  malos.forEach(function(maloff){
    maloff.draw()
    console.log(maloff.x);
  })
 }

 function checkCharacterCollition(){
  for(var arr of malos){
      if(Character.isTouching(arr)){
          gameOver()
      }
  }
}
function grabItem(){
  for(var agr of cristales){
      if(Character.isTouching(agr)){
          score + score++
      }
  }
}



//listeners
addEventListener('keydown',function(e){
  switch(e.keyCode){
    case 13:
      return start()
    default:
      return
  }
})


addEventListener('keydown', (e) => {
  if (e.keyCode === 37)
  kane.x -=100
})

addEventListener('keydown',function(e){
  switch(e.keyCode){
    case 39:
      kane.x +=100
      return 
    default:
      return
  }
})
drawCover()
