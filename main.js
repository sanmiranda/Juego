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
  logo: src ="./imagenes/cover3.png",
  fondotop: src ="./Imagenes/Baron.gif",
  rydia1: src ="./Imagenes/rydia1.png",
  rydia2: src ="./Imagenes/rydia2.png",
  fondocast: src="./Imagenes/caslteee.png",
  castillo: src="./Imagenes/castilloctl.png",
  simon1: src ="./Personajes/alu1.png",
  simon2: src ="./Personajes/alu2.png",
  chest: src ="./Imagenes/RedChest1.gif",
  chocobo1: src ="./porra/Chocobo-Front.gif",
  chocobo2: src ="./porra/chocobo2.png",
  ken1: src ="./porra/ken1.png",
  ken2: src ="./porra/ken2.png",
  ghost1: src ="./porra/ghost1.png",
  ghost2: src ="./porra/ghost2.png",
  go: src="./Imagenes/punchoutGo.png",
  ztop: src="./Imagenes/linkespada.png",
  zfondo: src="./Imagenes/pastolink.png",
  link1: src="./Personajes/link1.png",
  link2: src="./Personajes/link2.png",
  contra1: src="./Personajes/contra1.png",
  contra2: src="./Personajes/contra2.png",
  cfondo: src="./Imagenes/contrafondo.png",
  ctop: src="./Imagenes/Stage6BossJaggerFroid.png",
  rana1: src="./porra/Frog (Front).gif",
  rana2: src="./porra/Frog - Shocked (Front).gif",
  dk1: src="./porra/dk1.png",
  dk2: src="./porra/dk2.png",
  mega1: src="./porra/mega1.png",
  mega2: src="./porra/mega2.png",
  marlene1: src="./porra/Marle - Down (Front).gif",
  marlene2: src="./porra/Marle - Arms Up (Front).gif",
  boo1: src="./porra/boo1.png",
  boo2: src="./porra/boo2.png",
  yoshi1: src="./porra/1.png",
  yoshi2: src="./porra/yoshi23.png",
 



}
var audio ={
  ff:"./Musica/retrorunner.mp3",
  fin: src ="./Musica/32 - All Gone (Game Over).mp3",
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
var itCristales=[
  "./Imagenes/Crystal-Large.gif",
]
var corazones=[
  "./Imagenes/LargeHeart.png",
]
var zitems=[
  "./Imagenes/triforce.png",
]

var citems=[
  "./Imagenes/SpreadGun.png",
]

var castMalos=[
"./malos castlevania/GrimReaper.png",
"./malos castlevania/Skele-Dragon.gif",
"./malos castlevania/TheCount.gif",
"./malos castlevania/calacas.png",
"./malos castlevania/castll.png",
"./malos castlevania/malocast.png",
"./malos castlevania/ojo.png",

]

var zelmalos=[
  "./malos zelda/07 - Thunderbird zelda.gif",
  "./malos zelda/7 - Ganon - Red1.gif",
  "./malos zelda/Leever - zelda.gif",
  "./malos zelda/Lynel - zelda.gif",
  "./malos zelda/Moblin - zelda.gif",
  "./malos zelda/Octorok - zelda.gif",
  "./malos zelda/gannon.png",
]
var conmalos=[
  "./malos contra/cmalo1.png",
  "./malos contra/maloc2.png",
  "./malos contra/Stage2BossMetallicancontra.png",
  "./malos contra/Stage3BossBOB1c.png",
  "./malos contra/Stage3BossBOB2.png",
  "./malos contra/Stage5BossScorpabellum.png",
  "./malos contra/Stage6BossAlienMouth.png",
]

var itemFrames = 40
var malosFrames = 90
var malovel = 3
var itemVel = 3
var arrayMalosImages = ffmalos;
var arrayItemsImages = itCristales;

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
  this.score = " "
  this.draw = function(){
    var img = this.which ? this.image:this.image2
    if(this.x<200){
      this.x=200
    }
    if(this.x>canvas.width){
      this.x = canvas.width - this.width
    }
    ctx.drawImage(img,this.x,this.y,this.width,this.height)
    if(frames%10===0) this.toggleWhich()
    ctx.font ="bold 30px arial"
    ctx.fillStyle ="blue"
    ctx.fillText(this.score,100, 50)
    this.toggleWhich = function(){
      this.which = !this.which
    } 
  }

}
function Rydia(){
  this.x = 50
  this.y = 350
  this.width = 60
  this.height = 60
  this.image = new Image()
  this.image.src = imagenes.rydia1
  this.image2 = new Image()
  this.image2.src = imagenes.rydia2
  this.draw = function(){
    var image = this.which ? this.image:this.image2
    ctx.drawImage(image,this.x,this.y,this.width,this.height)
    if(frames%10===0) this.toggleWhich()
    
    this.toggleWhich = function(){
      this.which = !this.which
    } 
}
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
  Rydia.call(this)
  this.x = 80
  this.y = 140
  this.image = new Image()
  this.image.src = imagenes.chocobo1
  this.image2 = new Image()
  this.image2.src = imagenes.chocobo2
 

}
function Ken(){
  Rydia.call(this)
  this.x = 10
  this.y = 180
  this.image = new Image()
  this.image.src = imagenes.ken1
  this.image2 = new Image()
  this.image2.src = imagenes.ken2
}

