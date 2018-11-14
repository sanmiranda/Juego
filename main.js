//canvas
var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

//variables
var interval = null;
var frames = 0;
var imagenes ={
  fondoff: src ="./Imagenes/pastoverde.png",
  fondoizquierda: src ="./Imagenes/control3.png",
  kane: src ="./Personajes/Kane.png",
  kane2: src ="./Personajes/Kane2.png",
  logo: src ="./imagenes/Retro-Runner2.png",
  fondotop: src ="./Imagenes/Baron.gif",
  rydia1: src ="./Imagenes/rydia1.png",
  rydia2: src ="./Imagenes/rydia2.png",
  fondocast: src="./Imagenes/fondo cast.png",
  castillo: src="./Imagenes/castilloctl.png",
  simon1: src ="./Personajes/simon1.png",
  simon2: src ="./Personajes/simon2.png",
  chest: src ="./Imagenes/RedChest1.gif",
  chocobo1: src ="./porra/Chocobo-Front.gif",
  chocobo2: src ="./porra/chocobo2.png",
  ken1: src ="./porra/ken1.png",
  ken2: src ="./porra/ken2.png",
  ghost1: src ="./porra/ghost1.png",
  ghost2: src ="./porra/ghost2.png",

  //itemff:src ="./Imagenes/Crystal-Large.gif",

}
var audio ={
  ff:"http://66.90.93.122/soundfiles/nintendo-snes-spc/final-fantasy-iv/13%20Fight%202.mp3",
  fin: src ="./Musica/32 - All Gone (Game Over).mp3",
  boom: src="./Musica/boomshakalaka.mp3",
}

var malos=[]

var cristales=[]
var porra=[

]

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
var itCristales=[
  "./Imagenes/Crystal-Large.gif",
]
var corazones=[
  "./Imagenes/Heart.gif",
]

var castMalos=[
"./malos castlevania/GrimReaper.png",
"./malos castlevania/Skele-Dragon.gif",
"./malos castlevania/TheCount.gif",
]
//clases
function Board(){
  this.x= 200
  this.y= 0
  this.width = canvas.width
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
function Nintendo(){
  this.x=0
  this.y=80
  this.width = 200
  this.height = 420
  this.image = new Image()
  this.image.src = imagenes.fondoizquierda
  this.draw = function(){
  ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    
  }
}
function Top(){
this.x=200
this.y=0
this.width = 300
this.height = 100
this.image = new Image()
this.image.src = imagenes.fondotop
this.draw = function(){
ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
}
}


function Character(){
  this.which =true;
  this.x = 320
  this.y = 400
  this.width = 60
  this.height = 60
  this.image = new Image()
  this.image.src = imagenes.kane
  this.image2 = new Image()
  this.image2.src = imagenes.kane2
  this.score = 0
  this.draw = function(){
    var img = this.which ? this.image:this.image2
    ctx.drawImage(img,this.x,this.y,this.width,this.height)
    if(frames%10===0) this.toggleWhich()
    ctx.font ="bold 30px arial"
    ctx.fillStyle ="blue"
    ctx.fillText(this.score,100, 50)
    this.toggleWhich = function(){
      this.which = !this.which
    } 
  }
  if(this.score===10){
    musica = new Audio()
  musica.src = audio.boom
  musica.play()
  }
}
function Rydia(){
  Character.call(this)
  this.x = 50
  this.y = 350
  this.image = new Image()
  this.image.src = imagenes.rydia1
  this.image2 = new Image()
  this.image2.src = imagenes.rydia2
}

function Chest(){
  Top.call(this)
  this.x = 20
  this.y = 20
  this.width = 50
  this.height = 50
  this.image = new Image()
  this.image.src = imagenes.chest

}
function Chocobo(){
  Character.call(this)
  this.x = 80
  this.y = 140
  this.image = new Image()
  this.image.src = imagenes.chocobo1
  this.image2 = new Image()
  this.image2.src = imagenes.chocobo2
 

}
function Ken(){
  Character.call(this)
  this.x = 10
  this.y = 180
  this.image = new Image()
  this.image.src = imagenes.ken1
  this.image2 = new Image()
  this.image2.src = imagenes.ken2
}

function Ghost(){
  Character.call(this)
  this.x = 140
  this.y = 420
  this.image = new Image()
  this.image.src = imagenes.ghost1
  this.image2 = new Image()
  this.image2.src = imagenes.ghost2
}
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


function Malo(){
  this.width=100
  this.height=100
  this.y = canvas.width - 400
  this.array= [200,300,400]
  this.index =  Math.floor((Math.random() * 3));
  this.x = this.array[this.index]
  this.image = new Image ()
  this.image.src = ffmalos[Math.floor(Math.random()*ffmalos.length)]
  this.draw= function(){
    this.y+=1
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height)

    this.isTouching = function(item){
      return (this.x < item.x + item.width) &&
      (this.x + this.width > item.x) &&
      (this.y < item.y + item.height) &&
      (this.y + this.height > item.y)
     
  }
}
}

