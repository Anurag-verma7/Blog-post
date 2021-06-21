var canvas=document.querySelector('canvas')
console.log("hi")
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
var c=canvas.getContext('2d')

window.addEventListener('resize',function() {
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    init();
})
var mouse={
    x:undefined,
    y:undefined
}
var colorarray=[
    '#F3FEB0','#FEA443','#705E78','#A5AAA3','#812F33'
]
window.addEventListener('mousemove',
    (event) => {
      //  console.log(event)
       mouse.x=event.x;
       mouse.y=event.y;
    })
function Circle(x,y,dx,dy,radius){
    this.dx=dx;
    this.dy=dy;
    this.x=x
    this.y=y
    this.radius=radius
    this.minRadius=radius

    this.color=colorarray[Math.floor(Math.random()*colorarray.length)]
    this.draw=function(){
        //console.log("hi")
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,true)
        c.strokeStyle="blue"
        c.fillStyle=this.color
        c.fill()
    }
    this.update=function(){
    if(this.x+this.radius>window.innerWidth || this.x-this.radius<0)
        this.dx=-this.dx
    if(this.y+this.radius>window.innerHeight|| this.y-this.radius<0)
        this.dy=-this.dy
       this.x+=this.dx
       this.y+=this.dy
       if(Math.abs(this.x-mouse.x)<50 && Math.abs(this.y-mouse.y)<50){
           if(this.radius<40)
           this.radius=this.radius+1;
       }
       else if(this.radius>this.minRadius)
       this.radius=this.radius-1;
       this.draw();
    }
}

var circlearray=[]
function init(){
    circlearray=[];
for(var i=0;i<1000;i++){
   
var x=Math.random()*innerWidth;
var y=Math.random()*innerHeight;
var dx=(Math.random()-0.5)*2;
var dy=(Math.random()-0.5)*2;
var radius=Math.random()*4+1;
circlearray.push(new Circle(x,y,dx,dy,radius));
}
}
function animate(){
 requestAnimationFrame(animate);
 c.clearRect(0,0,innerWidth,innerHeight)  
 
   for(var i=0;i<circlearray.length;i++){
       circlearray[i].update();
   }
}
init();
animate()