function Ghost(){
  Rydia.call(this)
  this.x = 140
  this.y = 420
  this.image = new Image()
  this.image.src = imagenes.ghost1
  this.image2 = new Image()
  this.image2.src = imagenes.ghost2
}
function Rana(){
  Rydia.call(this)
  this.x = 20
  this.y = 410
  this.image = new Image()
  this.image.src = imagenes.rana1
  this.image2 = new Image()
  this.image2.src = imagenes.rana2
}
function Mega(){
  Rydia.call(this)
  this.x = 140
  this.y = 215
  this.image = new Image()
  this.image.src = imagenes.mega1
  this.image2 = new Image()
  this.image2.src = imagenes.mega2
}

function Dk(){
  Rydia.call(this)
  this.x = 120
  this.y = 360
  this.image = new Image()
  this.image.src = imagenes.dk1
  this.image2 = new Image()
  this.image2.src = imagenes.dk2
}

function Marlene(){
  Rydia.call(this)
  this.x = 60
  this.y = 280
  this.image = new Image()
  this.image.src = imagenes.marlene1
  this.image2 = new Image()
  this.image2.src = imagenes.marlene2
}
function Boo(){
  Rydia.call(this)
  this.x = 10
  this.y =105
  this.image = new Image()
  this.image.src = imagenes.boo1
  this.image2 = new Image()
  this.image2.src = imagenes.boo2
}
function Yoshi(){
  Rydia.call(this)
  this.x = 10
  this.y = 250
  this.image = new Image()
  this.image.src = imagenes.yoshi1
  this.image2 = new Image()
  this.image2.src = imagenes.yoshi2
}

function Malo(src){
  this.width=100
  this.height=100
  this.y = canvas.width - 450
  this.array= [200,300,400]
  this.index =  Math.floor((Math.random() * 3));
  this.x = this.array[this.index]
  this.image = new Image ()
  this.image.src = src
  this.draw= function(){
    this.y+=malovel
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height)

    this.isTouching = function(item){
      return (this.x < item.x + item.width) &&
      (this.x + this.width > item.x) &&
      (this.y < item.y + item.height) &&
      (this.y + this.height > item.y)
     
  }
}
}

function Item(sorce){
  this.width=30
  this.height=40
  this.y = canvas.width - 500
  this.array= [220,330,440]
  this.index =  Math.floor((Math.random() * 3));
  this.x = this.array[this.index]
  this.image = new Image ()
  this.image.src = sorce
  this.draw = function(){
    this.y+=itemVel
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
  } 
  this.isTouching = function(item){
    return (this.x < item.x + item.width) &&
    (this.x + this.width > item.x) &&
    (this.y < item.y + item.height) &&
    (this.y + this.height > item.y)
  
  }
}