function Item(){
  this.width=30
  this.height=40
  this.y = canvas.width - 500
  this.array= [220,330,440]
  this.index =  Math.floor((Math.random() * 3));
  this.x = this.array[this.index]
  this.image = new Image ()
  this.image.src = itCristales[Math.floor(Math.random()*itCristales.length)]
  this.draw = function(){
    this.y+=1.5
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
  } 
  this.isTouching = function(item){
    return (this.x < item.x + item.width) &&
    (this.x + this.width > item.x) &&
    (this.y < item.y + item.height) &&
    (this.y + this.height > item.y)
  
  }
}


//instancias
var fondoff = new Board()
var kane = new Character()
var musica = new Audio()
var fondoiz = new Nintendo()
var fondtop = new Top()
var rydiaa = new Rydia()
var cofre = new Chest()
var choco = new Chocobo()
var kens = new Ken()
var ghos = new Ghost()
//var cristal = new Item()

//main functions
function start(){
  frames=0
  malos=[]
  cristales=[]
  //kane = new Charatcter()
  interval = setInterval(update, 1000/60)
  musica = new Audio()
  musica.src = audio.ff
  musica.play()
 if(!interval){
  interval = setInterval(update, 1000/60)
 }
}
function update(){
  frames++
  ctx.clearRect(0,0,canvas.width, canvas.height)
  fondoff.draw()
  kane.draw()
  fondoiz.draw()
  fondtop.draw()
  rydiaa.draw()
  cofre.draw()
  choco.draw()
  kens.draw()
  ghos.draw()
  checkCharacterCollition()
  generateItems()
  drawItems()
  generateMalos()
  drawMalos()

 /* if(kane.score >= 4 && kane.score < 21){ 
  ctx.clearRect(0,0,canvas.width, canvas.height)
  fondocast.draw()
  kane.draw()
  fondoiz.draw()
  fondocast.draw()
  rydiaa.draw()
  cofre.draw()
  choco.draw()
  kens.draw()
  ghos.draw()
  checkCharacterCollition()
  generateItems()
  drawItems()
  generateMalos()
  drawMalos()
 }
 
*/
}


function gameOver(){
  clearInterval(interval)
  interval = null
  ctx.fillStyle = "white"
  ctx.font = "bold 80px Arial"
  ctx.fillText("GAME OVER", 50,200)
  ctx.fillStyle = "white"
  ctx.font = "bold 40px Arial"
  ctx.fillText("Tu score: " , 200,300)
  ctx.font = "bold 20px Arial"
  ctx.fillText("Presiona 'Return' para reiniciar", 50,350)
  musica = new Audio()
  musica.src = audio.fin
  musica.play()
}

function levelUp(){

}

//aux functions
function drawCover(){
  var img = new Image()
  img.src = imagenes.logo
  img.onload = function(){
      fondoff.draw()
      fondoiz.draw()
      ctx.drawImage(img, 200,100,300,100)
  }
}

function generateItems(){
  if (frames%40===0) {
    var ite = new Item()
    cristales.push(ite);
  }
}

function drawItems(){
cristales.forEach(function(cris, index){
  cris.draw()
  if(cris.isTouching(kane)){
    kane.score++
    cristales.splice(index, 1)
  }
})
}

function generateMalos(){
  //necesitamos anchura
  if (frames%200===0) {
  var enem = new Malo()
   malos.push(enem);
  //  malos.push(maloff(w,ffmalos[Math.floor(Math.random()*ffmalos.lenght)]))
  }
}
//esta funcion los pasa de anonimos a genericos
function drawMalos(){
  malos.forEach(function(maloff){
    maloff.draw()
  
  })
 }

 function checkCharacterCollition(){
  for(var malo of malos){
      if(malo.isTouching(kane)){
          gameOver()
      }
  }
}

//listeners
addEventListener('keydown',function(e){
  switch(e.keyCode){
    case 13:
     return start()
      break;
    default:
      return
  }
})


addEventListener('keydown', (e) => {
  if (e.keyCode === 37)
  kane.x -=120
})

addEventListener('keydown',function(e){
  switch(e.keyCode){
    case 39:
      kane.x +=120
      return 
    default:
      return
  }
})

drawCover()