var gamoOv = new Image()
gamoOv.srcset= imagenes.go
//instancias
var fondoff = new Board()
var kane = new Character()
var fondoiz = new Nintendo()
var fondtop = new Top()
var rydiaa = new Rydia()
var cofre = new Chest()
var choco = new Chocobo()
var kens = new Ken()
var ghos = new Ghost()
var cast = new Board()
var simon = new Character()
var castil = new Top()
var mega = new Mega()
var dk = new Dk()
var rana = new Rana()
var marle  = new Marlene()
var bo = new Boo()
var yo = new Yoshi()


//main functions
function start(){
  if(!interval){
  frames=0
  malos=[]
  cristales=[]
  kane.score=" "
  musica = new Audio()
  musica.src = audio.ff
  musica.play()
  interval = setInterval(update, 1000/60)
 }
}
//UPDATE
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
  mega.draw()
  marle.draw()
  dk.draw()
  rana.draw()
  bo.draw()
  yo.draw()
  checkCharacterCollition()
  generateItems()
  drawItems()
  generateMalos()
  drawMalos()
  checkLevel()
}


function checkLevel(){

    if(kane.score < 5){
    fondoff.image.src = imagenes.fondoff
    fondtop.image.src = imagenes.fondotop
    //personaje
    kane.image.src = imagenes.kane
    kane.image2.src = imagenes.kane2
    //enemigos
    arrayMalosImages = ffmalos
    //items
    arrayItemsImages = itCristales
    itemVel = 3
    malovel = 3
    itemFrames = 40
    malosFrames = 80
   //musica
}
  else if(kane.score >= 5 && kane.score<= 70 ){

    
    //board
    fondoff.image.src = imagenes.fondocast
    fondtop.image.src = imagenes.castillo
    //personaje
    kane.image.src = imagenes.simon1
    kane.image2.src = imagenes.simon2
    //enemigos
    arrayMalosImages = castMalos
    //items
    arrayItemsImages = corazones
    itemVel = 3
    malovel = 3
    itemFrames = 40
    malosFrames = 80
   //musica
  
  }

  else if(kane.score >= 71 && kane.score<= 110){
    fondoff.image.src = imagenes.zfondo
    fondtop.image.src = imagenes.ztop
    //personaje
    kane.image.src = imagenes.link1
    kane.image2.src = imagenes.link2
    //enemigos
    arrayMalosImages = zelmalos
    //items
    arrayItemsImages = zitems

    itemVel = 3
    malovel = 5
    itemFrames = 40
    malosFrames = 70
  }
  else if(kane.score >= 110 && kane.score<= 1000 ){
    fondoff.image.src = imagenes.cfondo
    fondtop.image.src = imagenes.ctop
    //personaje
    kane.image.src = imagenes.contra1
    kane.image2.src = imagenes.contra2
    //enemigos
    arrayMalosImages = conmalos
    //items
    arrayItemsImages = citems

    itemVel = 4
    malovel = 6
    itemFrames = 50
    malosFrames = 50
  }


}


function gameOver(){
  clearInterval(interval)
  interval = null
  musica.pause()
  malos=[]
  cristales=[]
  kane.score = " "
  ctx.drawImage(gamoOv,50,50,400,400)
  ctx.fillStyle = "white"
  ctx.font = "bold 40px Arial"
  ctx.fillText("Tu score: " + kane.score , 150,300)
  ctx.font = "bold 20px Arial"
  ctx.fillText("Presiona 'Return' para reiniciar", 110,440)
  musica = new Audio()
  musica.src = audio.fin
  musica.play()
}

//aux functions
function drawCover(){
  var img = new Image()
  img.src = imagenes.logo
  img.onload = function(){
      fondoff.draw()
      fondoiz.draw()
      cofre.draw()
      ctx.drawImage(img, 90,10,380,250)
  }
}

function generateItems(){
  if (frames%itemFrames===0) {
    var sorce = arrayItemsImages[Math.floor(Math.random()*arrayItemsImages.length)]
    var ite = new Item(sorce)
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
 
  if (frames%malosFrames===0) {
  var src = arrayMalosImages[Math.floor(Math.random()*arrayMalosImages.length)]
  var enem = new Malo(src)
   malos.push(enem);
  }
}

function drawMalos(){
  malos.forEach(function(ffmalos){
    ffmalos.draw()
  
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
